import Vue from 'vue'

/**
 * @description 用于动态设置返回的图片地址大小  只用于img标签
 * v-imgsize
 * 字符串
 * v-imgsize = "http://www......"
 * 对象写法
 * v-imgsize = "{url: 'http://......', w: 120}"
 */
Vue.directive('imgsize', {
  bind (el, binding, vnode) {
    if (typeof binding.value === 'object' &&
        binding.value.w) {
      el.src = `${binding.value.url}?param=${binding.value.w}y${binding.value.w}`
      return
    }
    el.src = binding.value + '?param=300y300'
  }
})
