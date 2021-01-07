<template>
  <li class="timeline-item">
    <input class="radio" :id="item.id" name="timeline-item" type="radio" :checked="item.checked" />
    <div class="relative">
      <label :for="item.id">
        <slot name="title"></slot>
      </label>
      <span class="date">
        <slot name="date"></slot>
      </span>
      <span class="circle"></span>
    </div>
    <div class="content">
      <p>
        <slot></slot>
      </p>
    </div>
  </li>
</template>

<script>
import { inject, onMounted, reactive } from 'vue'
export default {
  name: 'timeline-item',
  setup() {
    const timeline = inject('timeline')

    const item = reactive({
      id: 'null',
      checked: false
    })

    onMounted(() => {
      timeline.updateItems(item)
    })

    return {
      item
    }
  }
}
</script>

<style lang="scss" scoped>
.timeline-item {
  margin: 40px 0;
  position: relative;

  p {
    margin: 0 0 15px;
  }
  .date {
    margin-top: -10px;
    top: 50%;
    left: -158px;
    font-size: 0.95em;
    line-height: 20px;
    position: absolute;
  }

  .circle {
    margin-top: -10px;
    top: 50%;
    left: -39px;
    width: 14px;
    height: 14px;
    background: #eee9dc;
    border: 3px solid #48b379;
    border-radius: 50%;
    display: block;
    position: absolute;
  }

  .content {
    max-height: 20px;
    padding: 50px 20px 0;
    border-color: transparent;
    border-width: 2px;
    border-style: solid;
    border-radius: 0.5em;
    position: relative;
  }
  .content:before,
  .content:after {
    content: '';
    width: 0;
    height: 0;
    border: solid transparent;
    position: absolute;
    pointer-events: none;
    right: 100%;
  }
  .content:before {
    border-right-color: inherit;
    border-width: 20px;
    top: 50%;
    margin-top: -20px;
  }
  .content:after {
    border-right-color: rgba($color: #000000, $alpha: 0);
    border-width: 17px;
    top: 50%;
    margin-top: -17px;
  }
  .content p {
    max-height: 0;
    color: transparent;
    text-align: justify;
    word-break: break-word;
    hyphens: auto;
    overflow: hidden;
  }

  label {
    font-size: 1rem;
    position: absolute;
    z-index: 100;
    cursor: pointer;
    top: 20px;
    transition: transform 0.2s linear;
  }

  .radio {
    display: none;
  }

  .radio:checked + .relative label {
    cursor: auto;
    transform: translateX(42px);
  }
  .radio:checked + .relative .circle {
    background: #f98262;
  }
  .radio:checked ~ .content {
    max-height: 180px;
    border-color: rgba($color: #000000, $alpha: 0.1);
    margin-right: 20px;
    transform: translateX(20px);
    transition: max-height 0.4s linear, border-color 0.5s linear, transform 0.2s linear;
  }
  .radio:checked ~ .content p {
    max-height: 200px;
    color: #333;
    transition: color 0.3s linear 0.3s;
  }
}
</style>
