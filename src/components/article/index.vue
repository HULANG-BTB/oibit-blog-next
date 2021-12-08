<template>
  <div class="article-item">
    <div class="thubmnail" @click="onReadArticle">
      <img v-lazy:src="article.thumbnail" v-lazy:alt="article.thumbnail" />
    </div>
    <div class="article-info">
      <div class="title" @click="onReadArticle">{{ article.title }}</div>
      <div class="description">
        <p>
          {{ article.abstract }}
        </p>
      </div>
      <div class="meta">
        <div class="time">
          <i class="icon icon-time"></i>
          {{ formatDate(article.create_time) }}
        </div>
        <div class="views">
          <i class="icon icon-eye"></i>
          {{ article.view }}
        </div>
        <div class="comments">
          <i class="icon icon-contact"></i>
          {{ article.comment }}
        </div>
        <div class="likes">
          <i class="icon icon-like"></i>
          {{ article.like }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'Article',
  emits: ['on-read'],
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {
    const onReadArticle = () => {
      context.emit('on-read')
    }

    const formatDate = date => {
      return dayjs(date).fromNow()
    }

    return {
      onReadArticle,
      formatDate
    }
  }
}
</script>

<style lang="scss" scoped>
.article-item {
  padding: 0.5rem;
  position: relative;
  width: 100%;
  height: 10rem;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  box-sizing: border-box;
  transition: all 0.3s ease-in;
  z-index: 10;

  &:hover {
    background: rgba(150, 150, 150, 0.1);

    &::before {
      width: 100%;
      height: 100%;
      // background-color: green;
      border-top: 0.1rem rgba(150, 150, 150, 0.1) solid;
      border-left: 0.1rem rgba(150, 150, 150, 0.1) solid;
    }

    &::after {
      width: 100%;
      height: 100%;
      // background-color: green;
      border-right: 0.1rem rgba(150, 150, 150, 0.1) solid;
      border-bottom: 0.1rem rgba(150, 150, 150, 0.1) solid;
    }

    .thubmnail {
      img {
        transform: scale(1.1);
      }
      background-color: rgba(150, 150, 150, 0.3);
      cursor: pointer;
    }

    .article-info {
      .title {
        transform: translateX(0.5rem);
        cursor: pointer;
      }
    }
  }

  &::before {
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
    content: ' ';
    z-index: 1;
    transition: all 0.7s ease-in-out;
  }

  &::after {
    width: 0;
    height: 0;
    position: absolute;
    right: 0;
    bottom: 0;
    content: ' ';
    z-index: 1;
    transition: all 0.7s ease-in-out;
  }

  .thubmnail {
    z-index: 11; // 不设置会导致 click事件失效 原因位未知
    width: 200px;
    min-width: 200px;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: all 0.7s ease-in-out;

    img {
      width: auto;
      height: aoto;
      max-width: 100%;
      max-height: 100%;
      transition: all 0.3s ease-in;
    }
  }

  .article-info {
    z-index: 11; // 不设置会导致 click事件失效 原因位未知
    flex-grow: 1;
    margin-left: 1rem;
    display: flex;
    flex-direction: column;

    .title {
      color: #2c3e50;
      height: 1rem;
      font-weight: bold;
      transition: all 0.3s ease-in;
    }

    .description {
      margin: 0.5rem 0;
      flex-grow: 1;
      display: flex;

      p {
        flex-grow: 1;
        margin: 0.2rem 1rem;
        font-size: 0.7rem;
        text-indent: 2em;
        text-align: left;
        text-overflow: ellipsis;
        white-space: normal;
        word-wrap: break-word;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
      }
    }

    .meta {
      height: 1.5rem;
      font-size: 0.6rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      div {
        flex-grow: 1;
        width: 0;

        .icon {
          font-size: 0.6rem;
        }
      }
    }
  }
}
</style>
