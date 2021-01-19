<template>
  <panel-layout class="carousel-admin">
    <template #title>
      <div>轮播图管理</div>
    </template>
    <template #toobar> </template>
    <div class="page-content">
      123
    </div>
  </panel-layout>
</template>

<script>
import PanelLayout from '@/layout/panel-layout'
export default {
  name: 'carousel-admin',
  components: { PanelLayout }
}
</script>

<style lang="scss" scoped>
.carousel-admin {
  .page-content {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
  }
}
</style>
