import { reactive } from 'vue'

const usePagging = fn => {
  const pagging = reactive({
    page: 1,
    limit: 10,
    total: 10,
    sizeChange: async size => {
      pagging.limit = size
      pagging.page = 1
      const data = await fn(pagging.page, pagging.limit)
      pagging.page = data.page
      pagging.limit = data.limit
      pagging.total = data.total
    },
    pageChange: async page => {
      pagging.page = page
      const data = await fn(pagging.page, pagging.limit)
      pagging.page = data.page
      pagging.limit = data.limit
      pagging.total = data.total
    },
    reload: async () => {
      const data = await fn(pagging.page, pagging.limit)
      pagging.page = data.page
      pagging.limit = data.limit
      pagging.total = data.total
    }
  })
  return pagging
}

export default usePagging
