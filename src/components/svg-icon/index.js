import SvgIcon from './svg-icon.vue'

export default {
  install: app => {
    app.component(SvgIcon.name, SvgIcon)
  }
}
