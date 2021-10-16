<template>
  <div class="wallet">
    <h1>Wallet Plugin</h1>
    <div class="connect-button">
      <div v-if="isConnected">
        <button v-on:click="disconnect">{{ walletAddress }}</button>
      </div>
      <div v-else>
        <button v-on:click="connect">Connect</button>
      </div>
    </div>
    <label>Block number is {{ block }}</label>
    <div v-if="isConnected">
      <label>Balance is {{ balance }} AVAX</label>
      <button v-on:click="faucet">Faucet</button>
      <button v-on:click="mint">Mint</button>
    </div>
  </div>
</template>

<script>
import * as wallet from '../utils/wallet.js'
export default {
  name: 'Wallet',
  data() {
    return {
      block: wallet.block(),
      isConnected: wallet.isConnected(),
      walletAddress: wallet.walletAddress(),
      balance: wallet.balance()
    }
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
      disconnect: async function() {
        await wallet.disconnect();
        this.reload();
      },
      faucet: function() {
        wallet.faucet();
      },
      mint: function() {
        console.log("Mint success");
      },
      reload: async function() {
        this.block = wallet.block();
        this.isConnected = wallet.isConnected();
        this.walletAddress = wallet.walletAddress();
        this.balance = await wallet.balance();
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
