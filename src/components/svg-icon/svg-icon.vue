<template>
  <svg :class="['icon', icon]" :style="{ width, height }">
    <use :xlink:href="`#${icon}`"></use>
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    icon: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: '1rem'
    },
    height: {
      type: String,
      default: '1rem'
    }
  }
}
</script>
