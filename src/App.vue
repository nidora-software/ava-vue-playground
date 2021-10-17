<template>
  <div class="container mx-auto px-16">
    <div class="w-full flex justify-center">
      <div class="grid grid-cols-2 gap-8 mt-8">
        <img class="h-48" alt="Avalanche logo" src="./assets/ava-logo.png" />
        <img class="h-48" alt="Vue logo" src="./assets/vue-logo.png" />
      </div>
    </div>
    <Hello />
    <Wallet />
    <br>
    <Contract />
  </div>
  <Notifications />
</template>

<script>
import Notifications from "./components/Notifications.vue"
import Hello from "./components/Hello.vue";
import Wallet from "./components/Wallet.vue";
import Contract from "./components/Contract.vue";

export default {
  name: "App",
  components: {
    Notifications,
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

.plugin-title {
  display: block;
  font-size: 36px;
  font-weight: 800;
  margin-top: 16px;
  margin-bottom: 32px;
}

</style>
