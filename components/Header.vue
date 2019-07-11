<template>
  <header flex="main:justify cross:center">
    <div>
      <div v-if="left">左侧按钮</div>
    </div>
    <div>{{center}}</div>
    <div>
      <div v-if="right">右侧按钮</div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Header extends Vue {
  @Prop({ type: Boolean, required: false }) left!: false
  @Prop({ type: String, required: false }) center!: ''
  @Prop({ type: Boolean, required: false }) right!: false
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 4rem;
  background: linear-gradient(to bottom, #f63b46, #ff335c);
  color: #fff;
  font-size: 2rem;
}
</style>


