
export { contractAddress, initialize, name, symbol, decimals, totalSupply, balance, queryBalance, queryTotalSupply, burn, mint }

const { AVALANCHE_TESTNET_PARAMS } = require("./globals.js");

const { contractAddress, contractAbi } = require("./contractMeta.js");

const { ethers } = require("ethers");

const { signer } = require("./wallet.js");

const provider = new ethers.providers.JsonRpcProvider(AVALANCHE_TESTNET_PARAMS.rpcUrls[0]);

const contract = new ethers.Contract(contractAddress, contractAbi, signer());

let name;
let symbol;
let decimals;
let totalSupply;
let balance;

async function initialize() {
    if(contract) {
        console.log("Contract is initialized");
        await queryName();
        await querySymbol();
        await queryDecimals();
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

async function queryDecimals() {
    decimals = await contract.decimals();
    console.log("Contract decimal count is " + decimals);
}

async function queryTotalSupply() {
    totalSupply = await contract.totalSupply()
    totalSupply = ethers.utils.formatUnits(totalSupply, decimals ?? 18)
    console.log("Contract total supply is " + totalSupply);
}

async function queryBalance() {
    const address = await signer().getAddress();
    balance = await getBalance(address);
    console.log("Current balance is " + balance);
}

async function getBalance(address) {
    const balance = await contract.balanceOf(address);
    return ethers.utils.formatUnits(balance, 18);
}

async function burn() {

    const address = await signer().getAddress();
    console.log("ADDRESS => " + address);

    const overrides = await contractInteractionOverrides();

    const amount = ethers.utils.parseUnits("1.0", decimals ?? 18);

    contract.burn(address, amount, overrides).then(() => {
        console.log("[BURN]: Transaction submitted");
    }, () => {
        console.log("[BURN]: Transaction rejected");
    });

}

async function mint() {

    const address = await signer().getAddress();
    console.log("ADDRESS => " + address);

    const overrides = await contractInteractionOverrides();

    const amount = ethers.utils.parseUnits("1.0", decimals ?? 18);

    contract.mint(address, amount, overrides).then(() => {
        console.log("[MINT]: Transaction submitted");
    }, () => {
        console.log("[MINT]: Transaction rejected");
    });

}

async function contractInteractionOverrides() {

    var gasEstimate;

    try {
        gasEstimate = await signer().estimateGas();
    } catch(error) {
        console.log("Error: " + error);
        gasEstimate = 3500000;
    }

    console.log("GAS ESTIMATE => " + gasEstimate);

    const gasPrice = await provider.getGasPrice();
    console.log("GAS PRICE => " + gasPrice);

    return {
        gasLimit: gasEstimate,
        gasPrice: gasPrice
    };

}

async function hookMintEvents() {
    const address = await signer().getAddress();
    const filterTo = contract.filters.Transfer(null, address);
    contract.on(filterTo, (from, to, amount) => {
        // The `to` will always be the signer address
        console.log("[MINT]: Transaction completed, " + from + " => " + to + ", amount " + ethers.utils.formatUnits(amount, decimals ?? 18));
    });
}