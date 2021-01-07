<template>
  <div class="content-container">
    <div class="main-content">
      <div class="article">
        <div class="title">{{ article.title }}</div>
        <div class="markdown">
          <div ref="contentElementRef" v-html="content" class="markdown-body"></div>
        </div>
      </div>
      <article-meta :article="article"></article-meta>
    </div>
    <div class="aside-content">
      <div class="article-menu">
        <article-menu :menu="menuData"></article-menu>
      </div>
    </div>
  </div>
</template>

<script>
// import data from './data'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import marked from 'marked'
import ArticleMenu from './article-menu'
import ArticleMeta from './article-meta'
import { article, queryArticleInfo } from './useArticle'

import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import javascript from 'highlight.js/lib/languages/htmlbars'
hljs.registerLanguage('vue', javascript)

export default {
  components: { ArticleMenu, ArticleMeta },
  name: 'ArticleDetail',
  setup() {
    const route = useRoute()
    queryArticleInfo(route.params.id)

    const contentElementRef = ref(null)

    const menuData = ref([])

    const content = computed(() => {
      menuData.value.splice(0, menuData.value.length)
      const renderer = new marked.Renderer()
      renderer.heading = (text, level) => {
        menuData.value.push({
          text,
          level
        })
        return `<h${level} id="${text}">${text}</h${level}>`
      }
      renderer.code = (code, lang) => {
        code = lang ? hljs.highlight(lang, code).value : code
        return `<pre><code lang="${lang}">${code}</code></pre>`
      }
      renderer.link = (href, title, text) => {
        return `<a href="${href}" target="_blank">${text}</a>`
      }
      return marked(article.value.content || '', { renderer })
    })

    return {
      article,
      content,
      contentElementRef,
      menuData
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
    margin-right: 0.5rem;
    width: 0;

    .article {
      .title {
        text-align: center;
        font-size: 1.5rem;
        margin: 0.5rem auto;
      }
    }

    .article {
      box-sizing: border-box;
      background-color: #fff;
      width: 100%;
      padding: 1rem;
      font-size: 0.8rem;
    }
  }

  .aside-content {
    width: 220px;
    min-width: 220px;
  }
}
</style>
