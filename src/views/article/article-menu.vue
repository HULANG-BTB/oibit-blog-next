<template>
  <div class="article-menu-list" :style="{ marginTop: scrollTop + 'px' }">
    <div class="title">目录</div>
    <ul class="nav">
      <li v-for="item in menu" :key="item.text">
        <a :href="`#${item.text}`" :style="{ marginLeft: (item.level - 1) * 7 + 'px' }">{{ item.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
export default {
  name: 'ArticleMenuList',
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const scrollTop = ref(0)
    onMounted(() => {
      window.addEventListener('scroll', () => {
        const getScrollTop = () => {
          var scroll_top = 0
          if (document.documentElement && document.documentElement.scrollTop) {
            scroll_top = document.documentElement.scrollTop
          } else if (document.body) {
            scroll_top = document.body.scrollTop
          }
          return scroll_top
        }
        scrollTop.value = getScrollTop()
      })
    })

    return {
      scrollTop
    }
  }
}
</script>

<style lang="scss" scoped>
.article-menu-list {
  background-color: #fff;
  padding: 1rem;
  box-sizing: border-box;

  .title {
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  .nav {
    width: 100%;
    box-sizing: border-box;
    max-height: calc(80vh - 4rem);
    overflow-y: scroll;
    font-size: 0.8rem;

    &::-webkit-scrollbar {
      width: 0;
    }
  }

  ul {
    li:not(:last-child) {
      margin-bottom: 0.3rem;
    }
    li {
      padding: 0.2rem 0;
      transition: all 0.3s ease-in;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;

      &:hover {
        background: rgba(150, 150, 150, 0.1);
      }

      a {
        text-decoration: none;
        white-space: nowrap;
        color: #000;

        &:active,
        &:active,
        &:visited {
          color: #000;
        }
      }
    }
  }
}
</style>
