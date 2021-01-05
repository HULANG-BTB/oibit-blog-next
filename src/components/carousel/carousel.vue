<template>
  <div class="carousel" @mouseenter.stop="handleMouseEnter" @mouseleave.stop="handleMouseLeave">
    <div class="carousel-list">
      <slot></slot>
    </div>
    <div class="prev" @click="prev">
      <i class="icon icon-lt"></i>
    </div>
    <div class="next" @click="next">
      <i class="icon icon-gt"></i>
    </div>
    <div class="indicator">
      <ul class="indicator-list">
        <li v-for="(item, index) in carouselItems" class="indicator-item" :key="index" @click="indicator(index)">
          <div :class="{ active: index === currentIndex }"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { throttle } from '@/utils'
import { onMounted, ref, provide } from 'vue'
export default {
  name: 'Carousel',
  props: {
    duration: {
      type: Number,
      default: () => 2000
    },
    autoPlay: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props) {
    const currentIndex = ref(0)
    let timer = null

    // 走马灯 项目
    const carouselItems = ref([])

    const updateCarouseItems = item => {
      carouselItems.value.push(item)
    }

    // 鼠标进入 清除定时器
    const handleMouseEnter = throttle(() => {
      if (props.autoPlay) {
        if (timer) {
          timer = clearInterval(timer)
        }
      }
    })

    // 鼠标移出 启动定时器
    const handleMouseLeave = throttle(() => {
      if (props.autoPlay) {
        if (!timer) {
          timer = setInterval(() => {
            next()
          }, props.duration)
        }
      }
    })

    const autoPlay = () => {
      carouselItems.value[currentIndex.value].show = true
      if (props.autoPlay) {
        if (!timer) {
          timer = setInterval(() => {
            next()
          }, props.duration)
        }
      }
    }

    onMounted(() => {
      autoPlay()
    })

    // 上一页 点击
    const prev = throttle(() => {
      carouselItems.value[currentIndex.value].direction = 'right'
      carouselItems.value[currentIndex.value].show = false
      currentIndex.value--
      currentIndex.value = currentIndex.value < 0 ? carouselItems.value.length - 1 : currentIndex.value
      carouselItems.value[currentIndex.value].direction = 'right'
      carouselItems.value[currentIndex.value].show = true
    })

    // 下一页 点击
    const next = throttle(() => {
      carouselItems.value[currentIndex.value].direction = 'left'
      carouselItems.value[currentIndex.value].show = false
      currentIndex.value++
      currentIndex.value = currentIndex.value >= carouselItems.value.length ? 0 : currentIndex.value
      carouselItems.value[currentIndex.value].direction = 'left'
      carouselItems.value[currentIndex.value].show = true
    })

    // 指示器 点击
    const indicator = index => {
      if (index !== currentIndex.value) {
        const direction = index > currentIndex.value ? 'left' : 'right'
        carouselItems.value[currentIndex.value].direction = direction
        carouselItems.value[index].direction = direction
        carouselItems.value[currentIndex.value].show = false
        carouselItems.value[index].show = true
        currentIndex.value = index
      }
    }

    provide('carousel', {
      updateCarouseItems
    })

    return {
      currentIndex,
      prev,
      next,
      indicator,
      handleMouseEnter,
      handleMouseLeave,
      carouselItems
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel {
  width: 100%;
  overflow: hidden;
  min-height: 200px;
  position: relative;

  &:hover {
    .prev,
    .next {
      background-color: rgba(150, 150, 150, 0.2);
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .carousel-list {
    width: 100%;
    position: relative;
  }

  .prev,
  .next {
    position: absolute;
    top: 50%;
    width: 30px;
    height: 30px;
    transform: translateY(-50%);
    transition: all 0.3s ease-in;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .prev {
    left: 1rem;
  }

  .next {
    right: 1rem;
  }

  .indicator {
    position: absolute;
    bottom: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;

    .indicator-list {
      display: flex;

      .indicator-item {
        width: 14px;
        height: 8px;
        cursor: pointer;

        div {
          margin-top: 3px;
          background-color: rgba(150, 150, 150, 0.3);
          width: 100%;
          height: 2px;

          &.active {
            background-color: rgba(150, 150, 150, 0.8);
          }
        }
      }

      .indicator-item:not(:last-child) {
        margin-right: 3px;
      }
    }
  }
}
</style>
