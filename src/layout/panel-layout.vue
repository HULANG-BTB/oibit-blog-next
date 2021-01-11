<template>
  <div class="panel-layout">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="divide"></div>
    <div class="conetnt">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'panel-layout'
}
</script>

<style lang="scss" scoped>
.panel-layout {
  width: 100%;

  .title {
    height: 3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
  }
  .divide {
    width: 100%;
    height: 1px;
    background-color: #ddd;
  }
  .conetnt {
    padding: 1rem;
  }
}
</style>
