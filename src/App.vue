<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Avalanche Vue Playground" />
  <Wallet />
  <Contract />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Wallet from "./components/Wallet.vue";
import Contract from "./components/Contract.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
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
  color: #5980a8;
  margin-top: 60px;
}

:root {
  --main-color: rgb(255, 0, 179);
}

</style>
