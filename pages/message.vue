<template>
  <div>{{title}}</div>
</template>
 
<script lang='ts'>
import axios from 'axios'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class Hall extends Vue {
  private title: string = 'init'

  mounted() {
    this.$store.commit('CHANGE_TITLE', '消息')
  }
}
</script>