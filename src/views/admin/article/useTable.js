import { reactive } from 'vue'

export const useTable = () => {
  const table = reactive({
    data: [],
    loading: false,
    height: 0
  })

  return { table }
}

export default { useTable }
