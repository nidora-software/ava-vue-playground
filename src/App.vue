<template>
  <div>
    <img alt="Avalanche logo" height="180" src="./assets/ava-logo.png" />
    <img alt="Vue logo" height="180" src="./assets/vue-logo.png" style="margin-left: 32px;" />
  </div>
  <br>
  <Hello msg="Welcome to Avalanche Vue Playground" />
  <br>
  <Wallet />
  <br>
  <Contract />
</template>

<script>
import Hello from "./components/Hello.vue";
import Wallet from "./components/Wallet.vue";
import Contract from "./components/Contract.vue";

export default {
  name: "App",
  components: {
    Hello,
    Wallet,
    Contract
  }
};
</script>

<style>

body {
  background: rgb(26, 3, 41);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #65bdf0;
  margin-top: 32px;
}

:root {
  --main-color: rgb(255, 0, 179);
}

.wallet {
  display: inline-block;
  padding-top: 16px;
  padding-bottom: 32px;
  padding-left: 32px;
  padding-right: 32px;
  border: 2px white solid;
  border-radius: 16px 16px;
}

.contract {
  display: inline-block;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 32px;
  padding-right: 32px;
  border: 2px white solid;
  border-radius: 16px 16px;
  margin-top: 64px;
}

h1 {
  margin-bottom: 32px;
}

</style>
