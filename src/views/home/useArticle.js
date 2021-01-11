import request from '@/utils/request'
import { ref } from 'vue'

const pagging = {
  page: 1,
  limit: 10,
  loading: ref(false),
  data: ref([]),
  queryByPage: async function(page = 1, limit = 10) {
    this.page = page
    this.limit = limit
    const data = await request({
      method: 'get',
      url: '/api/article/list',
      params: {
        page,
        limit
      }
    })
    this.data.value = data.rows
  },
  loadMore: async function() {
    try {
      this.loading.value = true
      const data = await request({
        method: 'get',
        url: '/api/article/list',
        params: {
          page: ++this.page,
          limit: this.limit
        }
      })
      this.data.value.push(...data.rows)
    } finally {
      this.loading.value = false
    }
  }
}

export default pagging
