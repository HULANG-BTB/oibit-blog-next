import { useTable } from './useTable'

import { reactive } from 'vue'

export const usePage = () => {
  const { table } = useTable()

  let callback = null

  const page = reactive({
    page: 1,
    size: 10,
    sizes: [10, 20, 30],
    total: 0,
    currentChange: function(_page) {
      getData({ _page })
    },
    sizeChange: function(_size) {
      getData({ _size })
    }
  })

  const fetchData = async cb => {
    callback = cb
  }

  async function getData({ _page, _size }) {
    page.page = _page || page.page
    page.page = _size || page.page
    if (callback) {
      table.loading = true
      const pagging = page
      try {
        const { page, size, rows, total } = await callback()
        table.data = rows
        pagging.page = page
        pagging.size = size
        pagging.total = total
      } finally {
        table.loading = false
      }
    }
  }

  const onQuery = async () => {
    return await getData({ _page: 1 })
  }

  const refresh = async () => {
    return await getData({})
  }

  return {
    table,
    page,
    onQuery,
    fetchData,
    refresh
  }
}

export default { usePage }
