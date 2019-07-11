<template>
  <footer flex="box:mean">
    <nuxt-link class="footerNavBtn" to="/hall">聊天大厅</nuxt-link>
    <nuxt-link class="footerNavBtn" to="/message">消息</nuxt-link>
    <nuxt-link class="footerNavBtn" to="/contact">联系人</nuxt-link>
    <nuxt-link class="footerNavBtn" to="/setting">设置</nuxt-link>
  </footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
footer {
  position: absolute;
  width: 100%;
  min-height: 45px;
  left: 0;
  bottom: 0;
  z-index: 100;
  -webkit-box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
  background: #fff;
  border-top: 1px solid #efefef;
}
</style>


