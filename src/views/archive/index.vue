<template>
  <div class="content-container unselected">
    <div class="main-content">
      <div class="archive">Archive</div>
    </div>
    <div class="aside-content"></div>
  </div>
</template>

<script>
export default {
  name: 'Archive'
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

    .archive {
      background-color: #fff;
      padding: 1rem;
    }
  }

  .aside-content {
    width: 220px;
    min-width: 220px;
  }
}
</style>
