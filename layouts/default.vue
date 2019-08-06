<template>
  <div>
    <Header />
    <nuxt />
    <Footer />
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
import Header from '../components/Header.vue'
import Footer from '../components/IndexFooter.vue'
import { setTimeout } from 'timers'

@Component({
  components: {
    Header,
    Footer
  }
})
export default class DefaultLayout extends Vue {
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
.navBar {
  background: #fffabc;
  a {
    border: 1px solid #000;
    padding: 2px;
    margin: 2px;
  }
}
</style>
