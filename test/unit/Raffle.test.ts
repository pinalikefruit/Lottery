import { network, ethers , deployments } from "hardhat"
import { developmentChains, networkConfig } from "../../helper-hardhat-config"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { BigNumber } from "ethers"
import { Raffle, VRFCoordinatorV2Mock } from "../../typechain-types"
import { assert, expect } from "chai"


!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Raffle Unit Tests", function () {
    let raffle: Raffle
    let raffleContract: Raffle
    let vrfCoordinatorV2Mock: VRFCoordinatorV2Mock
    let raffleEntranceFee: BigNumber
    let interval : number    
    let accounts: SignerWithAddress[]
    let player: SignerWithAddress

    beforeEach(async () => {
      
      accounts = await ethers.getSigners()
      player = accounts[1]
      await deployments.fixture(["mocks", "raffle"])
      vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
      raffleContract = await ethers.getContract("Raffle")
      raffle = raffleContract.connect(player)
      raffleEntranceFee = await raffle.getEntranceFee()
      interval = (await raffle.getInterval()).toNumber()
    })

    describe("constructor", function() {
      it("Initiallizes the raffle correctly", async() => {
        const raffleState = (await raffle.getRaffleState()).toString()
        assert.equal(raffleState, "0")
        assert.equal( interval.toString(), networkConfig[network.config.chainId!]["keepersUpdateInterval"])
      })
    })
    describe("enter Raffle", function(){
      it("reverts when you don't pay enough", async() => {
        await expect(raffle.enterRaffle()).to.be.revertedWith(
          "Raffle__SendMoreToEnterRaffle"
        )
      })
      it("records player when they enter", async() => {
        await raffle.enterRaffle({value: raffleEntranceFee})
        const contractPlayer = await raffle.getPlayer(0)
        assert.equal(player.address, contractPlayer)
      })
      it("emits event on enter", async() => {
        await expect(raffle.enterRaffle({value:raffleEntranceFee})).to.emit(
          raffle,
          "RaffleEnter"
        )
      })
      it("doesn't allow entrance when raffle is calculating", async() => {
        await raffle.enterRaffle({ value: raffleEntranceFee})
        // Jump forward in time. Takes one parameter, which is the amount of time to increase in seconds.
        await network.provider.send("evm_increaseTime",[interval + 1])
        // Force a block to be mined. Takes no parameters. Mines a block independent of whether or not mining is started or stopped.
        await network.provider.request({method: "evm_mine", params:[]})
        await raffle.performUpkeep([])
        await expect(raffle.enterRaffle({ value: raffleEntranceFee})).to.be.revertedWith(
          "Raffle__RaffleNotOpen"
        )
      })
    })
    describe("checkUpKeep", function() {
      it('returns false if people haven"t sent any ETH', async() => {
          await network.provider.send("evm_increaseTime",[interval + 1])
          await network.provider.request({ method: "evm_mine", params:[]})
          // Rather than executing the state-change of a transaction, it is possible to ask a node to pretend that a call is not state-changing and return the result.
          const { upkeepNeeded } = await raffle.callStatic.checkUpkeep("0x")
          assert(!upkeepNeeded)
      })
      it("returns false if raffle isn't open ", async () => {
        await raffle.enterRaffle({value: raffleEntranceFee})
        await network.provider.send("evm_increaseTime",[interval + 1])
        await network.provider.request({ method: "evm_mine", params:[]})
        await raffle.performUpkeep([])
        const raffleState = await raffle.getRaffleState()
        const { upkeepNeeded } = await raffle.callStatic.checkUpkeep("0x")
        assert.equal(raffleState.toString() == "1", upkeepNeeded == false)
        
      })
      it("returns false if enough time hasn't passed", async () => {
        await raffle.enterRaffle({ value: raffleEntranceFee })
        await network.provider.send("evm_increaseTime", [interval - 1])
        await network.provider.request({ method: "evm_mine", params: [] })
        const { upkeepNeeded } = await raffle.callStatic.checkUpkeep("0x")
        assert(!upkeepNeeded)
      })
      it("returns true if enough time has passed, has players, eth, and is open", async() => {
        await raffle.enterRaffle({value: raffleEntranceFee})
        await network.provider.send("evm_increaseTime",[interval + 1])
        await network.provider.request({ method: "evm_mine", params:[]})
        const { upkeepNeeded } = await raffle.callStatic.checkUpkeep("0x")
        assert(upkeepNeeded)
      })
    })
    describe("performUpkeep", function() {
      it("can only run if checkupkeep is true", async() => {
        await raffle.enterRaffle({value: raffleEntranceFee})
        await network.provider.send("evm_increaseTime",[interval + 1])
        await network.provider.request({ method: "evm_mine", params:[]})
        const tx = await raffle.performUpkeep("0x")
        assert(tx)
      })
      it("reverts if checkup is false", async () => {
        await expect(raffle.performUpkeep("0x")).to.be.revertedWith(
            "Raffle__UpkeepNotNeeded"
        )
    })
      it("Updates the raffle state an emits a requestId", async() => {
        await raffle.enterRaffle({value: raffleEntranceFee})
        await network.provider.send("evm_increaseTime",[interval + 1])
        await network.provider.request({ method: "evm_mine", params:[]})
        const txResponse = await raffle.performUpkeep("0x")
        const txReceipt = await txResponse.wait(1)
        const requestId = txReceipt!.events![1].args!.requestId
        const raffleState = await raffle.getRaffleState()
        assert(requestId.toNumber() > 0)
        assert(raffleState == 1)
      })
    })
    describe("fulfillRandomWords", function() {
      beforeEach(async() => {
        await raffle.enterRaffle({value: raffleEntranceFee})
        await network.provider.send("evm_increaseTime",[interval + 1])
        await network.provider.request({ method: "evm_mine", params:[]})
      })
      it("Can only be called after perform", async() => {
        await expect( vrfCoordinatorV2Mock.fulfillRandomWords(0,raffle.address)).to.be.revertedWith("nonexistent request")
        await expect( vrfCoordinatorV2Mock.fulfillRandomWords(1,raffle.address)).to.be.revertedWith("nonexistent request")
      })
      it("picks a winner, resets, and sends money", async () => {
        const additionalEntrances = 3
        const startingIndex = 2
        for (let i = startingIndex; i < startingIndex + additionalEntrances; i++) {
            raffle = raffleContract.connect(accounts[i])
            await raffle.enterRaffle({ value: raffleEntranceFee })
        }
        const startingTimeStamp = await raffle.getLastTimeStamp()

        // This will be more important for our staging tests...
        await new Promise<void>(async (resolve, reject) => {
            raffle.once("WinnerPicked", async () => {
                console.log("WinnerPicked event fired!")
                // assert throws an error if it fails, so we need to wrap
                // it in a try/catch so that the promise returns event
                // if it fails.
                try {
                    // Now lets get the ending values...
                    const recentWinner = await raffle.getRecentWinner()
                    const raffleState = await raffle.getRaffleState()
                    const winnerBalance = await accounts[2].getBalance()
                    const endingTimeStamp = await raffle.getLastTimeStamp()
                    await expect(raffle.getPlayer(0)).to.be.reverted
                    assert.equal(recentWinner.toString(), accounts[2].address)
                    assert.equal(raffleState, 0)
                    assert.equal(
                        winnerBalance.toString(),
                        startingBalance
                            .add(
                                raffleEntranceFee
                                    .mul(additionalEntrances)
                                    .add(raffleEntranceFee)
                            )
                            .toString()
                    )
                    assert(endingTimeStamp > startingTimeStamp)
                    resolve()
                } catch (e) {
                    reject(e)
                }
            })

            const tx = await raffle.performUpkeep("0x")
            const txReceipt = await tx.wait(1)
            const startingBalance = await accounts[2].getBalance()
            await vrfCoordinatorV2Mock.fulfillRandomWords(
                txReceipt!.events![1].args!.requestId,
                raffle.address
            )
        })
    })
    })
  })

