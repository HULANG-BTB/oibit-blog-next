<template>
  <div class="admin-layout">
    <div class="admin-container">
      <div class="aside" v-if="false">
        <div class="menu">
          <ul>
            <li class="unselected" v-for="item in menu.list" :key="item.title" @click="menu.click(item)">{{ item.title }}</li>
          </ul>
        </div>
      </div>
      <div class="content">
        <div class="header">
          <div class="header-nav"></div>
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
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'admin-layout',
  setup() {
    const router = useRouter()
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
          path: '/Admin/Article'
        }
      ],
      click: item => {
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

    .aside {
      width: 300px;
      min-height: 100vh;
      height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: rgba($color: #000000, $alpha: 0.6);

      .menu {
        margin-top: 4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #eee;

        ul {
          width: 100%;
          li {
            min-height: 2.5rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;
            padding-left: 2rem;
            transition: all 0.3s ease-in;
            font-size: 1.2rem;

            &:hover {
              background-color: rgba($color: #000000, $alpha: 0.4);
            }
          }
        }
      }
    }

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
        z-index: 1000;
        padding: 0 2rem;
        background-color: hsla(0, 0%, 100%, 0.7);
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
