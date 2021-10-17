export { initialize, block, isConnected, walletAddress, balance, connect, disconnect, faucet, signer }

const { ethereum } = window;

const { ethers } = require("ethers");

const { AVALANCHE_TESTNET_PARAMS } = require("./globals.js");

let provider;

let blockNumber;
let selectedAccount;

async function initialize() {

    if (isMetaMaskInstalled()) {

        provider = new ethers.providers.Web3Provider(ethereum);

        ethereum.on('accountsChanged', function (accounts) {
            // Time to reload your interface with accounts[0]!
            if (accounts) {
                console.log("Accounts changed " + accounts);
                loadPage();
            }
        });

        ethereum.on('chainChanged', function(chainId) {
            if (chainId) {
                console.log("Chain changed " + chainId);
                loadPage();
            }
        });

        await connect();

    } else {
        //alert("MetaMask is not installed.");
        console.log("MetaMask is not installed.");
    }

}

async function addNetworkToMetamask() {
    try {
        await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [AVALANCHE_TESTNET_PARAMS]
        });
        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
}

function block() {
    return blockNumber;
}

function isConnected() {
    return selectedAccount !== undefined;
}

function walletAddress(mask = true) {
    const account = selectedAccount;
    if(account) {
        return mask ? account.substring(0, 6) + "..." + account.substring(account.length-4, account.length) : account;
    }
}

async function balance() {
    if(selectedAccount) {
        const balance = await provider.getBalance(selectedAccount);
        return ethers.utils.formatEther(balance);
    }
    return 0;
}

async function connect() {

    if(!ethereum) {
        alert("MetaMask is not installed.");
        return;
    }

    await addNetworkToMetamask();

    blockNumber = await provider.getBlockNumber()
    console.log("Block number is " + blockNumber);

    const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
    });

    if(accounts) {
        selectedAccount = accounts[0];
        displayAccount(accounts[0]);
        console.log("Wallet connected");
    }

}

async function disconnect() {
    selectedAccount = undefined;
    console.log("Wallet disconnected");
}

function displayAccount(account) {
    const accountAddress = walletAddress(false);
    console.log("Current account is " + accountAddress);
    displayBalance(account);
}

async function displayBalance(account) {
    const balance = await provider.getBalance(account)
    const friendlyBalance = ethers.utils.formatEther(balance)
    console.log("Balance is " + friendlyBalance)
}

async function faucet() {
    window.open("https://faucet.avax-test.network/", "_blank");
}

function loadPage() {
    window.location.reload();
}

const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    return Boolean(ethereum && ethereum.isMetaMask);
};

const signer = () => {
    if(provider) {
        return provider.getSigner();
    }
}