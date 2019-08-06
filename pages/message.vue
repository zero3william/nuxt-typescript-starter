<template>
  <div>
    <Search @change="handleChange"></Search>
    <MsgList :rowData="showList"></MsgList>
  </div>
</template>
 
<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator'
import MsgList from '../components/MsgList.vue'
import Search from '../components/Search.vue'
import Channel from '~/models/Channel'

@Component({
  components: {
    MsgList,
    Search
  }
})
export default class Message extends Vue {
  private msgList: Array<Channel> = []
  private nameFilter: string = ''

  mounted() {
    this.$store.commit('CHANGE_TITLE', '消息')
  }

  get showList() {
    return this.msgList.filter(item => item.name.indexOf(this.nameFilter) >= 0)
  }

  get snapshot() {
    return this.$store.state.msgList
  }

  @Watch('snapshot', { immediate: true, deep: true })
  onSnapshotChanged() {
    if (this.snapshot === null || this.snapshot === undefined) return []
    this.msgList = Object.keys(this.snapshot.chat_list).map(keys => {
      const item = this.snapshot.chat_list[keys]
      return {
        id: item.user_id,
        // avatar: item.picture_id,
        avatar: `${this.$store.state.staticUrl}/img/${
          item.user_id % 21 ? item.user_id % 21 : '0'
        }.png`,
        name: item.username
          ? item.username
          : `${Math.round(Math.random() * 2) % 2 === 0 ? '破喉咙' : '没有人'}`,
        text: item.message,
        time: item.time,
        unread: item.unread
      }
    })
    this.msgList.sort(function(a, b) {
      return b.time - a.time
    })
  }

  handleChange(val) {
    this.nameFilter = val
  }
}
</script>