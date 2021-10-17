export { contractAddress, initialize, name, symbol, balance, displayBalance }

const { AVALANCHE_TESTNET_PARAMS } = require("./globals.js");

const { ethers } = require("ethers");

const { walletAddress } = require("./wallet.js");

const provider = new ethers.providers.JsonRpcProvider(AVALANCHE_TESTNET_PARAMS.rpcUrls[0]);

// const signer = provider.getSigner();

const contractAddress = '0xbbf43aeCf64C88C273978afda4316157A5dd8569';

let contractName;
let contractSymbol;
let contractBalance;

const abi = [
    // Some details about the token
    "function name() view returns (string)",
    "function symbol() view returns (string)",

    // Get the account balance
    "function balanceOf(address) view returns (uint)",

    // Send some of your tokens to someone else
    "function transfer(address to, uint amount)",

    // An event triggered whenever anyone transfers to someone else
    "event Transfer(address indexed from, address indexed to, uint amount)"
];

const contract = new ethers.Contract(contractAddress, abi, provider);

async function initialize() {
    if(contract) {
        console.log("Contract is intialized");
        await displayName();
        await displaySymbol();
        await displayBalance();
    } else {
        console.log("Contract could not be intialized");
    }
}

async function displayName() {
    contractName = await contract.name();
    console.log("Current contract name is " + contractName);
}

async function displaySymbol() {
    contractSymbol = await contract.symbol();
    console.log("Current contract symbol is " + contractSymbol);
}

async function displayBalance() {
    let address = await walletAddress(false);
    let balance = await getBalance(address);
    console.log("Current balance is " + balance);
    contractBalance = balance;
}

async function getBalance(address) {
    let balance = await contract.balanceOf(address);
    return ethers.utils.formatUnits(balance, 18);
}

function name() {
    return contractName;
}

function symbol() {
    return contractSymbol;
}

function balance() {
    return contractBalance;
}