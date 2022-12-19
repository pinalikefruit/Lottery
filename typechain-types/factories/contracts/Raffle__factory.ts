/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BytesLike,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Raffle, RaffleInterface } from "../../contracts/Raffle";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "vrfCoordinatorV2",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "subscriptionId",
        type: "uint64",
      },
      {
        internalType: "bytes32",
        name: "gasLane",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "interval",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "entranceFee",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "callbackGasLimit",
        type: "uint32",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "have",
        type: "address",
      },
      {
        internalType: "address",
        name: "want",
        type: "address",
      },
    ],
    name: "OnlyCoordinatorCanFulfill",
    type: "error",
  },
  {
    inputs: [],
    name: "Raffle__RaffleNotOpen",
    type: "error",
  },
  {
    inputs: [],
    name: "Raffle__SendMoreToEnterRaffle",
    type: "error",
  },
  {
    inputs: [],
    name: "Raffle__TransferFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "currentBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numPlayers",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "raffleState",
        type: "uint256",
      },
    ],
    name: "Raffle__UpkeepNotNeeded",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "RaffleEnter",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    name: "RequestedRaffleWinner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "WinnerPicked",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "checkUpkeep",
    outputs: [
      {
        internalType: "bool",
        name: "upkeepNeeded",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "enterRaffle",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntranceFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInterval",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastTimeStamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumWords",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfPlayers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getPlayer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRaffleState",
    outputs: [
      {
        internalType: "enum Raffle.RaffleState",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRecentWinner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRequestConfirmations",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "performUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "randomWords",
        type: "uint256[]",
      },
    ],
    name: "rawFulfillRandomWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6101606040523480156200001257600080fd5b5060405162001877380380620018778339818101604052810190620000389190620001ad565b858073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b81525050508573ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff1660601b815250508360e081815250508261012081815250508467ffffffffffffffff1660c08167ffffffffffffffff1660c01b815250508161014081815250506000600160006101000a81548160ff021916908360018111156200010a5762000109620002b5565b5b0217905550426000819055508063ffffffff166101008163ffffffff1660e01b815250505050505050506200036b565b6000815190506200014b81620002e9565b92915050565b600081519050620001628162000303565b92915050565b60008151905062000179816200031d565b92915050565b600081519050620001908162000337565b92915050565b600081519050620001a78162000351565b92915050565b60008060008060008060c08789031215620001cd57620001cc620002e4565b5b6000620001dd89828a016200013a565b9650506020620001f089828a0162000196565b95505060406200020389828a0162000151565b94505060606200021689828a0162000168565b93505060806200022989828a0162000168565b92505060a06200023c89828a016200017f565b9150509295509295509295565b6000620002568262000267565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600063ffffffff82169050919050565b600067ffffffffffffffff82169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600080fd5b620002f48162000249565b81146200030057600080fd5b50565b6200030e816200025d565b81146200031a57600080fd5b50565b620003288162000287565b81146200033457600080fd5b50565b620003428162000291565b81146200034e57600080fd5b50565b6200035c81620002a1565b81146200036857600080fd5b50565b60805160601c60a05160601c60c05160c01c60e0516101005160e01c6101205161014051611490620003e7600039600081816102fa01526103f70152600081816107ec01526108950152600061069b01526000610657015260006106780152600061061b015260008181610337015261038b01526114906000f3fe6080604052600436106100c25760003560e01c806353a2c19a1161007f57806391ad27b41161005957806391ad27b414610238578063c1c244e814610263578063e55ae4e81461028e578063fd6673f5146102cb576100c2565b806353a2c19a146101a45780635f1b0fd8146101cf5780636e04ff0d146101fa576100c2565b806309bc33a7146100c7578063115cbaf5146100f25780631fe543e31461011d5780632cfcc539146101465780634585e33b14610150578063473f1ddc14610179575b600080fd5b3480156100d357600080fd5b506100dc6102f6565b6040516100e99190611096565b60405180910390f35b3480156100fe57600080fd5b5061010761031e565b604051610114919061107b565b60405180910390f35b34801561012957600080fd5b50610144600480360381019061013f9190610e6f565b610335565b005b61014e6103f5565b005b34801561015c57600080fd5b5061017760048036038101906101729190610d7f565b610564565b005b34801561018557600080fd5b5061018e610763565b60405161019b9190610fb4565b60405180910390f35b3480156101b057600080fd5b506101b961078d565b6040516101c69190611096565b60405180910390f35b3480156101db57600080fd5b506101e461079c565b6040516101f19190611096565b60405180910390f35b34801561020657600080fd5b50610221600480360381019061021c9190610dcc565b6107a9565b60405161022f929190610ff8565b60405180910390f35b34801561024457600080fd5b5061024d610891565b60405161025a9190611096565b60405180910390f35b34801561026f57600080fd5b506102786108b9565b6040516102859190611096565b60405180910390f35b34801561029a57600080fd5b506102b560048036038101906102b09190610e15565b6108c2565b6040516102c29190610fb4565b60405180910390f35b3480156102d757600080fd5b506102e061090a565b6040516102ed9190611096565b60405180910390f35b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b6000600160009054906101000a900460ff16905090565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146103e757337f00000000000000000000000000000000000000000000000000000000000000006040517f1cf993f40000000000000000000000000000000000000000000000000000000081526004016103de929190610fcf565b60405180910390fd5b6103f18282610917565b5050565b7f000000000000000000000000000000000000000000000000000000000000000034101561044f576040517f3038c00a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600181111561046357610462611370565b5b600160009054906101000a900460ff16600181111561048557610484611370565b5b146104bc576040517fd24a271400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff167f0805e1d667bddb8a95f0f09880cf94f403fb596ce79928d9f29b74203ba284d460405160405180910390a2565b600061057e604051806020016040528060008152506107a9565b509050806105ed5747600280549050600160009054906101000a900460ff1660018111156105af576105ae611370565b5b6040517f584327aa0000000000000000000000000000000000000000000000000000000081526004016105e4939291906110b1565b60405180910390fd5b60018060006101000a81548160ff0219169083600181111561061257610611611370565b5b021790555060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16635d3b1d307f00000000000000000000000000000000000000000000000000000000000000007f000000000000000000000000000000000000000000000000000000000000000060037f000000000000000000000000000000000000000000000000000000000000000060016040518663ffffffff1660e01b81526004016106dc959493929190611028565b602060405180830381600087803b1580156106f657600080fd5b505af115801561070a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061072e9190610e42565b9050807fcd6e45c8998311cab7e9d4385596cac867e20a0587194b954fa3a731c93ce78b60405160405180910390a250505050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600163ffffffff16905090565b6000600361ffff16905090565b600060606000600160009054906101000a900460ff1660018111156107d1576107d0611370565b5b600060018111156107e5576107e4611370565b5b14905060007f0000000000000000000000000000000000000000000000000000000000000000600054426108199190611191565b119050600080600280549050119050600080471190508380156108395750825b80156108425750815b801561084b5750805b9550856040518060400160405280600381526020017f30783000000000000000000000000000000000000000000000000000000000008152509550955050505050915091565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b60008054905090565b6000600282815481106108d8576108d761139f565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000600280549050905090565b6000600280549050826000815181106109335761093261139f565b5b602002602001015161094591906112e1565b905060006002828154811061095d5761095c61139f565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600067ffffffffffffffff8111156109e6576109e56113ce565b5b604051908082528060200260200182016040528015610a145781602001602082028036833780820191505090505b5060029080519060200190610a2a929190610b4a565b506000600160006101000a81548160ff02191690836001811115610a5157610a50611370565b5b02179055504260008190555060008173ffffffffffffffffffffffffffffffffffffffff1647604051610a8390610f9f565b60006040518083038185875af1925050503d8060008114610ac0576040519150601f19603f3d011682016040523d82523d6000602084013e610ac5565b606091505b5050905080610b00576040517fa1d04b3900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff167f5b690ec4a06fe979403046eaeea5b3ce38524683c3001f662c8b5a829632f7df60405160405180910390a25050505050565b828054828255906000526020600020908101928215610bc3579160200282015b82811115610bc25782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190610b6a565b5b509050610bd09190610bd4565b5090565b5b80821115610bed576000816000905550600101610bd5565b5090565b6000610c04610bff8461110d565b6110e8565b90508083825260208201905082856020860282011115610c2757610c26611407565b5b60005b85811015610c575781610c3d8882610d55565b845260208401935060208301925050600181019050610c2a565b5050509392505050565b6000610c74610c6f84611139565b6110e8565b905082815260208101848484011115610c9057610c8f61140c565b5b610c9b84828561126e565b509392505050565b600082601f830112610cb857610cb7611402565b5b8135610cc8848260208601610bf1565b91505092915050565b60008083601f840112610ce757610ce6611402565b5b8235905067ffffffffffffffff811115610d0457610d036113fd565b5b602083019150836001820283011115610d2057610d1f611407565b5b9250929050565b600082601f830112610d3c57610d3b611402565b5b8135610d4c848260208601610c61565b91505092915050565b600081359050610d6481611443565b92915050565b600081519050610d7981611443565b92915050565b60008060208385031215610d9657610d95611416565b5b600083013567ffffffffffffffff811115610db457610db3611411565b5b610dc085828601610cd1565b92509250509250929050565b600060208284031215610de257610de1611416565b5b600082013567ffffffffffffffff811115610e0057610dff611411565b5b610e0c84828501610d27565b91505092915050565b600060208284031215610e2b57610e2a611416565b5b6000610e3984828501610d55565b91505092915050565b600060208284031215610e5857610e57611416565b5b6000610e6684828501610d6a565b91505092915050565b60008060408385031215610e8657610e85611416565b5b6000610e9485828601610d55565b925050602083013567ffffffffffffffff811115610eb557610eb4611411565b5b610ec185828601610ca3565b9150509250929050565b610ed4816111c5565b82525050565b610ee3816111d7565b82525050565b610ef2816111e3565b82525050565b6000610f038261116a565b610f0d8185611175565b9350610f1d81856020860161127d565b610f268161141b565b840191505092915050565b610f3a8161125c565b82525050565b6000610f4d600083611186565b9150610f588261142c565b600082019050919050565b610f6c81611200565b82525050565b610f7b8161122e565b82525050565b610f8a81611238565b82525050565b610f9981611248565b82525050565b6000610faa82610f40565b9150819050919050565b6000602082019050610fc96000830184610ecb565b92915050565b6000604082019050610fe46000830185610ecb565b610ff16020830184610ecb565b9392505050565b600060408201905061100d6000830185610eda565b818103602083015261101f8184610ef8565b90509392505050565b600060a08201905061103d6000830188610ee9565b61104a6020830187610f90565b6110576040830186610f63565b6110646060830185610f81565b6110716080830184610f81565b9695505050505050565b60006020820190506110906000830184610f31565b92915050565b60006020820190506110ab6000830184610f72565b92915050565b60006060820190506110c66000830186610f72565b6110d36020830185610f72565b6110e06040830184610f72565b949350505050565b60006110f2611103565b90506110fe82826112b0565b919050565b6000604051905090565b600067ffffffffffffffff821115611128576111276113ce565b5b602082029050602081019050919050565b600067ffffffffffffffff821115611154576111536113ce565b5b61115d8261141b565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b600061119c8261122e565b91506111a78361122e565b9250828210156111ba576111b9611312565b5b828203905092915050565b60006111d08261120e565b9050919050565b60008115159050919050565b6000819050919050565b60008190506111fb8261142f565b919050565b600061ffff82169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600063ffffffff82169050919050565b600067ffffffffffffffff82169050919050565b6000611267826111ed565b9050919050565b82818337600083830152505050565b60005b8381101561129b578082015181840152602081019050611280565b838111156112aa576000848401525b50505050565b6112b98261141b565b810181811067ffffffffffffffff821117156112d8576112d76113ce565b5b80604052505050565b60006112ec8261122e565b91506112f78361122e565b92508261130757611306611341565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b50565b600281106114405761143f611370565b5b50565b61144c8161122e565b811461145757600080fd5b5056fea26469706673582212207c5c6bd073b9786d86e46a4700a2406b859ae484460e1a5033e9a2f18248cd9064736f6c63430008070033";

type RaffleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RaffleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Raffle__factory extends ContractFactory {
  constructor(...args: RaffleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    vrfCoordinatorV2: PromiseOrValue<string>,
    subscriptionId: PromiseOrValue<BigNumberish>,
    gasLane: PromiseOrValue<BytesLike>,
    interval: PromiseOrValue<BigNumberish>,
    entranceFee: PromiseOrValue<BigNumberish>,
    callbackGasLimit: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Raffle> {
    return super.deploy(
      vrfCoordinatorV2,
      subscriptionId,
      gasLane,
      interval,
      entranceFee,
      callbackGasLimit,
      overrides || {}
    ) as Promise<Raffle>;
  }
  override getDeployTransaction(
    vrfCoordinatorV2: PromiseOrValue<string>,
    subscriptionId: PromiseOrValue<BigNumberish>,
    gasLane: PromiseOrValue<BytesLike>,
    interval: PromiseOrValue<BigNumberish>,
    entranceFee: PromiseOrValue<BigNumberish>,
    callbackGasLimit: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      vrfCoordinatorV2,
      subscriptionId,
      gasLane,
      interval,
      entranceFee,
      callbackGasLimit,
      overrides || {}
    );
  }
  override attach(address: string): Raffle {
    return super.attach(address) as Raffle;
  }
  override connect(signer: Signer): Raffle__factory {
    return super.connect(signer) as Raffle__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RaffleInterface {
    return new utils.Interface(_abi) as RaffleInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Raffle {
    return new Contract(address, _abi, signerOrProvider) as Raffle;
  }
}
