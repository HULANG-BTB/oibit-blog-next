import { ref } from 'vue'
import request from '@/utils/request'

export const articles = ref([])

export const queryArchiveInfo = async () => {
  try {
    const data = await request({
      method: 'post',
      url: '/data/api/Article/getArticleListByTime'
    })
    articles.value = data?.data?.data || []
  } catch {
    articles.value = []
  }
}

export default {
  articles,
  queryArchiveInfo
}
