const tokenAbi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
      { name: "_data", type: "bytes" },
    ],
    name: "transferAndCall",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_subtractedValue", type: "uint256" },
    ],
    name: "decreaseApproval",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_addedValue", type: "uint256" },
    ],
    name: "increaseApproval",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "remaining", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
      { indexed: false, name: "data", type: "bytes" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: true, name: "spender", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
];

const { Contract, providers, Wallet, utils } = require("ethers");
const _ = require("lodash");
const ethUnits = require("ethereumjs-units");

// const provider = new ethers.getDefaultProvider("goerli");
const provider = new providers.JsonRpcProvider(
  "https://zksync2-testnet.zksync.dev"
);

const privatekey = "Add Private key";

// const tokenAddress = "0x2b2351f888640dddcf4e6fde6b4a011d580a3ad5"; //  link token contract address here
const tokenAddress = "0x0000000000000000000000000000000000000000"; //  eth token contract address here

const wallet = new Wallet(privatekey, provider);
const contract = new Contract(tokenAddress, tokenAbi, wallet);

const sender = "0x4886d04828be81bd618666b2f93c0339b55a85a3";
const receiver = "0x5b4d77e199fe8e5090009c72d2a5581c74febe89";

contract.decimals().then((decimals) => {
  console.log("decimals", decimals);
});

contract.balanceOf(sender).then((balance) => {
  console.log("balance: ", balance);
  //console.log(ethers.utils.formatUnits(balance,decimals))
});

const amountToSend = "0.045";

const tx = {
  to: receiver,
  value: ethers.utils.parseEther(amountToSend),
};

// To send ERC 20
// contract
//   .transfer(receiver, utils.parseEther(amountToSend, decimals))
//   .then(function (tx) {
//     console.log(tx);
//   });

wallet.sendTransaction(tx).then((txObj) => {
  console.log("txHash", txObj.hash);
});

provider.getGasPrice().then((gasPriceWei) => {
  console.log("gasPriceWei: ", gasPriceWei);
  const GaspriceGwei = ethers.utils.formatUnits(gasPriceWei, "gwei");
  console.log("GaspriceGwei: ", GaspriceGwei);
});

provider.getBlock("latest").then((latestBlock) => {
  console.log("latestBlock gasLimit: ", latestBlock.gasLimit.toNumber());
  console.log("latestBlock gasUsed: ", latestBlock.gasUsed.toNumber());
  console.log(
    "latestBlock baseFeePerGas: ",
    latestBlock.baseFeePerGas.toNumber()
  );
});
