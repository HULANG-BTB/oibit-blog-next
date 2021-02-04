import request from '@/utils/request'
import { ref } from 'vue'

const tags = ref([])
const getTags = async () => {
  const data = await request({
    method: 'get',
    url: '/api/tag/list'
  })
  tags.value = data || []
}

export default {
  tags,
  getTags
}
