import axios from 'axios'
import NProgress from 'nprogress'
import { ElMessage } from 'element-plus'
import { throttle, debounce } from '@/utils'

NProgress.configure({ showSpinner: false })

// create an axios instance
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
instance.interceptors.request.use(
  config => {
    // do something before request is sent

    throttle(() => {
      NProgress.start()
    })()

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    debounce(() => {
      NProgress.done()
    })()
    return Promise.reject(error)
  }
)

// response interceptor
instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    debounce(() => {
      NProgress.done()
    })()
    if (res.code !== 200) {
      ElMessage.error(res.error)
      throw new Error(res.error)
    }
    return res.data
  },
  error => {
    console.log('err' + error) // for debug
    debounce(() => {
      NProgress.done()
    })()
    return Promise.reject(error)
  }
)

export default instance
