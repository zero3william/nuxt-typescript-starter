<template>
  <div class="search-top" flex="main:center cross:center">
    <input
      @keyup="$emit('change',$event.target.value)"
      type="text"
      placeholder="搜索"
      class="search-btn"
    />
    <i class="iconfont icon-search text-secondary"></i>
  </div>
</template>
  
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Search extends Vue {}
</script>

<style lang="scss" scoped>
.search-top {
  position: relative;
  width: 100%;
  height: 4.2rem;
  overflow: hidden;
  background-color: #f0eff5;
  .search-btn {
    font-size: 1.4rem;
    background-color: #fff;
    border: 1px solid #eee;
    width: 98%;
    height: 3rem;
    padding-left: 34px;
  }
  .icon-search {
    position: absolute;
    top: 16px;
    left: 14px;
  }
}
</style>
