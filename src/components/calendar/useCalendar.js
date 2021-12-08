import { reactive } from 'vue'
import dayjs from 'dayjs'

const calendar = reactive({
  date: dayjs(),
  selectedYear: true,
  selectedMonth: true,
  year: dayjs().year(),
  month: dayjs().month() + 1,
  day: dayjs().date(),
  yearList: [],
  monthList: [],
  dayList: [],
  animation: 'in'
})

const onYear = year => {
  calendar.year = parseInt(year)
  calendar.date.year(calendar.year)
  initMonth()
  calendar.animation = 'in'
  calendar.selectedYear = true
}

const onMonth = month => {
  calendar.year = parseInt(month.year)
  calendar.month = parseInt(month.month)
  calendar.date.year(calendar.year)
  calendar.date.month(calendar.month - 1)
  initDay()
  calendar.animation = 'in'
  calendar.selectedMonth = true
}

const onDay = day => {
  // const context = useContext()
  // console.log(context)
  calendar.year = parseInt(day.year)
  calendar.month = parseInt(day.month)
  calendar.day = parseInt(day.day)
  calendar.date.year(calendar.year)
  calendar.date.month(calendar.month - 1)
  calendar.date.day(calendar.day - 1)
  calendar.animation = 'in'
  // context.emit(
  //   'onDate',
  //   dayjs()
  //     .year(calendar.year)
  //     .month(calendar.month - 1)
  //     .day(calendar.day - 1)
  // )
}

const initYear = () => {
  const beginYear = Math.floor(parseInt(calendar.year) / 10) * 10 - 3
  calendar.yearList.length = 0
  for (let index = 0; index < 16; index++) {
    calendar.yearList.push(beginYear + index)
  }
}

const initMonth = () => {
  calendar.monthList.length = 0
  for (let index = 1; index <= 16; index++) {
    calendar.monthList.push({
      month: index > 12 ? index - 12 : index,
      year: index > 12 ? calendar.year + 1 : calendar.year
    })
  }
}

const initDay = () => {
  calendar.dayList.length = 0
  const firstDay = dayjs(calendar.date)
    .year(calendar.year)
    .month(calendar.month - 1)
    .date(0)
  const week = firstDay.day() === 0 ? 6 : firstDay.day()
  firstDay.subtract(week - 1, 'days')
  for (let index = 0; index < 42; index++) {
    calendar.dayList.push({
      year: firstDay.year(),
      month: firstDay.month() + 1,
      day: firstDay.date()
    })
    firstDay.add(1, 'days')
  }
}

const onDate = () => {
  calendar.animation = 'out'
  if (calendar.selectedMonth) {
    calendar.selectedMonth = false
    initMonth()
  } else if (calendar.selectedYear) {
    calendar.selectedYear = false
    initYear()
  }
}

const onPrev = () => {
  if (calendar.selectedMonth) {
    calendar.date.subtract(1, 'month')
    initDay()
  } else if (calendar.selectedYear) {
    calendar.date.subtract(1, 'year')
    initMonth()
  } else {
    calendar.date.subtract(1, 'year')
    initYear()
  }
}

initDay()

export default reactive({
  calendar,
  onYear,
  onMonth,
  onDay,
  onDate,
  onPrev
})
