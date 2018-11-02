import store from 'stroe'
export default {
  /**
   * 登陆状态校验
   * api文档好像没有token这种校验的方式
   * cookie校验 不想用  就直接请求了
   * 校验登陆是否过期了, 如果过期就跳转到登陆页，否则进入首页
   * @return Promise
   */
  async checkLogin () {
    await store.dispatch('')
  }
}