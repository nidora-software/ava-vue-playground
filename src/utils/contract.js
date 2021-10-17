
export { contractAddress, initialize, isContractInitialized, name, symbol, decimals, totalSupply, balance, queryTotalSupply, queryBalance, burn, mint, showNotification }

const { AVALANCHE_TESTNET_PARAMS, showNotification } = require("./globals.js");

const { contractAddress, contractAbi } = require("./contractMeta.js");

const { ethers } = require("ethers");

const { signer } = require("./wallet.js");

// eslint-disable-next-line no-unused-vars
const provider = new ethers.providers.JsonRpcProvider(AVALANCHE_TESTNET_PARAMS.rpcUrls[0]);

let contract;

let isContractInitialized;
let name;
let symbol;
let decimals;
let totalSupply;
let balance;

const defaultDecimals = 0; // 18 for Fungibles

async function initialize() {
    if(signer()) {
        contract = new ethers.Contract(contractAddress, contractAbi, signer());
        isContractInitialized = true;
    } else {
        isContractInitialized = false;
        return;
    }
    if(isContractInitialized) {
        console.log("Contract is initialized");
        await queryName();
        await querySymbol();
        await queryTotalSupply();
        await queryBalance();
        hookMintEvents();
    } else {
        console.log("Contract could not be initialized");
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

// eslint-disable-next-line no-unused-vars
async function queryDecimals() {
    decimals = await contract.decimals();
    console.log("Contract decimal count is " + decimals);
}

async function queryTotalSupply() {
    totalSupply = await contract.totalSupply()
    totalSupply = ethers.utils.formatUnits(totalSupply, decimals ?? defaultDecimals)
    console.log("Contract total supply is " + totalSupply);
}

async function queryBalance() {
    const address = await signer().getAddress();
    balance = await getBalance(address);
    console.log("Current balance is " + balance);
}

async function getBalance(address) {
    const balance = await contract.balanceOf(address);
    return ethers.utils.formatUnits(balance, decimals ?? defaultDecimals);
}

async function burn() {

    const address = await signer().getAddress();
    console.log("ADDRESS => " + address);

    const itemId = (totalSupply ?? 1) - 1;

    contract.destroyItem(itemId).then(() => {
        console.log("[BURN]: Transaction submitted");
        showNotification("Processing", "Transaction submitted."); 
    }, () => {
        console.log("[BURN]: Transaction rejected");
        showNotification("Failure", "Your transaction is rejected.");
    });

}

async function mint() {

    const address = await signer().getAddress();
    console.log("ADDRESS => " + address);

    const itemPrice = ethers.utils.parseEther("1.0");

    const overrides = {
        value: itemPrice
    };

    contract.createItem(address, overrides).then(() => {
        console.log("[MINT]: Transaction submitted");
        showNotification("Processing", "Transaction submitted."); 
    }, () => {
        console.log("[MINT]: Transaction rejected");
        showNotification("Failure", "Your transaction is rejected.");
    });

}

async function hookMintEvents() {
    const address = await signer().getAddress();
    const filterTo = contract.filters.Transfer(null, address);
    contract.on(filterTo, (from, to, amount) => {
        // The `to` will always be the signer address
        console.log("[MINT]: Transaction completed, " + from + " => " + to + ", amount " + ethers.utils.formatUnits(amount, decimals ?? defaultDecimals));
        showNotification("Success", "You've just mint an NFT!"); 
    });
}