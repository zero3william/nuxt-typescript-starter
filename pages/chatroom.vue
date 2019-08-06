<template>
  <div>
    <Header @back="handleBack" />
    <ul id="chat-content">
      <li
        :flex="item.user_id === selfId ? 'dir:right' : 'dir:left'"
        :msgId="item.message_id"
        class="chat-item"
        v-for="(item, index) in msgList"
        :key="index"
      >
        <!-- avatar -->
        <img class="avatar" :src="item.avatar" />
        <!-- type -->
        <div v-if="item.type==='text'" class="msg-content">
          <div v-if="item.user_id !== selfId" class="name">{{item.username}}</div>
          <div
            flex="cross:center"
            :class="item.user_id === selfId ? 'tri-right' : 'tri-left'"
            class="text"
            v-html="transferTextContent(item.attach.message)"
          ></div>
        </div>
        <div v-if="item.type==='image'" class="img-content">
          <div v-if="item.user_id !== selfId" class="name">{{item.username}}</div>
          <img class="thumb" :src="item.attach.ori_url" @error="noImg" />
        </div>
        <!-- time -->
        <div class="time text-secondary">{{ timeFormat(item.create_time) }}</div>
      </li>
    </ul>
    <ChatFooter :channelNum="channelNum" :channelType="channelType" />
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator'
import ChatFooter from '../components/ChatFooter.vue'
import Header from '../components/Header.vue'
import { setTimeout } from 'timers'
import { msgTimeFormat } from '../utils/time'
import emojiArr from '../utils/emoji'

@Component({
  components: { ChatFooter, Header },
  layout: 'chat'
})
export default class Chatroom extends Vue {
  private selfId: string = ''
  private targetId: string = ''
  private channelType: string = ''
  private msgList: Array<any> = []
  private firstScroll = true

  mounted() {
    if (!this.$route.params.id || !this.$route.params.type) return
    this.selfId = window.sessionStorage.getItem('user_id') as string
    this.targetId = this.$route.params.id
    this.channelType = this.$route.params.type
    this.$store.dispatch('changeTitle', this.$route.params.title)
    this.$store.dispatch('enterChannel', {
      channelNum: this.channelNum,
      channelType: this.channelType
    })
  }

  get timeFormat() {
    return msgTimeFormat
  }

  get snapshot() {
    return this.$store.state.chatRoom
  }

  get channelNum() {
    let temp: string = ''
    if (this.channelType === 'hall') {
      temp = `${window.sessionStorage.getItem('channel_id')}-${this.targetId}`
    }
    if (this.channelType === 'friend' && this.selfId !== '') {
      temp =
        parseInt(this.selfId) > parseInt(this.targetId)
          ? `${this.targetId}-${this.selfId}`
          : `${this.selfId}-${this.targetId}`
    }
    return temp
  }

  @Watch('snapshot', { immediate: true, deep: true })
  onSnapshotChanged() {
    if (this.snapshot === null || this.snapshot === undefined) return []
    this.msgList =
      this.snapshot.messages === {}
        ? []
        : Object.keys(this.snapshot.messages).map(key => {
            return {
              ...this.snapshot.messages[key],
              avatar: `${this.$store.state.staticUrl}/img/0.png`
            }
          })
    this.msgList.sort(function(a, b) {
      return a.create_time - b.create_time
    })
    this.scrollToBottom(this.firstScroll)
    this.firstScroll = false
  }

  handleBack() {
    this.$store.dispatch('leaveChannel', {
      channelNum: this.channelNum,
      channelType: this.channelType
    })
    this.$router.back()
  }

  noImg(e) {
    e.target.src = `${this.$store.state.staticUrl}/img/pic.png`
  }

  transferTextContent(str) {
    return str.replace(/\[[^\s\]]{1,4}\]/g, $1 => {
      const match = emojiArr.find(item => item.title === $1)
      if (match) {
        return `<img src="${match.url}" />`
      } else {
        return $1
      }
    })
  }

  scrollToBottom(isFirst: boolean) {
    setTimeout(() => {
      let ele = document.getElementById('chat-content') as HTMLElement
      if (ele) {
        ele.scrollTo({
          top: ele.scrollHeight,
          left: 0,
          behavior: isFirst ? 'auto' : 'smooth'
        })
      }
    }, 100)
  }
}
</script>

<style lang="scss" scoped>
#chat-content {
  padding: 0;
  margin: 0;
  list-style: none;
  height: calc(100vh - 4rem - 100px);
  overflow: auto;
  .chat-item {
    padding: 2rem 0.5rem;
    .avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
    }
    .msg-content {
      position: relative;
      margin: 0 1rem;
      .name {
        position: absolute;
        top: -1.5rem;
        left: 0.5rem;
      }
      .text {
        padding: 0.7rem 1rem;
        max-width: 19rem;
        min-height: 3.7rem;
        min-width: 1.5rem;
        border-radius: 5px;
        background-color: #fff;
        word-break: break-all;
        text-align: left;
      }
      .tri-left:after {
        position: absolute;
        top: 1.2rem;
        left: -1.6rem;
        content: '';
        width: 0;
        height: 0;
        border-top: 0.6rem solid transparent;
        border-right: 0.8rem solid #fff;
        border-bottom: 0.6rem solid transparent;
        border-left: 0.8rem solid transparent;
      }
      .tri-right:after {
        position: absolute;
        top: 1.2rem;
        right: -1.6rem;
        content: '';
        width: 0;
        height: 0;
        border-top: 0.6rem solid transparent;
        border-right: 0.8rem solid transparent;
        border-bottom: 0.6rem solid transparent;
        border-left: 0.8rem solid #fff;
      }
    }
    .img-content {
      margin: 0rem 0.4rem;
      img {
        min-height: 100px;
        max-height: 180px;
        max-width: 19rem;
        width: auto;
      }
    }
    .time {
      font-size: 1.3rem;
      align-self: flex-end;
    }
  }
}
</style>