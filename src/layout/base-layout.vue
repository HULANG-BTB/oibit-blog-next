<template>
  <div class="home-layout">
    <div class="header">
      <div class="container flex">
        <div class="logo">AloneH</div>
        <div class="title">行也思君，坐也思君</div>
      </div>
    </div>
    <div class="content">
      <div class="container flex">
        <div class="nav" ref="navRef">
          <menu-list></menu-list>
        </div>
        <div class="main">
          <router-view v-slot="{ Component }">
            <transition name="zoom">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="copy">2018-2021 &copy; AloneH</div>
      <div class="beian">网站备案号：<a data-v-07181032="" href="http://www.beian.miit.gov.cn" target="_blank">黔ICP备20000657号-1</a></div>
    </div>
  </div>
</template>

<script>
import MenuList from '@/components/menu'

export default {
  name: 'BaseLayout',
  components: {
    MenuList
  }
}
</script>

<style lang="scss" scoped>
.home-layout {
  min-height: 100vh;
  background-image: url('../assets/img/background.png');

  .header {
    z-index: 20000;
    position: fixed;
    height: 60px;
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: hsla(0, 0%, 100%, 0.6);

    .logo {
      font-family: 'MAGNETOB';
      color: #0085f5;
      font-size: 1.4rem;
      line-height: 60px;
    }

    .title {
      margin-left: 4rem;
      font-family: 'FZSTK';
      font-size: 1.4rem;
      color: #0085f5;
      line-height: 60px;
    }
  }

  .container {
    width: 992px;
    height: 100%;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    .container {
      margin-top: 80px;
      margin-bottom: 90px;
    }

    .nav {
      width: 120px;
      min-width: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .main {
      flex-grow: 1;
      margin-left: 0.5rem;

      .zoom-enter-active {
        transition: all 0.3s ease-in-out 0.3s;
      }

      .zoom-leave-active {
        transition: all 0.3s ease-in-out;
      }

      .zoom-leave-from,
      .zoom-enter-to {
        transform: translateY(0);
        opacity: 1;
      }

      .zoom-enter-from {
        transform: translateY(15rem);
        opacity: 0;
      }
      .zoom-leave-to {
        transform: translateY(-15rem);
        opacity: 0;
      }
    }
  }

  .footer {
    z-index: 99999;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: hsla(0, 0%, 100%, 0.6);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    font-size: 0.8rem;
    transition: all 0.3s ease-in;
    color: #515a6e;

    .copy,
    .beian {
      width: 100%;
      text-align: center;
      padding: 0.2rem;
    }

    a {
      color: #2b85e4;

      &:active,
      &:hover,
      &:visited {
        color: #57a3f3;
      }
    }
  }
}
</style>
