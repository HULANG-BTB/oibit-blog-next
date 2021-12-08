<template>
  <div class="content-container unselected">
    <div class="main-content">
      <div class="archive">
        <timeline>
          <timeline-item v-for="item in article.articles.value" :key="item.id">
            <template #title> {{ item.title }}<span class="readmore" @click="onArticleRead(item)">Read More</span> </template>
            <template #date>{{ formatDate(item.create_time) }}</template>
            {{ item.abstract }}
          </timeline-item>
        </timeline>
      </div>
    </div>
    <!-- <div class="aside-content"></div> -->
  </div>
</template>

<script>
import { timeline, timelineItem } from '@/components/timeline'
import useArticle from './useArchive'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'

export default {
  name: 'Archive',
  components: { timeline, timelineItem },
  setup() {
    const router = useRouter()
    useArticle.queryArchiveInfo()

    const formatDate = date => {
      return dayjs(date).format('YYYY-MM-DD')
    }

    const onArticleRead = article => {
      router.push({
        name: 'Article',
        params: {
          id: article.id
        }
      })
    }

    const article = useArticle

    return {
      onArticleRead,
      article,
      formatDate
    }
  }
}
</script>

Timeline
<style lang="scss" scoped>
.content-container {
  display: flex;
  flex-direction: row;
  width: 100%;

  .main-content {
    flex-grow: 1;
    width: 0;
    margin-right: 0.5rem;

    .archive {
      background-color: rgba($color: #fff, $alpha: 0.6);
      border-radius: 1rem;
      padding: 1rem;
      margin-bottom: 2rem;

      .readmore {
        margin-left: 1rem;
        font-size: 0.8rem;
        color: #0085f5;
        transition: all 0.3s ease-in;

        &:hover {
          color: #008822;
        }
      }
    }
  }

  // .aside-content {
  //   width: 220px;
  //   min-width: 220px;
  // }
}
</style>
