export { initialize, block, isConnected, walletAddress, balance, connect, disconnect, faucet }

const { ethereum } = window;

const { ethers } = require("ethers");

const AVALANCHE_TESTNET_PARAMS = {
    chainId: "0x"+(43113).toString(16),
    chainName: 'Avalanche Testnet C-Chain',
    nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax-test.network/']
}

const provider = new ethers.providers.Web3Provider(ethereum);

// const signer = provider.getSigner()

// const provider = new ethers.providers.JsonRpcProvider(AVALANCHE_TESTNET_PARAMS.rpcUrls[0]);

let blockNumber;
let selectedAccount;

async function initialize() {

    if (typeof ethereum !== 'undefined') {

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
        alert("MetaMask is not installed.");
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
    let account = selectedAccount;
    if(account) {
        return mask ? account.substring(0, 6) + "..." + account.substring(account.length-4, account.length) : account;
    }
}

async function balance() {
    if(selectedAccount) {
        let balance = await provider.getBalance(selectedAccount);
        return ethers.utils.formatEther(balance);
    }
    return 0;
}

async function connect() {

    await addNetworkToMetamask();

    blockNumber = await provider.getBlockNumber()
    // 13098598
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

    let accountAddress = walletAddress(false);

    console.log("Current account is " + accountAddress);

    displayBalance(account);

}

async function displayBalance(account) {
    let balance = await provider.getBalance(account)
    let friendlyBalance = ethers.utils.formatEther(balance)
    console.log("Balance is " + friendlyBalance)
}

async function faucet() {
    window.open("https://faucet.avax-test.network/", "_blank");
}

function loadPage() {
    window.location.reload();
}