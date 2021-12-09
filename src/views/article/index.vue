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
    <el-dialog v-model="imgDialog.show" width="50%" :show-close="false" center>
      <img :src="imgDialog.url" style="width: 100%" />
      <template #footer></template>
    </el-dialog>
  </div>
</template>

<script>
import { ElDialog } from 'element-plus'
import { useRoute } from 'vue-router'
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import { marked } from 'marked'
import ArticleMenu from './article-menu'
import ArticleMeta from './article-meta'
import ArticleShare from './article-share'
import { article, queryArticleInfo } from './useArticle'
import Prismjs from 'prismjs'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import { Renderer } from './renderer'
import md5 from 'js-md5'

export default {
  components: { ArticleMenu, ArticleMeta, ArticleShare, ElDialog },
  name: 'ArticleDetail',
  setup() {
    const route = useRoute()
    queryArticleInfo(route.params.id)

    const menuData = ref([])

    const content = ref('')

    const imgDialog = reactive({
      show: false,
      url: ''
    })

    watch(
      () => {
        return article.value
      },
      () => {
        menuData.value.splice(0, menuData.value.length)
        const renderer = new Renderer()
        renderer.heading = (text, level) => {
          const id = `heading-${md5(text)}`
          menuData.value.push({
            text,
            level,
            id
          })
          return `<h${level} id="${id}">${text}</h${level}>`
        }

        marked(
          article.value.content || '',
          {
            renderer,
            highlight: (code, lang, callback) => {
              const out = Prismjs.highlight(code, Prismjs.languages[lang] || Prismjs.languages.txt, lang)
              callback(null, out)
            }
          },
          (err, val) => {
            content.value = val
          }
        )
      }
    )

    const handlePreviewImage = event => {
      if (event.target.tagName === 'IMG') {
        const src = event.target.src
        imgDialog.url = src
        imgDialog.show = true
      }
    }

    onMounted(() => {
      document.querySelector('.article>.markdown')?.addEventListener('click', handlePreviewImage)
    })

    onBeforeMount(() => {
      document.querySelector('.article>.markdown')?.removeEventListener('click', handlePreviewImage)
    })

    return {
      article,
      content,
      menuData,
      imgDialog
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
        word-break: keep-all;
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
