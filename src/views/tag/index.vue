<template>
  <div class="content-container">
    <div class="main-content">
      <div class="tags">
        <div v-for="(item, index) in data" :key="index" class="tag">
          <span :class="item.color" :style="{ fontSize: item.fontSize, lineHeight: item.fontSize }" @click="onTagClick(item)">{{ `${item.name} (${item.nums})` }}</span>
        </div>
      </div>
    </div>
    <div class="aside-content"></div>
  </div>
</template>

<script>
import { computed } from 'vue'
import Tag from './useTag'
import { useRouter } from 'vue-router'

export default {
  name: 'Tag',
  setup() {
    const router = useRouter()
    const color = ['orange', 'primary', 'success', 'warn', 'danger']

    const data = computed(() => {
      const tags = Tag.tags.value || []
      tags.forEach((tag, index) => {
        tag.color = color[index % 5]
        tag.nums = tag.ArticleTags.length ?? 0
      })
      const max = Math.max(...tags.map(item => item.nums))
      tags.forEach(tag => {
        tag.fontSize = tag.nums / max + 1 + 'rem'
      })
      return tags
    })
    Tag.getTags()
    const onTagClick = item => {
      // router.push({
      //   name: 'TagArticle',
      //   params: {
      //     Tag: item.name
      //   }
      // })
      router
      console.log(item)
    }
    return { data, Tag, onTagClick }
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

    .tags {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      // border: 2px solid white;
      // border-radius: 5px;

      .tag {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.5rem 0;
        padding: 0.2rem 1rem;
        transition: background-color 0.3s ease-in, border-radius 0.3s ease-in 0.2s;

        &:hover {
          background-color: rgba($color: #fff, $alpha: 0.6);
          border-radius: 0.7rem;
        }
      }
    }
  }

  .aside-content {
    width: 220px;
    min-width: 220px;
  }
}
</style>
