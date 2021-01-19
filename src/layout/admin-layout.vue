<template>
  <div class="admin-layout">
    <div class="admin-container">
      <!-- <div class="aside">
        <div class="menu">
          <ul>
            <li class="unselected" v-for="item in menu.list" :key="item.title" @click="menu.click(item)">{{ item.title }}</li>
          </ul>
        </div>
      </div> -->
      <div class="content">
        <div class="header">
          <div class="header-nav">
            <ul class="menu">
              <li class="menu-item unselected" v-for="item in menu.list" :key="item.title" @click="menu.click(item)" :class="{ active: item.active }">{{ item.title }}</li>
            </ul>
          </div>
          <div class="header-user" @click="logout">
            {{ user.username }}
          </div>
        </div>
        <div class="main-content">
          <router-view> </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'admin-layout',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const user = computed(() => {
      return store.getters['user/profile']
    })

    const logout = async () => {
      await store.dispatch('user/logout')
      router.push({ name: 'Home' })
    }

    const menu = {
      list: [
        // {
        //   title: '轮播图管理',
        //   path: '/Admin/Carousel'
        // },
        {
          title: '文章管理',
          path: '/Admin/Article',
          active: route.path === '/Admin/Article'
        },
        {
          title: '缩略图管理',
          path: '/Admin/Thumbnail',
          active: route.path === '/Admin/Thumbnail'
        }
      ],
      click: item => {
        menu.list.forEach(el => (el.active = false))
        item.active = true
        router.push(item.path)
      }
    }

    return {
      menu,
      user,
      logout
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-layout {
  width: 100%;

  * {
    box-sizing: border-box;
  }

  .admin-container {
    display: flex;
    flex-direction: row;
    background-image: url('../assets/img/background.png');
    min-height: 100vh;
    max-height: 100vh;
    max-width: 100vw;
    min-width: 100vw;
    overflow: hidden;

    .content {
      width: 0;
      position: relative;
      flex-grow: 1;
      overflow-y: auto;
      overflow-x: hidden;

      .header {
        position: fixed;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 60px;
        z-index: 200;
        padding: 0 2rem;
        background-color: hsla(0, 0%, 100%, 0.7);

        .header-nav {
          width: 0;
          height: 100%;
          flex-grow: 1;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;

          .menu {
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            .menu-item {
              height: 100%;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              padding: 0 2rem;
              border-bottom: transparent 2px solid;
              transition: all 0.3s ease;

              &.active {
                border-bottom: rgb(99, 194, 218) 2px solid;
              }

              &:hover {
                border-bottom: rgb(236, 29, 150) 2px solid;
              }
            }
          }
        }
      }

      .main-content {
        position: relative;
        margin: 70px 1rem 1rem 1rem;
        background-color: rgba($color: #ffffff, $alpha: 0.8);
        min-height: calc(100vh - 70px - 1rem);
      }
    }
  }
}
</style>
