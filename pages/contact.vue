<template>
  <div>
    <Search @change="handleChange"></Search>
    <ul class="group-container">
      <li class="group-item" flex>
        <i flex="main:center cross:center" class="avatar iconfont icon-create-group" />
        <div class="msg-content" flex-box="1">
          <div class="name">创建新群聊</div>
        </div>
      </li>
      <li class="group-item" flex>
        <i flex="main:center cross:center" class="avatar iconfont icon-group" />
        <div class="msg-content" flex-box="1">
          <div class="name">群聊</div>
        </div>
      </li>
    </ul>
    <Contacts :rowData="filterData"></Contacts>
  </div>
</template>
 
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import Search from '../components/Search.vue'
import Contacts from '../components/Contacts.vue'

@Component({
  components: {
    Search,
    Contacts
  }
})
export default class Contact extends Vue {
  private rowData: Array<any> = []
  private nameFilter: string = ''

  mounted() {
    this.$store.commit('CHANGE_TITLE', '联系人')
    if (this.$store.state.contacts === null) return

    this.rowData = Object.keys(this.$store.state.contacts).map(key => {
      if (key === 'parent') {
        const parent = this.$store.state.contacts[key]
        return {
          title: '上级',
          list: [
            {
              id: parent.id,
              avatar: `${this.$store.state.staticUrl}/img/${Math.floor(
                Math.random() * 10
              ) + 1}.png`,
              nickname: parent.nickname,
              username: parent.username
            }
          ]
        }
      }
      return {
        title: '下级好友',
        list: this.$store.state.contacts[key].map(item => {
          return {
            id: item.id,
            avatar: `${this.$store.state.staticUrl}/img/${Math.floor(
              Math.random() * 10
            ) + 1}.png`,
            nickname: item.nickname,
            username: item.username
          }
        })
      }
    })
  }

  get filterData() {
    return this.rowData.map(item => {
      return {
        title: item.title,
        list: item.list.filter(
          friend => friend.nickname.indexOf(this.nameFilter) >= 0
        )
      }
    })
  }

  handleChange(val) {
    this.nameFilter = val
  }
}
</script>

<style lang="scss" scoped>
.group-container {
  padding: 0;
  margin: 0;
  list-style: none;
  .group-item {
    border-top: 1px solid #e8e6ec;
    padding: 0.6rem 0.8rem;
    align-items: center;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      font-size: 2rem;

      &.icon-create-group {
        background: #0fade8;
        color: #fff;
      }
      &.icon-group {
        background: #f6b037;
        color: #fff;
      }
    }

    .msg-content {
      padding: 0.4rem 0.4rem;
      align-items: center;
      .name {
        font-size: 1.5rem;
      }
    }
  }
}
</style>


