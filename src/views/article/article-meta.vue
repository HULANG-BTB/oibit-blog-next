<template>
  <div class="article-meta">
    <div class="meta">
      <div class="item">
        <p>发表时间：{{ dateTimeFormat(article.create_time) }}</p>
      </div>
      <div class="item">
        <p>最后修改：{{ dateTimeFormat(article.update_time) }}</p>
      </div>
      <div class="item">
        <p>
          文章地址：<a :href="`https://oibit.cn/Article/${article.id}`" target="_blank">https://oibit.cn/Article/{{ article.id }}</a>
        </p>
      </div>
      <div class="item">
        <p>转载声明：自由转载-转载请注明来源，且不可作为商业用途</p>
      </div>
      <div class="item">
        <p>免责声明：本博客部分内容来自于互联网，并不代表博主本人观点，若涉及侵权，请联系删除！</p>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  setup() {
    const dateTimeFormat = date => {
      return dayjs(date).format('YYYY-MM-DD hh:mm:ss')
    }
    return {
      dateTimeFormat
    }
  }
}
</script>

<style lang="scss" scoped>
.article-meta {
  margin: 1rem 0;
  box-sizing: border-box;
  background-color: #fff;
  width: 100%;

  .meta {
    padding: 1rem;
    font-size: 0.8rem;
    font-size: 0.8rem;
    padding: 0.3rem 1rem;

    .item {
      text-align: left;
      font-size: 0.9em;
      margin: 0.2em 0;
    }
  }
}
</style>
