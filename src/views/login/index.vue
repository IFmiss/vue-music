// 登陆相关
<template lang="pug">
  .vm-login
    .login-content
      router-link.btn-login(to="/login/phone") 手机号登陆
      router-link.btn-login(to="/login/email") 邮箱登陆
    router-view
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.vm-login{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-content{
    width: 80%;
    height: auto;
    .btn-login{
      display: block;
      line-height: p2r(0.7rem);
      border: 1px solid $primary_color;
      color: $primary_color;
      font-size: $f_auto_l;
      border-radius: p2r(0.35rem);
      margin: p2r(0.3rem) 0;
    }
  }
  .login-ruoter{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
}
</style>
