<template>
  <footer flex>
    <nuxt-link
      class="footerNavBtn"
      to="/hall"
      flex="dir:top cross:center"
      flex-box="1"
      tag="div"
      replace
    >
      <i class="iconfont icon-hall" style="font-weight:bold;"></i>
      <div>聊天大厅</div>
    </nuxt-link>

    <nuxt-link
      class="footerNavBtn"
      to="/message"
      flex="dir:top cross:center"
      flex-box="1"
      tag="div"
      replace
    >
      <i class="iconfont icon-message">
        <span v-if="unread" class="badge" flex="main:center cross:center">{{unread}}</span>
      </i>
      <div>消息</div>
    </nuxt-link>

    <nuxt-link
      class="footerNavBtn"
      to="/contact"
      flex="dir:top cross:center"
      flex-box="1"
      tag="div"
      replace
    >
      <i class="iconfont icon-contact"></i>
      <div>联系人</div>
    </nuxt-link>

    <nuxt-link
      class="footerNavBtn"
      to="/setting"
      flex="dir:top cross:center"
      flex-box="1"
      tag="div"
      replace
    >
      <i class="iconfont icon-setting"></i>
      <div>设置</div>
    </nuxt-link>
  </footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Friend from './Contacts.vue'
import MsgList from './MsgList.vue'

@Component
export default class IndexFooter extends Vue {
  private unread: number = 0

  mounted() {
    if (this.$store.state.msgList === null) return
    const chat_list = this.$store.state.msgList.chat_list
    this.unread = Object.keys(chat_list).reduce((a, b) => {
      a += chat_list[b].unread
      return a
    }, 0)
  }
}
</script>

<style lang="scss" scoped>
footer {
  position: absolute;
  width: 100%;
  height: 50px;
  left: 0;
  bottom: 0;
  z-index: 100;
  -webkit-box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
  background: #fff;
  border-top: 1px solid #efefef;
  align-items: center;
  .footerNavBtn {
    color: #a8a8a8;
    .iconfont {
      font-size: 2rem;
      position: relative;
    }
    &.nuxt-link-exact-active {
      color: red;
    }
    .badge {
      position: absolute;
      top: -3px;
      right: calc(50% - 2rem);
      border-radius: 11px;
      height: 17px;
      min-width: 17px;
      padding: 1px;
      font-size: 0.8rem;
    }
  }
}
</style>


