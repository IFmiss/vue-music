<template lang="pug">
  .sub-login.auto-content
    Commonpage
      //- .header-slot(slot="header") 1
      .content-slot(slot="content")
        .text-input
          i.icon-mobile
          input(v-if="type==='phone'" type="number" placeholder="手机号" v-model="phone")
          input(v-if="type==='email'" type="text" placeholder="邮箱" v-model="email")
        .text-input
          i.icon-mobile
          input(type="password" placeholder="密码" v-model="password")
        input.login-in(type="button" @click="subLoginIn" value="登录")
</template>
<script>
import Commonpage from '@/components/commonpage'
export default {
  data () {
    return {
      // 登录类型
      type: null,
      // 手机号
      phone: '',
      // 邮箱
      email: '13651971940@163.com',
      // 密码
      password: 'daiwei19940320'
    }
  },
  components: {
    Commonpage
  },
  methods: {
    // 点击 校验
    subLoginIn () {
      if ((this.phone || this.email) && this.password) {
        // 手机登录
        if (this.type === 'phone' && this.phone) {
          if (this.$dutils.exp.isPhoneNum(this.phone)) this.loginPhone()
          else this.$msg('手机格式不正确')
        }
        // 邮箱登录
        if (this.type === 'email' && this.email) {
          if (this.$dutils.exp.isEmail(this.email)) this.loginEmail()
          else this.$msg('邮箱格式不正确')
        }
        return
      }
      this.$msg('请输入完成的内容')
    },

    // 请求接口  手机登录
    async loginPhone () {
      let data = {
        type: 'phone',
        phone: this.phone,
        password: this.password
      }
      let res = await this.$store.dispatch('USER_INFO_SETTER', data)
      console.log(res)
    },

    // 请求接口  邮箱登录
    async loginEmail () {
      let data = {
        type: 'email',
        email: this.email,
        password: this.password
      }
      let res = await this.$store.dispatch('USER_INFO_SETTER', data)
      console.log(res)
    }
  },
  created () {
    this.type = this.$route.params.type
  }
}
</script>
<style lang="scss" scoped>
.content-slot{
  width: p2r(6.8rem);
  margin: p2r(0.2rem) auto;
  .text-input{
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: p2r(0.9rem);
    @include border-1px($border_color);
    i{
      font-size: p2r(0.4rem);
      color: $icon_color;
      flex: 0 0 p2r(0.5rem);
      margin-right: p2r(0.15rem);
      display: block;
    }
    input{
      flex: 1 1 auto;
      position: relative;
      border: none;
      display: block;
      outline: none;
      height: p2r(0.6rem);
      font-size: $f_auto_s;
    }
  }
  .login-in{
    margin-top: p2r(0.4rem);
    background: lg(110deg, $primary_color_s, $primary_color_d);
    border: none;
    outline: none;
    width: 100%;
    height: p2r(0.68rem);
    border-radius: p2r(0.3rem);
    color: #fff;
    font-size: $f_auto_l;
  }
}
</style>
