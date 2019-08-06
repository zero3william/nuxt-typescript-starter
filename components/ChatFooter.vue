<template>
  <footer class="chat-footer">
    <div v-if="emojiOpend" id="emoji-table">
      <ul class="emoji-list">
        <li
          class="emoji-item"
          flex="main:center cross:center"
          v-for="(item, index) in emojiList"
          :key="index"
        >
          <img @click="selectEmoji" :title="item.title" :src="item.url" />
        </li>
      </ul>
    </div>
    <div class="msgBox" flex="cross:center">
      <input @keyup.enter="handleSendMsg" flex-box="1" type="text" v-model="inputContent" />
      <i @click="showEmojiTable" class="iconfont icon-emoji" style="margin:0 1rem;"></i>
      <div @click="handleSendMsg" class="button">发送</div>
    </div>
    <div class="bottom-menu" flex="box:mean cross:center">
      <div class="menu-item">
        <i @click="handleSendPic" class="iconfont icon-foot1"></i>
        <input id="files" style="display:none;" type="file" @change="onFileSelected" multiple />
      </div>
      <div class="menu-item">
        <i class="iconfont icon-foot2"></i>
      </div>
      <div class="menu-item">
        <i class="iconfont icon-foot3"></i>
      </div>
      <div class="menu-item">
        <i class="iconfont icon-foot4"></i>
      </div>
      <div class="menu-item">
        <i class="iconfont icon-foot5"></i>
      </div>
      <div class="menu-item">
        <i class="iconfont icon-foot6"></i>
      </div>
      <div class="menu-item">
        <i class="iconfont icon-foot7-1"></i>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import emoji from '../utils/emoji'

@Component({
  components: {}
})
export default class ChatFooter extends Vue {
  @Prop({ type: String, required: true }) channelNum
  @Prop({ type: String, required: true }) channelType

  private $goralApi
  private $toast
  private inputContent: string = ''
  private emojiOpend = false
  private emojiList = emoji
  private selectedFile = null

  showEmojiTable() {
    if (this.emojiOpend === true) return
    this.emojiOpend = true
    setTimeout(() => {
      window.addEventListener('click', this.hideEmojiTable)
    }, 100)
  }
  hideEmojiTable() {
    this.emojiOpend = false
    window.removeEventListener('click', this.hideEmojiTable)
  }
  selectEmoji(e) {
    this.inputContent += e.target.attributes['title'].value
  }
  handleSendMsg() {
    if (this.inputContent.trim() === '') return
    this.$store.dispatch('sendMessage', {
      channelNum: this.channelNum,
      channelType: this.channelType,
      text: this.inputContent
    })
    this.inputContent = ''
  }
  handleSendPic() {
    let btn: HTMLElement | null = document.getElementById('files')
    if (btn) btn.click()
  }
  onFileSelected(e) {
    const fileList = e.target.files
    if (fileList.length > 5) {
      this.$notify({
        title: '超过上限',
        text: '一次最多传五张'
      })
      return
    }
    let fd = new FormData()
    for (let i = 0; i < fileList.length; i++) {
      fd.append('fileKey', e.target.files[i], e.target.files[i].name)
    }
    fd.append('chat_room_id', `${this.channelType}-${this.channelNum}`)
    fd.append('group', `${this.channelType}`)

    this.$goralApi
      .uploadImg(fd)
      .then(resp => {})
      .catch(err => {
        switch (err) {
          case 'over_size':
            this.$notify({ title: '图片大小超过上限', text: '最大限制500KB' })
            break
          case 'unsupported':
            this.$notify({ title: '图片格式不符', text: '仅支持jpg,jpeg,png' })
            break
        }
      })
  }
}
</script>

<style lang="scss" scoped>
.chat-footer {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 100;
  -webkit-box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
  background: #fff;
  border-top: 1px solid #efefef;
  align-items: center;
  #emoji-table {
    position: absolute;
    background: #fff;
    top: -155px;
    height: 155px;
    width: 100%;
    overflow: auto;
    .emoji-list {
      padding: 0 1vw;
      margin: 0;
      list-style: none;
      .emoji-item {
        float: left;
        width: 9.8vw;
        height: 9.8vw;
        text-align: center;
        img {
          width: 22px;
          height: 22px;
        }
      }
    }
  }
  .msgBox {
    padding: 0 10px;
    background: #f4f4f6;
    height: 50px;
    input {
      height: 38px;
      line-height: 38px;
      border-radius: 5px;
      font-size: 1.4rem;
      padding: 0.5rem;
      resize: none;
      background: #fff;
      border: 1px solid #e5e5e5;
    }
  }
  .bottom-menu {
    background: #f4f4f6;
    height: 50px;
    border-top: 1px solid #ececee;
    .menu-item {
      text-align: center;
    }
  }
  .iconfont {
    color: #6f6f6f;
    font-size: 2.9rem;
    &.disabled {
      color: #a8a8a8;
    }
  }
}
</style>


