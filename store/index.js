import Vue from 'vue'
import { wsBaseIp } from '../plugins/axios'
import jp from 'jsonpath'

export const state = () => {
  return {
    title: '',
    staticUrl: process.env.NODE_ENV === 'production' ? '/husky/static' : '/static',
    halls: null,
    msgList: null,
    contacts: null,
    chatRoom: null,
    socket: {
      isConnected: false,
      reconnectError: false
    }
  }
}

const WS_SEQ = {
  getHalls: 1001,
  getMsgList: 1002,
  enterChannel: 1003,
  sendMessage: 1004,
  leaveChannel: 1005
}

export const mutations = {
  //socket start
  SOCKET_ONOPEN(state, event) {
    Vue.prototype.$socket = event.currentTarget
    state.socket.isConnected = true;
  },
  SOCKET_ONCLOSE(state, event) {
    state.socket.isConnected = false
  },
  SOCKET_ONERROR(state, event) {
    console.error(state, event)
  },
  SOCKET_ONMESSAGE(state, message) {
    if (message && message.topic) {
      switch (message.topic.split('/')[1]) {
        case 'chat_room':
          additionPush(message.push, state.chatRoom);
          break;
        case 'chat_list':
          if (message.topic.split('/')[2] === 'hall') {
            additionPush(message.push, state.halls);
          }
      }
      return
    }
    if (message && message.seq) {
      switch (message.seq) {
        case WS_SEQ.getHalls:
          state.halls = message.snapshot
          break;
        case WS_SEQ.getMsgList:
          state.msgList = message.snapshot
          break;
        case WS_SEQ.enterChannel:
          state.chatRoom = message.snapshot
          break;
        case WS_SEQ.leaveChannel:
          state.chatRoom = null
          break;
        case WS_SEQ.sendMessage:
          additionPush(message.snapshot, state.chatRoom)
          break;
      }
      return
    }
  },
  SOCKET_RECONNECT(state, count) {
    console.info(state, count)
  },
  SOCKET_RECONNECT_ERROR(state) {
    state.socket.reconnectError = true;
  },
  //socket end

  //store management
  CHANGE_TITLE(state, payload) {
    state.title = payload
  },
  CHANGE_CONTACTS(state, payload) {
    state.contacts = payload
  }
}

export const actions = {
  changeTitle(store, payload) {
    store.commit('CHANGE_TITLE', payload)
  },
  changeContacts(store, payload) {
    store.commit('CHANGE_CONTACTS', payload)
  },

  //websocket
  loginChatroom(store, payload) {
    const ws = new Vue()
    ws.$connect(`${wsBaseIp}?${payload}`, { format: 'json', store: store })
  },
  getHalls(store, channel_id) {
    Vue.prototype.$socket.sendObj({
      op: 'subscribe',
      seq: WS_SEQ.getHalls,
      topic: `/chat_list/hall/${channel_id}`
    })
  },
  getMsgList(store, user_id) {
    Vue.prototype.$socket.sendObj({
      op: 'subscribe',
      seq: WS_SEQ.getMsgList,
      topic: `/chat_list/friend/${user_id}`
    })
  },
  enterChannel(store, { channelNum, channelType }) {
    Vue.prototype.$socket.sendObj({
      seq: WS_SEQ.enterChannel,
      op: "subscribe",
      topic: `/chat_room/${channelType}/${channelNum}`
    })
  },
  leaveChannel(store, { channelNum, channelType }) {
    Vue.prototype.$socket.sendObj({
      seq: WS_SEQ.leaveChannel,
      op: "unsubscribe",
      topic: `/chat_room/${channelType}/${channelNum}`
    })
  },
  sendMessage(store, { channelNum, channelType, text }) {
    Vue.prototype.$socket.sendObj({
      seq: WS_SEQ.sendMessage,
      topic: `/chat_room/${channelType}/${channelNum}`,
      update: {
        action: 'send',
        send: {
          user_id: window.sessionStorage.getItem('user_id'),
          username: window.sessionStorage.getItem('username'),
          type: "text",
          attach: {
            message: text
          }
        }
      }
    })
  }
}

function additionPush(newVal, oldVal) {
  newVal.addition.map(obj => {
    for (var key in obj) {
      const str = key.split('.').map(item => item);
      str.push(obj[key][1]);
      jp.value(oldVal, jp.stringify(str), obj[key][2])
    }
  })
  oldVal.timestamp = newVal.timestamp
  oldVal.version = newVal.version
}