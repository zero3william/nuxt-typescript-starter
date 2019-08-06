<template>
  <div class="chat-bg">
    <nuxt />
    <notifications
      width="40%"
      :max="1"
      :duration="2000"
      :speed="300"
      position="top center"
      animation-name="customAnime"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class ChatLayout extends Vue {
  mounted() {
    if (this.$store.state.socket.isConnected === false) {
      this.$notify({
        title: '已登出',
        text: '即将跳转至登入页面'
      })
      setTimeout(() => {
        this.$router.replace('/')
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-bg {
  background: rgb(235, 235, 235);
  height: 100vh;
}
</style>
