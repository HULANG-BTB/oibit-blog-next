<template>
  <div class="content-container">
    <div class="main-content">
      <div class="article">
        <div class="title">{{ article.title }}</div>
        <div class="markdown" v-html="content"></div>
      </div>
      <article-share :article="article"></article-share>
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
import { nextTick, ref, watch } from 'vue'
import marked from 'marked'
import ArticleMenu from './article-menu'
import ArticleMeta from './article-meta'
import ArticleShare from './article-share'
import { article, queryArticleInfo } from './useArticle'

import escape from 'escape-html'
import codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/shell/shell'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/python/python'
import 'codemirror/mode/yaml/yaml'

export default {
  components: { ArticleMenu, ArticleMeta, ArticleShare },
  name: 'ArticleDetail',
  setup() {
    const route = useRoute()
    queryArticleInfo(route.params.id)

    const menuData = ref([])

    const content = ref('')

    watch(
      () => {
        return article.value
      },
      () => {
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
          return `<div class="code-box"><pre><code lang=${lang}>${escape(code)}</code></pre></div>`
        }
        renderer.link = (href, title, text) => {
          return `<a href="${href}" target="_blank">${text}</a>`
        }

        content.value = marked(article.value.content || '', { renderer })

        nextTick(() => {
          Array.from(document.querySelectorAll('.code-box')).forEach(container => {
            const preEl = container.querySelector('pre')
            const codeEl = preEl?.querySelector('code')
            const lang = codeEl.getAttribute('lang') || 'text'
            const mime = lang === 'vue' ? 'text/x-vue' : `text/${lang}`
            const code = codeEl?.innerText
            if (preEl && codeEl && code) {
              const cm = new codemirror(container, {
                value: code,
                mode: `${mime}`,
                theme: 'dracula',
                readOnly: true,
                height: 'auto',
                lineNumbers: true
              })
              cm.setSize('100%', '100%')
              preEl.remove()
            }
          })
        })
      }
    )

    return {
      article,
      content,
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

      .code-box {
        position: relative;
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
