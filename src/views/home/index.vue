<template>
  <div class="content-container unselected">
    <div class="main-content">
      <div class="banner">
        <carousel :duration="3000" :auto-play="true">
          <carousel-item>
            <img src="../../assets/img/banner-1.jpg" alt="" />
          </carousel-item>
          <carousel-item>
            <img src="../../assets/img/banner-2.jpg" alt="" />
          </carousel-item>
          <carousel-item>
            <img src="../../assets/img/banner-3.jpg" alt="" />
          </carousel-item>
          <carousel-item>
            <img src="../../assets/img/banner-4.jpg" alt="" />
          </carousel-item>
        </carousel>
      </div>
      <div class="article">
        <ul class="list">
          <li class="item" v-for="article in articles.data.value" :key="article.id">
            <Article :article="article" @on-read="onArticleRead(article)"></Article>
          </li>
        </ul>
      </div>
      <div class="loadmore">
        <div class="text" v-if="!articles.loading.value" @click="articles.loadMore">Load More</div>
        <div class="icon" v-else>Loading...</div>
      </div>
    </div>
    <div class="aside-content"></div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import useArticle from './useArticle'

import Article from '@/components/article'
import { Carousel, CarouselItem } from '@/components/carousel/index.js'

export default {
  name: 'Home',
  components: {
    Article,
    Carousel,
    CarouselItem
  },
  setup() {
    const router = useRouter()
    const articles = useArticle

    const onArticleRead = article => {
      router.push({
        name: 'Article',
        params: {
          id: article.id
        }
      })
    }

    articles.queryByPage()

    return {
      onArticleRead,
      articles
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  display: flex;
  flex-direction: row;
  width: 100%;

  .main-content {
    flex-grow: 1;
    width: 0;
    margin-right: 0.5rem;

    .banner {
      margin-bottom: 1rem;
    }

    .article {
      margin-bottom: 1rem;
      .list {
        list-style: none;
        margin: 0;
        padding: 0;

        .item:not(:last-child) {
          margin-bottom: 1rem;
        }
      }
    }

    .loadmore {
      background-color: #ffffff;
      height: 2rem;
      margin-bottom: 1rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }

  .aside-content {
    width: 220px;
    min-width: 220px;
  }
}
</style>
