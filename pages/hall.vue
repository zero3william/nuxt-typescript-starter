<template>
  <div>
    <MsgList :rowData="hallList"></MsgList>
  </div>
</template>
 
<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator'
import MsgList from '../components/MsgList.vue'
import Channel from '~/models/Channel'

@Component({
  components: {
    MsgList
  }
})
export default class Hall extends Vue {
  private hallList: Array<Channel> = []

  mounted() {
    this.$store.dispatch('changeTitle', '聊天大厅')
  }

  get snapshot() {
    return this.$store.state.halls
  }

  @Watch('snapshot', { immediate: true, deep: true })
  onSnapshotChanged() {
    if (this.snapshot === null || this.snapshot === undefined) return []

    this.hallList = Object.keys(this.snapshot.hall_list).map(keys => {
      const hall_info = this.snapshot.hall_list[keys].hall_info
      const last_messages = this.snapshot.hall_list[keys].last_messages
      return {
        id: hall_info.id,
        avatar: hall_info.image_url
          ? hall_info.image_url
          : `${this.$store.state.staticUrl}/img/0.png`,
        name: hall_info.name,
        text: last_messages ? last_messages.message : '',
        time: last_messages ? last_messages.time : 0,
        unread: 0
      }
    })
    this.hallList.sort(function(a, b) {
      return b.time - a.time
    })
  }
}
</script>