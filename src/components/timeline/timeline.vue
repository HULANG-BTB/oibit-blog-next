<template>
  <div class="timeline">
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>

<script>
import { provide, ref } from 'vue'
export default {
  name: 'timeline',
  setup() {
    const items = ref([])

    const updateItems = item => {
      item.id = `timeline-item-${items.value.length}`
      item.checked = items.value.length === 0
      items.value.push(item)
    }

    provide('timeline', { updateItems })
  }
}
</script>

<style lang="scss" scoped>
.timeline {
  ul {
    list-style: none;
    margin: 50px 0 30px 120px;
    padding-left: 30px;
    border-left: 4px solid #48b379;

    li {
      margin: 40px 0;
      position: relative;
    }
  }
}
</style>
