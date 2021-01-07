<template>
  <div class="calendar" ref="calendarRef">
    <div class="toolbar">
      <div class="date" @click="onDate">
        <template v-if="calendar.selectedYear">{{ calendar.year }}年</template>
        <template v-if="calendar.selectedMonth">{{ calendar.month }}月</template>
      </div>
      <div class="operation">
        <div class="prev" @click="onPrev">
          <svg class="icon icon-up">
            <use xlink:href="#icon-up"></use>
          </svg>
        </div>
        <div class="next" @click="onNext">
          <svg class="icon icon-down">
            <use xlink:href="#icon-down"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="content" :style="{ height: width + 'px' }">
      <transition :name="`zoom-${calendar.animation}`">
        <ul class="days" v-if="calendar.selectedYear && calendar.selectedMonth">
          <li class="week">一</li>
          <li class="week">二</li>
          <li class="week">三</li>
          <li class="week">四</li>
          <li class="week">五</li>
          <li class="week">六</li>
          <li class="week">日</li>
          <li class="day" v-for="date in calendar.dayList" :key="`${date.month}-${date.day}`" @click="onDay(date)">{{ date.day }}</li>
        </ul>
        <ul class="months" v-else-if="calendar.selectedYear">
          <li class="month" v-for="month in calendar.monthList" :key="month.month" @click="onMonth(month)">{{ month.month }}</li>
        </ul>
        <ul class="years" v-else>
          <li class="year" v-for="year in calendar.yearList" :key="year" @click="onYear(year)">{{ year }}</li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import { computed, ref, toRefs } from 'vue'
import calendar from './useCalendar'

export default {
  name: 'calendar',
  setup() {
    const calendarRef = ref(null)
    const width = computed(() => {
      return (calendarRef.value?.offsetWidth || 0) * 0.68
    })

    return {
      width,
      calendarRef,
      ...toRefs(calendar)
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  width: 100%;
  display: flex;
  flex-direction: column;

  .toolbar {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;

    .operation {
      display: flex;
      flex-direction: row;
      .icon {
        width: 1rem;
        height: 1rem;
      }
    }
  }

  .content {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .zoom-in-enter-from {
      transform: scale(0.8);
      opacity: 0;
    }
    .zoom-in-leave-to {
      transform: scale(1.4);
      opacity: 0;
    }

    .zoom-in-enter-to,
    .zoom-in-leave-from {
      transform: scale(1);
      opacity: 1;
    }

    .zoom-in-enter-active {
      transition: all 0.2s ease-in 0.3s;
    }
    .zoom-in-leave-active {
      transition: all 0.3s ease-in;
    }

    .zoom-out-enter-from {
      transform: scale(1.4);
      opacity: 0;
    }
    .zoom-out-leave-to {
      transform: scale(0.8);
      opacity: 0;
    }

    .zoom-out-enter-to,
    .zoom-out-leave-from {
      transform: scale(1);
      opacity: 1;
    }

    .zoom-out-enter-active {
      transition: all 0.2s ease-in 0.3s;
    }
    .zoom-out-leave-active {
      transition: all 0.3s ease-in;
    }

    .days {
      width: 100%;
      display: flex;
      margin-bottom: 1rem;
      flex-wrap: wrap;

      .week,
      .day {
        width: 14.28%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: transparent 2px solid;
        color: #000;

        &::before {
          content: '';
          display: block;
          margin-top: 50%;
        }
      }

      .day {
        &:hover {
          border: rgba($color: #000000, $alpha: 0.6) 2px solid;
        }
      }
    }

    .years {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .year {
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: transparent 2px solid;
        color: #000;

        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(14),
        &:nth-child(15),
        &:nth-child(16) {
          color: #aaa;
        }

        &::before {
          content: '';
          display: block;
          margin-top: 65%;
        }

        &:hover {
          border: rgba($color: #000000, $alpha: 0.6) 2px solid;
        }
      }
    }

    .months {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .month {
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: transparent 2px solid;
        color: #000;

        &:nth-child(13),
        &:nth-child(14),
        &:nth-child(15),
        &:nth-child(16) {
          color: #aaa;
        }

        &::before {
          content: '';
          display: block;
          margin-top: 65%;
        }

        &:hover {
          border: rgba($color: #000000, $alpha: 0.6) 2px solid;
        }
      }
    }
  }
}
</style>
