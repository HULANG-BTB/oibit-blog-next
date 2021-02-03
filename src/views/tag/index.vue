<template>
  <div class="content-container">
    <div class="main-content">
      <div class="tags">
        <div v-for="(item, index) in data" :key="index" class="tag">
          <span :class="item.color" :style="{ fontSize: item.fontSize }">({{ item.nums }})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  setup() {
    const data = []
    const color = ['orange', 'primary', 'success', 'warn', 'danger']
    for (let i = 0; i < 30; i++) {
      data.push({
        nums: Math.floor(Math.random() * 20),
        color: color[i % 5]
      })
    }
    const max = Math.max(...data.map(item => item.nums))
    data.forEach(item => {
      item.fontSize = item.nums / max + 1 + 'rem'
    })
    console.log(data)
    return { data }
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
        margin: 0.5rem 0.5rem;
        padding: 0.2rem 0.5rem;
        transition: all 0.3s ease-in;

        &:hover {
          background-color: rgba($color: #fff, $alpha: 0.8);
          border-radius: 0.7rem 0.7rem;
        }
      }
    }
  }
}
</style>
