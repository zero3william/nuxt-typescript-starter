<template>
  <header flex="main:justify cross:center">
    <div>
      <i @click="$emit('back')" v-if="left" class="iconfont icon-arrow-left"></i>
    </div>
    <div>{{title}}</div>
    <div>
      <i v-if="right" class="iconfont icon-menu"></i>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Header extends Vue {
  private left = true
  private right = true
  get title() {
    return this.$store.state.title
  }
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 4rem;
  background: linear-gradient(to bottom, #f63b46, #ff335c);
  color: #fff;
  font-size: 2rem;
  .iconfont {
    margin: 0 1rem;
    font-size: 2.2rem;
  }
}
</style>


