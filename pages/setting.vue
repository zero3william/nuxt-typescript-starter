<template>
  <div class="set">
    <div class="photo" flex="main:justify cross:center">
      <label for>修改头像</label>
      <i class="iconfont icon-arrow-right"></i>
      
    </div>
    <div class="nickname" flex="main:justify cross:center">
      <label >修改昵称</label>
      <label >換個头像 <i class="iconfont icon-arrow-right"></i></label>
     
    </div>
    <div class="newInfo" flex="main:justify cross:center">
      <label for>新消息通知</label>
    </div>
    <div class="reward" flex="main:justify cross:center">
      <label for>中奖通知</label>
    </div>
    <div class="sendInfo" flex="main:justify cross:center">
      <label for>回车键发送消息</label>
    </div>
    <div class="version" flex="main:justify cross:center">
      <label for>当前版本</label>
      <label for>1.12.5</label>
    </div>
  </div>
</template>
 
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class Setting extends Vue {
  private title: string = 'init'

  mounted() {
    this.$store.commit('CHANGE_TITLE', '设置')
  }
}
</script>


<style scoped>
.photo {
  border-bottom: 1px solid #e8e6ec;
  padding: 2rem;
}
.nickname {
  border-bottom: 1px solid #e8e6ec;
  padding: 2rem;
}
.newInfo {
  border-bottom: 1px solid #e8e6ec;
  padding: 2rem;
}
.reward {
  border-bottom: 1px solid #e8e6ec;
  padding: 2rem;
}
.sendInfo {
  border-bottom: 1px solid #e8e6ec;
  padding: 2rem;
}
.version {
  border-bottom: 1px solid #e8e6ec;
  padding: 2rem;
}
</style>
