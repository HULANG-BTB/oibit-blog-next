import { ref } from 'vue'
import request from '@/utils/request'

export const articles = ref([])

export const queryArchiveInfo = async () => {
  try {
    const data = await request({
      method: 'get',
      url: '/api/article/archive'
    })
    articles.value = data || []
  } catch {
    articles.value = []
  }
}

export default {
  articles,
  queryArchiveInfo
}
