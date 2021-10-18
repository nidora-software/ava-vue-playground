export { AVALANCHE_MAINNET_PARAMS, AVALANCHE_TESTNET_PARAMS, showNotification, copy };

import { notify } from "notiwind";

const AVALANCHE_MAINNET_PARAMS = {
    chainId: "0x"+(43114).toString(16),
    chainName: 'Avalanche Mainnet C-Chain',
    nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax.network/']
};

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
};

async function copy(text, failure = () => {}) {
    const clipboard = navigator.clipboard;
    if(clipboard) {
        await clipboard.writeText(text);
        // alert('Copied');
        showNotification("Success", "Copied!");
    } else {
        // alert('Cannot copy ' + error);
        // showNotification("Cannot copy");
        failure();
    }
}

function showNotification(title, message, dismissAfter = 4000) {
    notify({
        group: "top",
        title: title,
        text: message
      }, dismissAfter);
}