<template>
  <div class="container mx-auto px-16">
    <div class="w-full flex justify-center">
      <div class="grid grid-cols-2 gap-8 mt-8">
        <img class="h-48 w-48" alt="Avalanche logo" src="./assets/ava-logo.png" />
        <img class="h-48 w-48" alt="Vue logo" src="./assets/vue-logo.png" />
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
import { inject } from 'vue'
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
  },
  created: function() {
    const emitter = inject("emitter");
    emitter.all.clear();
  }
};
</script>

<style>

body {
  background: rgb(20, 0, 40);
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
  --main-color: rgb(255, 0, 100);
}

.wallet {
  width: 680px;
  display: inline-block;
  padding-top: 16px;
  padding-bottom: 32px;
  padding-left: 32px;
  padding-right: 32px;
  background: rgb(15, 15, 45);
  border-radius: 16px 16px;
}

.contract {
  width: 680px;
  display: inline-block;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 32px;
  padding-right: 32px;
  background: rgb(15, 15, 45);
  border-radius: 16px 16px;
  margin-top: 48px;
}

.plugin-title {
  display: block;
  font-size: 32px;
  font-weight: 600;
  margin-top: 16px;
  margin-bottom: 32px;
}

.plugin-label {
  font-family: 'Montserrat', sans-serif;
  display: block;
  color: white;
  margin: 32px auto;
  font-size: 1.25em;
  font-weight: 600;
}

.rounded-button {
  display: inline-block;
  height: 64px;
  line-height: 64px;
  padding: 0 32px 0 32px;
  margin-inline: 8px;
  border: 0px solid transparent;
  border-radius: 32px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2em;
  font-weight: 600;
  color: #fff;
  -webkit-transition: .7s cubic-bezier(.17,.85,.438,.99);
  -o-transition: .7s cubic-bezier(.17,.85,.438,.99);
  transition: .7s cubic-bezier(.17,.85,.438,.99);
  background: var(--main-color);
}

.rounded-button:hover {
  opacity: 0.5;
  cursor: pointer;
}

.hello>p {
  font-size: 1.25em;
}

.hello>p>a {
  color: #42b983;
  text-decoration: underline;
}

</style>
