
export { 
    contractAddress, 
    initialize,
    isOwner,
    name, 
    symbol, 
    decimals, 
    currentItemCount, 
    maxItemCount, 
    balance, 
    queryCurrentItemCount, 
    queryMaxItemCount, 
    queryBalance, 
    burn, 
    mint,
    withdraw,
    showNotification 
};

import { inject } from 'vue'

const { AVALANCHE_TESTNET_PARAMS, showNotification } = require("./globals.js");

const { contractAddress, contractAbi } = require("./contractMeta.js");

const { ethers } = require("ethers");

const { signer } = require("./wallet.js");

const provider = new ethers.providers.JsonRpcProvider(AVALANCHE_TESTNET_PARAMS.rpcUrls[0]);

let emitter;

let contract;

let isOwner;
let name;
let symbol;
let decimals;
let currentItemCount;
let maxItemCount;
let balance;

const defaultDecimals = 0; // 18 for Fungibles

async function initialize() {
    emitter = inject("emitter");
    if(signer()) {
        contract = new ethers.Contract(contractAddress, contractAbi, signer());
    } else {
        contract = new ethers.Contract(contractAddress, contractAbi, provider);
    }
    if(contract) {
        console.log("Contract is initialized");
        await queryName();
        await querySymbol();
        await queryCurrentItemCount();
        await queryMaxItemCount();
        await queryBalance();
        await checkOwnership();
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

async function queryCurrentItemCount() {
    currentItemCount = await contract.currentItemCount();
    console.log("Contract current NFT count is " + currentItemCount);
}

async function queryMaxItemCount() {
    maxItemCount = await contract.maxItemCount();
    console.log("Contract maximum NFT count is " + maxItemCount);
}

async function queryBalance() {

    if(!signer()) {
        return;
    }

    const address = await signer().getAddress();
    balance = await getBalance(address);
    console.log("Current balance is " + balance);

}

async function getBalance(address) {
    const balance = await contract.balanceOf(address);
    return ethers.utils.formatUnits(balance, decimals ?? defaultDecimals);
}

async function burn() {

    if(!signer()) {
        return;
    }

    const address = await signer().getAddress();
    console.log("ADDRESS => " + address);

    const itemId = (currentItemCount ?? 1) - 1;

    contract.destroyItem(itemId).then(() => {
        console.log("[BURN]: Transaction submitted");
        showNotification("Processing", "Transaction submitted."); 
    }, () => {
        console.log("[BURN]: Transaction rejected");
        showNotification("Failure", "Your transaction is rejected.");
    });

}

async function mint() {

    if(!signer()) {
        return;
    }

    const address = await signer().getAddress();
    console.log("ADDRESS => " + address);

    const itemPrice = await contract.itemFee();

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

async function withdraw() {

    if(!isOwner) {
        return;
    }

    if(!signer()) {
        return;
    }

    const amount = await provider.getBalance(contractAddress);
    console.log("Contract balance amount is " + amount);

    if(amount <= 0) {
        console.log("No amount to withdraw");
        return;
    }

    contract.withdraw(amount).then(() => {
        console.log("[WITHDRAW]: Transaction submitted");
        showNotification("Processing", "Transaction submitted."); 
    }, () => {
        console.log("[WITHDRAW]: Transaction rejected");
        showNotification("Failure", "Your transaction is rejected.");
    });

}

async function hookMintEvents() {

    if(!signer()) {
        return;
    }

    const address = await signer().getAddress();

    const filterTo = contract.filters.Transfer(null, address);

    contract.on(filterTo, (from, to, amount) => {
        // The `to` will always be the signer address
        console.log("[MINT]: Transaction completed, " + from + " => " + to + ", amount " + ethers.utils.formatUnits(amount, decimals ?? defaultDecimals));
        showNotification("Success", "You've just mint an NFT!");
        setTimeout(() => {
            refreshStats();
        }, 1024);
    });

}

async function checkOwnership() {

    if(!signer()) {
        return;
    }

    const address = await signer().getAddress();
    console.log("ADDRESS => " + address);

    const owner = await contract.owner();
    console.log("Contract owner is " + owner);

    isOwner = address === owner;

}

async function refreshStats() {
    await queryCurrentItemCount();
    await queryMaxItemCount();
    await queryBalance();
    await emitter.emit("onUpdateContractStats");
}