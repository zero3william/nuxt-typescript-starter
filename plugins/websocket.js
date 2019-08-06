import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import { wsBaseIp } from './axios'

export default () => {
    Vue.use(VueNativeSock, wsBaseIp, { connectManually: true })
} 