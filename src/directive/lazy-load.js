// import { Directive } from 'vue'

// export declare interface ObjectDirective<T = any, V = any> {
//   created?: DirectiveHook<T, null, V>;
//   beforeMount?: DirectiveHook<T, null, V>;
//   mounted?: DirectiveHook<T, null, V>;
//   beforeUpdate?: DirectiveHook<T, VNode<any, T>, V>;
//   updated?: DirectiveHook<T, VNode<any, T>, V>;
//   beforeUnmount?: DirectiveHook<T, null, V>;
//   unmounted?: DirectiveHook<T, null, V>;
//   getSSRProps?: SSRDirectiveHook;
// }

const lazyLoad = {
  beforeMount(el, binding) {
    console.log(el, binding)
  },
  beforeUnmount(el, binding) {
    console.log(el, binding)
  }
}

export default {
  install: app => {
    app.directive('lazy', lazyLoad)
  }
}
