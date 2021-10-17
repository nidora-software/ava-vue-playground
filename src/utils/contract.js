
export { contractAddress, initialize, name, symbol, decimals, totalSupply, balance, queryBalance, burn, mint }

const { AVALANCHE_TESTNET_PARAMS } = require("./globals.js");

const { contractAddress, contractAbi } = require("./contractMeta.js");

const { ethers } = require("ethers");

const { signer } = require("./wallet.js");

const provider = new ethers.providers.JsonRpcProvider(AVALANCHE_TESTNET_PARAMS.rpcUrls[0]);

let name;
let symbol;
let decimals;
let totalSupply;
let balance;

const contract = new ethers.Contract(contractAddress, contractAbi, signer());

async function initialize() {
    if(contract) {
        console.log("Contract is intialized");
        await queryName();
        await querySymbol();
        await queryDecimals();
        await queryTotalSupply();
        await queryBalance();
    } else {
        console.log("Contract could not be intialized");
    }
}

async function queryName() {
    name = await contract.name();
    console.log("Current contract name is " + name);
}

async function querySymbol() {
    symbol = await contract.symbol();
    console.log("Contract symbol is " + symbol);
}

async function queryDecimals() {
    decimals = await contract.decimals();
    console.log("Contract decimal count is " + decimals);
}

async function queryTotalSupply() {
    totalSupply = await contract.totalSupply()
    let decimalCount = decimals ?? 18;
    totalSupply = totalSupply.toString()
    totalSupply = totalSupply.slice(0, totalSupply.length - decimalCount);
    console.log("Contract total supply is " + totalSupply);
}

async function queryBalance() {
    let address = await signer().getAddress();
    balance = await getBalance(address);
    console.log("Current balance is " + balance);
}

async function getBalance(address) {
    let balance = await contract.balanceOf(address);
    return ethers.utils.formatUnits(balance, 18);
}

async function burn() {

    let address = await signer().getAddress();
    console.log("ADDRESS => " + address);

    let amount = ethers.utils.parseUnits("1.0", decimals ?? 18);

    var gasEstimate;

    try {
        gasEstimate = await signer().estimateGas();
    } catch(error) {
        console.log("Error: " + error);
        gasEstimate = 3500000;
    }

    console.log("GAS ESTIMATE => " + gasEstimate);

    let gasPrice = await provider.getGasPrice();
    console.log("GAS PRICE => " + gasPrice);

    var overrides = {
        gasLimit: gasEstimate,
        gasPrice: gasPrice
    };

    contract.burn(address, amount, overrides).then(value => {
        console.log("Transaction completed with value " + value);
    }, reason => {
        console.log("Transaction rejected with reason " + reason);
    });

}

async function mint() {
    console.log("Mint is coming soon!");
}