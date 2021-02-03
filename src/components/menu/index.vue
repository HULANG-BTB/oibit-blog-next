<template>
  <div class="menu" :style="{ marginTop: position + 'px' }">
    <ul>
      <li v-for="(item, index) in menu.menus" :key="index" class="unselected" :class="{ active: item.route === route.name }" @click="menu.click(item)">
        <svg-icon :icon="item.icon"></svg-icon>
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { debounce } from '@/utils'

export default {
  name: 'Menu',
  setup() {
    const router = useRouter()
    const route = useRoute()

    const menu = reactive({
      menus: [
        {
          title: 'Article',
          icon: 'icon-home',
          route: 'Home'
        },
        {
          title: 'Frontend',
          icon: 'icon-table',
          route: 'Category'
        },
        {
          title: 'Tags',
          icon: 'icon-tag',
          route: 'Tag'
        },
        {
          title: 'Archive',
          icon: 'icon-document',
          route: 'Archive'
        },
        {
          title: 'About',
          icon: 'icon-user',
          route: 'About'
        }
      ],
      click: function(item) {
        // item.active = true
        debounce(() => {
          router.push({
            name: item.route
          })
        })()
      }
    })

    const position = ref(0)

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
        position.value = getScrollTop()
      })
    })

    return {
      menu,
      route,
      position
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    li {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      padding-left: 1rem;
      text-align: left;
      height: 2.5rem;
      line-height: 2.5rem;
      border-radius: 4px;
      transition: all 0.3s ease-in;
      margin-bottom: 1rem;
      font-size: 0.7rem;
      color: #515a6e;
      font-weight: bold;

      .icon {
        margin-right: 0.8rem;
        font-size: 0.7rem;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
      &.active {
        color: #0085f5;
        background-color: hsla(0, 0%, 100%, 0.6);
      }
    }
  }
}
</style>
