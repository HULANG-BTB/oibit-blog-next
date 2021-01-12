/**
 * 节流
 * @param {Function} func
 * @param {Number} delay
 */
export const throttle = function(func, delay = 500) {
  let timer = null
  return function() {
    const context = this
    const args = arguments
    if (!timer) {
      func.apply(context, args)
      timer = setTimeout(function() {
        timer = null
      }, delay)
    }
  }
}

/**
 * 防抖
 * @param { Function } func
 * @param { Number } delay
 */
export const debounce = function(func, delay = 500) {
  let timeout = null
  return function() {
    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(func, delay)
  }
}
