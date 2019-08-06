<template>
  <div>
    <h2>CONSOLE</h2>
    <p v-html="msg"></p>

    <div flex="dir:top cross:top">
      <div>
        <label for="username">用户名</label>
        <input id="username" type="text" v-model="username" />
      </div>
      <div>
        <label for="password">密码</label>
        <input id="password" type="text" v-model="password" />
      </div>
      <button @click="login">账号密码登入</button>
    </div>
  </div>
</template>
 
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {},
  layout: 'login'
})
export default class Login extends Vue {
  private username: string = 'test1'
  private password: string = '123456'
  private msg: string = '登入中<br>'
  private $goralApi
  private $thirdApi
  public $options

  mounted() {
    if (
      this.$route.query.channel_id &&
      this.$route.query.login_session_id &&
      this.$route.query.username
    ) {
      const { channel_id, login_session_id, username } = this.$route.query
      const objJsonStr = JSON.stringify({
        channel_id,
        login_session_id,
        username
      })
      const objJsonB64 = Buffer.from(objJsonStr).toString('base64')

      window.sessionStorage['channel_id'] = channel_id
      window.sessionStorage['login_session_id'] = login_session_id
      window.sessionStorage['username'] = username
      window.sessionStorage['getWsLoginToken'] = objJsonB64

      this.getToken()
    }

    this.$options.sockets.onopen = data => {
      // 成功登入
      this.msg += 'Success Login Chatroom<br>'
      // 取得大厅列表
      this.$store.dispatch(
        'getHalls',
        window.sessionStorage.getItem('channel_id')
      )
      // 取得个人消息列表
      this.$store.dispatch(
        'getMsgList',
        window.sessionStorage.getItem('user_id')
      )
      // 取得联系人列表
      this.$goralApi
        .getContacts()
        .then(resp => {
          this.msg += 'Success Get Contacts<br>'
          this.$store.dispatch('changeContacts', resp)
          this.$router.replace('hall')
        })
        .catch(err => {
          this.msg += `Get Contacts Failed<br>${err}<br>`
        })
    }
  }

  getToken() {
    this.$goralApi
      .getWsLoginToken()
      .then(resp => {
        this.msg += 'Success Get Websocket Login Token<br>'
        window.sessionStorage.setItem('wsToken', resp.login_token)
        window.sessionStorage.setItem('user_id', resp.user_id)
        this.$store.dispatch(
          'loginChatroom',
          `token=${resp.login_token}&username=${window.sessionStorage.getItem(
            'username'
          )}&channel=${window.sessionStorage.getItem('channel_id')}`
        )
        const objJsonStr = JSON.stringify({
          channel_id: window.sessionStorage.getItem('channel_id'),
          login_token: window.sessionStorage.getItem('wsToken'),
          username: window.sessionStorage.getItem('username')
        })
        const objJsonB64 = Buffer.from(objJsonStr).toString('base64')
        window.sessionStorage['goralToken'] = objJsonB64
      })
      .catch(err => {
        this.msg += `Get Websocket Login Token Failed<br>${err}<br>`
      })
  }

  login() {
    this.$thirdApi
      .getLoginSessionId({
        username: this.username,
        password: this.password
      })
      .then(resp => {
        window.sessionStorage['channel_id'] = 1
        window.sessionStorage['login_session_id'] = resp.login_session_id
        window.sessionStorage['username'] = this.username
        const objJsonStr = JSON.stringify({
          channel_id: 1,
          login_session_id: resp.login_session_id,
          username: this.username
        })
        const objJsonB64 = Buffer.from(objJsonStr).toString('base64')
        window.sessionStorage['getWsLoginToken'] = objJsonB64
        this.getToken()
      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>