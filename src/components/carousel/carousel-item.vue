<template>
  <transition :name="`carousel-item-${data.direction}`">
    <div class="carousel-item" v-show="data.show">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import { inject, onMounted, reactive, toRefs } from 'vue'
export default {
  name: 'CarouselItem',
  setup() {
    const carousel = inject('carousel')
    const data = reactive({
      show: false,
      direction: 'left'
    })

    onMounted(() => {
      carousel.updateCarouseItems({
        ...toRefs(data)
      })
    })

    return {
      data
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel-item {
  width: 100%;
  position: absolute;

  :deep() * {
    max-width: 100%;
  }
}

.carousel-item-left-enter-active {
  transition: all 0.7s ease;
}
.carousel-item-left-leave-active {
  transition: all 0.7s ease;
}

.carousel-item-left-enter-from {
  transform: translateX(100%);
}
.carousel-item-left-leave-to {
  transform: translateX(-100%);
}

.carousel-item-right-enter-active {
  transition: all 0.7s ease;
}
.carousel-item-right-leave-active {
  transition: all 0.7s ease;
}

.carousel-item-right-enter-from {
  transform: translateX(-100%);
}
.carousel-item-right-leave-to {
  transform: translateX(100%);
}
</style>
