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
      copy: function() {
        copy(this.contractAddress, () => {
          const url = AVALANCHE_TESTNET_PARAMS.blockExplorerUrls[0] + 'address/' + this.contractAddress;
          window.open(url, "_blank");
        });
      },
      reload: async function() {
        this.contractAddress = await contract.contractAddress;
        this.contractName = await contract.name;
        this.contractSymbol = await contract.symbol;
        this.contractDecimals = await contract.decimals;
        this.contractCurrentItemCount = await contract.currentItemCount;
        this.contractMaxItemCount = await contract.maxItemCount;
        this.contractBalance = await contract.balance;
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
