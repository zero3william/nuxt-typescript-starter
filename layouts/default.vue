<template>
  <div>
    <Header :left="isLeftShow" :right="isRightShow" :center="computedTitle" />
    <nuxt />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

@Component({
  components: {
    Header,
    Footer
  }
})
export default class DefaultLayout extends Vue {
  private title: string = ''
  private isLeftShow: boolean = false
  private isRightShow: boolean = false

  mounted() {}
  get computedTitle() {
    return this.$store.state.title
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
