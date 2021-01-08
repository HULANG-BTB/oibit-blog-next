import { ref } from 'vue'
import request from '@/utils/request'

export const article = ref({})

export const queryArticleInfo = async id => {
  const data = await request({
    method: 'get',
    url: '/api/article/detail',
    params: {
      id
    }
  })
  article.value = data.data || {}
}

export default {
  article,
  queryArticleInfo
}
