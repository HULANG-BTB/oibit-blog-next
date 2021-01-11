<template>
  <div class="hover-tips">
    <slot></slot>
    <div ref="tips" class="tips">
      <slot name="tips"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hoverTips'
}
</script>

<style lang="scss" scoped>
.hover-tips {
  position: relative;
  display: inherit;
  user-select: text;

  &:hover {
    .tips {
      display: block;
      opacity: 1;
    }
  }

  .tips {
    display: none;
    transition: all 0.3s ease-in-out;
    top: 0;
    left: 50%;
    transform: translateY(-110%) translateX(-50%);
    opacity: 0;
    position: absolute;
    background-color: rgba($color: #000000, $alpha: 0.2);
    border-radius: 5px;
    padding: 5px;

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: rgba($color: #000000, $alpha: 0.2) transparent transparent transparent;
    }
  }
}
</style>
