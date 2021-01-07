const lazyLoad = {
  listener() {
    const getScrollTop = () => {
      var scroll_top = 0
      if (document.documentElement && document.documentElement.scrollTop) {
        scroll_top = document.documentElement.scrollTop
      } else if (document.body) {
        scroll_top = document.body.scrollTop
      }
      return scroll_top
    }
    if (!this.loaded) {
      const elOffsetTop = this.el.y
      const visiableHeight = getScrollTop() + window.outerHeight
      if (elOffsetTop <= visiableHeight) {
        console.log(this)
        const attribute = this.binding.arg
        const value = this.binding.value
        this.el.setAttribute(attribute, value)
        this.loaded = true
        window.removeEventListener('scroll', lazyLoad.listener)
      }
    }
  },
  mounted(el, binding) {
    window.addEventListener('scroll', lazyLoad.listener.bind({ el, binding }))
    lazyLoad.listener.bind({ el, binding })()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', lazyLoad.listener)
  }
}

export default {
  install: app => {
    app.directive('lazy', lazyLoad)
  }
}
