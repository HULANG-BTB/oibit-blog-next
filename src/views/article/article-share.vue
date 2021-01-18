<template>
  <div class="article-share">
    <div class="item">
      <svg-icon icon="icon-weibo" width="1.4rem" height="1.4rem" @click="onWeiBo"></svg-icon>
    </div>
    <div class="item">
      <svg-icon icon="icon-qq" width="1.4rem" height="1.4rem" @click="onQQ"></svg-icon>
    </div>
    <div class="item">
      <svg-icon icon="icon-wechat" width="1.4rem" height="1.4rem"></svg-icon>
    </div>
    <div class="item">
      <svg-icon icon="icon-douban" width="1.4rem" height="1.4rem" @click="onDouBan"></svg-icon>
    </div>
    <div class="item">
      <svg-icon icon="icon-qzone" width="1.4rem" height="1.4rem" @click="onQzone"></svg-icon>
    </div>
    <div class="item">
      <svg-icon icon="icon-facebook" width="1.4rem" height="1.4rem"></svg-icon>
    </div>
    <div class="item">
      <svg-icon icon="icon-twitter" width="1.4rem" height="1.4rem"></svg-icon>
    </div>
    <div class="item">
      <svg-icon icon="icon-google_plus" width="1.4rem" height="1.4rem"></svg-icon>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'article-share',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const id = computed(() => {
      return props.article.id
    })

    const title = computed(() => {
      return props.article.title
    })

    const thumbnail = computed(() => {
      const thumbnail = props.article.thumbnail
      return thumbnail.startsWith('http') ? thumbnail : `https://oibit.cn${thumbnail}`
    })

    const onWeiBo = () => {
      const url = `https://service.weibo.com/share/share.php?url=https://oibit.cn/Article/${id.value}&title=${title.value}&pic=${thumbnail.value}`
      window.open(url)
    }

    const onQQ = () => {
      const url = `https://connect.qq.com/widget/shareqq/index.html?url=https://oibit.cn/Article/${id.value}&title=${title.value}&source=https://oibit.cn/Article/${id.value}&desc=https://oibit.cn/Article/${id.value}&pics=${thumbnail.value}`
      window.open(url)
    }

    const onDouBan = () => {
      const url = `http://shuo.douban.com/!service/share?href=https://oibit.cn/Article/${id.value}&name=${title.value}&text=${props.article.abstract}&image=${thumbnail.value}&starid=0&aid=0&style=11`
      window.open(url)
    }

    const onQzone = () => {
      const url = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=https://oibit.cn/Article/${id.value}&title=${title.value}&desc=${title.value}&summary=${title.value}&site=https://oibit.cn/Article/${id.value}`
      window.open(url)
    }

    return {
      onWeiBo,
      onQQ,
      onDouBan,
      onQzone
    }
  }
}
</script>

<style lang="scss" scoped>
.article-share {
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;
  font-size: 0.8rem;
  font-size: 0.8rem;
  margin: 1rem 0;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: row;

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 1.8rem;
    margin-right: 0.6rem;
    transition: all 0.3s ease-in;

    &:hover {
      background-color: rgba($color: #000000, $alpha: 0.2);
    }
  }
}
</style>
