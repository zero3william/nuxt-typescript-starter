<template>
  <ul class="list-container">
    <li
      @click="handleClick(item.id,item.name)"
      class="list-item"
      flex
      v-for="(item, index) in rowData"
      :key="index"
    >
      <img class="avatar" :src="item.avatar" />
      <div class="msg-content" flex-box="1">
        <div class="name">{{item.name}}</div>
        <div class="text text-secondary">{{item.text}}</div>
      </div>
      <div flex="dir:top cross:bottom">
        <span class="time text-secondary">{{item.time === 0 ? '' : timeFormat(item.time)}}</span>
        <span v-if="item.unread" class="badge" flex="main:center cross:center">{{item.unread}}</span>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { listTimeFormat } from '../utils/time'

@Component
export default class MsgList extends Vue {
  @Prop({ type: Array, required: true }) rowData
  private $dayjs

  handleClick(id: string, title: string) {
    let type: string = ''
    switch (this.$route.name) {
      case 'hall':
        type = 'hall'
        break
      case 'contact':
      case 'message':
        type = 'friend'
        break
    }
    this.$router.push({ name: 'chatroom', params: { id, title, type } })
  }

  get timeFormat() {
    return listTimeFormat
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  padding: 0;
  margin: 0;
  list-style: none;
  .list-item {
    border-bottom: 1px solid #f3f3f3;
    padding: 0.5rem 0.8rem;
    .avatar {
      width: 52px;
      height: 52px;
      border-radius: 50%;
    }
    .msg-content {
      padding: 0.4rem 0.6rem;
      .name {
        font-size: 1.5rem;
      }
      .text {
        padding: 0.4rem 0;
      }
    }
    .time {
      font-size: 1.3rem;
      margin-bottom: 3px;
    }
  }
}
</style>


