<template>
  <div>
    <div v-for="(type, index) in rowData" :key="index">
      <p class="friend-title">{{type.title}}</p>
      <ul class="friend-container">
        <li
          @click="handleClick(item.id,item.nickname)"
          class="friend-item"
          flex
          v-for="(item, index) in type.list"
          :key="index"
        >
          <img class="avatar" :src="item.avatar" />
          <div class="msg-content" flex-box="1">
            <span class="nickname">{{item.nickname}}</span>
            <span v-if="item.username" class="username">({{item.username}})</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Friend extends Vue {
  @Prop({ type: Array, required: true }) rowData

  handleClick(id: string, title: string) {
    this.$router.push({
      name: 'chatroom',
      params: { id, title, type: 'friend' }
    })
  }
}
</script>

<style lang="scss" scoped>
.friend-title {
  border-top: 1px solid #e8e6ec;
  height: 2.6rem;
  line-height: 2.6rem;
  background-color: #f0f1f6;
  position: relative;
  font-size: 1.2rem;
  padding: 0 0.64rem;
  margin: 0;
}

.friend-container {
  padding: 0;
  margin: 0;
  list-style: none;
  .friend-item {
    border-bottom: 1px solid #e8e6ec;
    padding: 0.5rem 0.8rem;
    align-items: center;
    .avatar {
      width: 52px;
      height: 52px;
      border-radius: 50%;
    }
    .msg-content {
      padding: 0.4rem 0.6rem;
      align-items: center;
      .nickname {
        font-size: 1.5rem;
      }
      .username {
        margin-left: 10px;
        color: #807e7e;
      }
    }
  }
}
</style>


