import Calendar from './calendar.vue'

Calendar.install = app => {
  app.components(Calendar.name, Calendar)
}

export default Calendar
