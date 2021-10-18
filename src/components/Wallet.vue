<template>
  <div class="wallet">
    <label class="plugin-title">Wallet Plugin</label>
    <div class="connect-button">
      <div v-if="isConnected">
        <button class="rounded-button" v-on:click="copy">{{ walletAddress }}</button>
      </div>
      <div v-else>
        <button class="rounded-button" v-on:click="connect">CONNECT</button>
      </div>
    </div>
    <!-- <div v-if="block">
      <label class="plugin-label">Block number is {{ block }}</label>
    </div> -->
    <div v-if="isConnected">
      <label class="plugin-label">Balance is {{ balance }} AVAX</label>
      <button class="rounded-button" v-on:click="queryBalance">QUERY BALANCE</button>
      <button class="rounded-button" v-on:click="faucet">FAUCET</button>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import * as wallet from '../utils/wallet.js'
import { AVALANCHE_TESTNET_PARAMS, copy } from '../utils/globals.js'
export default {
  name: 'Wallet',
  data() {
    return {
      block: undefined,
      isConnected: undefined,
      walletAddress: undefined,
      balance: undefined
    };
  },
  methods: {
      initialize: async function() {
        await wallet.initialize();
        this.reload();
      },
      connect: async function() {
        await wallet.connect();
        this.reload();
      },
      copy: function() {
        copy(this.walletAddress, () => {
          const url = AVALANCHE_TESTNET_PARAMS.blockExplorerUrls[0] + 'address/' + this.walletAddress;
          window.open(url, "_blank");
        });
      },
      queryBalance: async function() {
        await wallet.queryBalance();
        this.reload();
      },
      faucet: function() {
        wallet.faucet();
      },
      reload: async function() {
        this.block = await wallet.block();
        this.isConnected = await wallet.isConnected();
        this.walletAddress = await wallet.walletAddress(false);
        this.balance = wallet.balance;
      }
  },
  async created() {
    const emitter = inject("emitter");
    await this.initialize();
    emitter.on("onUpdateContractStats", () => {
      this.queryBalance();
    });
  }
}
</script>