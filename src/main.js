import { createApp } from 'vue'
import Notifications from "notiwind"
import App from './App.vue'
import mitt from 'mitt';
import './index.css'

const emitter = mitt(); 

const app = createApp(App);
app.use(Notifications);
app.provide('emitter', emitter);
app.mount('#app');