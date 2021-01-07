import timelineComponent from './timeline.vue'
import timelineItemComponent from './timeline-item.vue'

timelineComponent.install = app => {
  app.components(timelineComponent.name, timelineComponent)
}

timelineItemComponent.install = app => {
  app.components(timelineItemComponent.name, timelineItemComponent)
}

export const timeline = timelineComponent
export const timelineItem = timelineItemComponent

export default {
  timeline,
  timelineItem
}
