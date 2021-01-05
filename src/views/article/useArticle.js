import { ref } from 'vue'
import request from '@/utils/request'

export const article = ref({})

export const queryArticleInfo = async id => {
  const data = await request({
    method: 'post',
    url: '/data/api/Article/getArticleInfo',
    data: {
      id
    }
  })
  article.value = data || {}
}

export default {
  article,
  queryArticleInfo
}
