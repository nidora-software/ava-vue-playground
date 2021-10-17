<template>
  <div class="contract" v-if="isContractInitialized">
    <h1>Contract Plugin</h1>
    <label>{{ contractName }} ({{ contractSymbol }})</label>
    <button>{{ contractAddress }}</button>
    <br><br>
    <label v-if="contractDecimals">Decimal count is {{ contractDecimals }}</label>
    <label v-if="contractTotalSupply">Total supply is {{ contractTotalSupply }} {{ contractSymbol }}</label>
    <button v-on:click="queryBalance">Query Balance</button>
    <button v-on:click="burn">Burn</button>
    <button v-on:click="mint">Mint</button>
    <div v-if="contractBalance">
      <label>Balance is {{ contractBalance }} {{ contractSymbol }}</label>
    </div>
  </div>
</template>

<script>
import * as contract from '../utils/contract.js'
export default {
  name: 'Contract',
  data() {
    return {
      isContractInitialized: undefined,
      contractAddress: undefined,
      contractName: undefined,
      contractSymbol: undefined,
      contractDecimals: undefined,
      contractTotalSupply: undefined,
      contractBalance: undefined
    };
  },
  methods: {
      initialize: async function() {
        await contract.initialize();
        this.reload();
      },
      queryBalance: async function() {
        await contract.queryTotalSupply();
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
      reload: async function() {
        this.isContractInitialized = await contract.isContractInitialized;
        this.contractAddress = await contract.contractAddress;
        this.contractName = await contract.name;
        this.contractSymbol = await contract.symbol;
        this.contractDecimals = await contract.decimals;
        this.contractTotalSupply = await contract.totalSupply;
        this.contractBalance = await contract.balance;
      }
  },
  async created() {
    await this.initialize();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

button {
  display: inline-block;
  height: 64px;
  line-height: 64px;
  padding: 0 32px 0 32px;
  margin-inline: 8px;
  border: 0px solid transparent;
  border-radius: 32px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.25em;
  font-weight: 600;
  text-transform: uppercase;
  color: #fff;
  -webkit-transition: .7s cubic-bezier(.17,.85,.438,.99);
  -o-transition: .7s cubic-bezier(.17,.85,.438,.99);
  transition: .7s cubic-bezier(.17,.85,.438,.99);
  background: var(--main-color);
}

button:hover {
  opacity: 0.5;
  cursor: pointer;
}

label {
  font-family: 'Montserrat', sans-serif;
  display: block;
  color: white;
  margin: 32px auto;
  font-size: 1.25em;
  font-weight: 600;
}

</style>
