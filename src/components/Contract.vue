<template>
  <div class="contract" v-if="contractAddress">
    <label class="plugin-title">Contract Plugin</label>
    <label class="plugin-label" >{{ contractName }} ({{ contractSymbol }})</label>
    <button class="rounded-button" v-on:click="copy">{{ contractAddress }}</button>
    <label class="plugin-label" v-if="contractDecimals">Decimal count is {{ contractDecimals }}</label>
    <label class="plugin-label" v-if="contractCurrentItemCount && contractMaxItemCount">{{ contractCurrentItemCount }} / {{ contractMaxItemCount }} NFT's minted</label>
    <div v-if="contractBalance">
      <button class="rounded-button" v-on:click="queryBalance">QUERY BALANCE</button>
      <!-- <button class="rounded-button" v-on:click="burn">BURN</button> -->
      <button class="rounded-button" v-on:click="mint">MINT</button>
      <button class="rounded-button" v-if="isOwner" v-on:click="withdraw">WITHDRAW</button>
      <label class="plugin-label">Balance is {{ contractBalance }} {{ contractSymbol }}</label>
    </div>
    
  </div>
</template>

<script>
import { inject } from 'vue'
import * as contract from '../utils/contract.js'
import { AVALANCHE_TESTNET_PARAMS, copy } from '../utils/globals.js'
export default {
  name: 'Contract',
  data() {
    return {
      isOwner: false,
      contractAddress: undefined,
      contractName: undefined,
      contractSymbol: undefined,
      contractDecimals: undefined,
      contractCurrentItemCount: undefined,
      contractMaxItemCount: undefined,
      contractBalance: undefined
    };
  },
  methods: {
      initialize: async function() {
        await contract.initialize();
        this.reload();
      },
      queryBalance: async function() {
        await contract.queryBalance();
        this.reload();
      },
      burn: async function() {
        await contract.burn();
        this.reload();
      },
      mint: async function() {
        await contract.mint();
        this.reload();
      },
      withdraw: async function() {
        await contract.withdraw();
        this.reload();
      },
      copy: function() {
        copy(this.contractAddress, () => {
          const url = AVALANCHE_TESTNET_PARAMS.blockExplorerUrls[0] + 'address/' + this.contractAddress;
          window.open(url, "_blank");
        });
      },
      reload: function() {
        this.contractAddress = contract.contractAddress;
        this.contractName = contract.name;
        this.contractSymbol = contract.symbol;
        this.contractDecimals = contract.decimals;
        this.contractCurrentItemCount = contract.currentItemCount;
        this.contractMaxItemCount = contract.maxItemCount;
        this.contractBalance = contract.balance;
        this.isOwner = contract.isOwner;
      }
  },
  async created() {
    const emitter = inject("emitter");
    await this.initialize();
    emitter.on("onUpdateContractStats", () => {
      this.reload();
    });
  }
}
</script>
