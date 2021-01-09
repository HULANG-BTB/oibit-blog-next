const lazyLoad = {
  listener() {
    if (!this.loaded) {
      const elOffsetTop = this.el.y
      const elOffsetLeft = this.el.x
      const visiableHeight = window.innerHeight
      const visiableWidth = window.innerWidth
      if (elOffsetTop <= visiableHeight && elOffsetLeft <= visiableWidth) {
        const attribute = this.binding.arg
        const value = this.binding.value
        if (Array.isArray(attribute)) {
          attribute.forEach(attr => {
            this.el.setAttribute(attr, value)
          })
        } else {
          this.el.setAttribute(attribute, value)
        }
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
