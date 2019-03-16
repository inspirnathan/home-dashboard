<template>
  <div id="calendar__container">
    <h2 class="calendar__month">{{ month }}</h2>
    <div class="calendar__daysofweek">
      <div>Sunday</div>
      <div>Monday</div>
      <div>Tuesday</div>
      <div>Wednesday</div>
      <div>Thursday</div>
      <div>Friday</div>
      <div>Saturday</div>
    </div>
    <div class="calendar__calendar">
      <div :class="`calendar__cell ${outsideMonth(val)}`" v-for="(val, ind) in dates" :key="ind">
        <div :class="`calendar__cell__date ${isToday(val)}`">{{ dateFormat(val.date) }}</div>
        <div class="calendar__cell__events">
          <div
            v-if="val.events.length >= 1"
            class="calendar__cell__events__event"
          >{{ val.events[0].title }}</div>
          <div
            v-if="val.events.length >= 2"
            class="calendar__cell__events__event"
          >{{ val.events[1].title }}</div>
          <div
            v-if="val.events.length >= 3"
            class="calendar__cell__events__event"
          >{{ val.events[2].title }}</div>
          <div
            v-if="val.foodEvents.length >= 1 && val.events.length <= 2"
            class="calendar__cell__events__food"
          >{{ val.foodEvents[0].title }}</div>
          <div
            v-if="val.foodEvents.length >= 2 && val.events.length <= 1"
            class="calendar__cell__events__food"
          >{{ val.foodEvents[1].title }}</div>
          <div
            v-if="val.foodEvents.length >= 3 && val.events.length === 0"
            class="calendar__cell__events__food"
          >{{ val.foodEvents[2].title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { calendarify, format, currentMonth } from "@/utils/calendar.js";
import { applicationRef } from "@/firebase/init";

export default {
  data: () => {
    return {
      dates: [],
      month: currentMonth()
    };
  },
  props: ["events", "foodEvents"],
  methods: {
    dateFormat(date) {
      return format(date);
    },
    outsideMonth(val) {
      return val.outsideCurrentMonth
        ? "calendar__cell--outside-current-month"
        : "";
    },
    isToday(val) {
      return val.isToday ? "calendar__cell__date--today" : "";
    }
  },
  created() {
    applicationRef.on("value", () => {
      this.$nextTick(() => {
        this.dates = calendarify(this.events, this.foodEvents);
      });
    });
  }
};
</script>

<style scoped>
#calendar__container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
}

.calendar__month {
  margin: 0;
}

.calendar__daysofweek {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 95%;
  text-align: center;
  border: 1px solid black;
  border-radius: 8px;
  padding: 0.5rem 0;
  background-color: crimson;
  color: white;
}

.calendar__calendar {
  width: 95%;
  height: 85%;
  display: grid;
  grid-gap: 0.25rem;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 1fr;
}

.calendar__cell {
  border: 1px solid black;
  border-radius: 8px;
  padding: 0.25rem 0.25rem 0 0.25rem;
}

.calendar__cell--outside-current-month {
  background-color: #dedede;
}

.calendar__cell__date {
  background-color: white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  text-align: center;
  line-height: 2rem;
}

.calendar__cell__date--today {
  border: 1px solid blue;
}

.calendar__cell__events {
  color: white;
  display: flex;
  flex-direction: column;
}

.calendar__cell__events__event {
  background-color: #1867c0;
  border-radius: 5px;
  margin: 0.25rem 0;
  text-align: center;
}

.calendar__cell__events__food {
  background-color: #00d471;
  border-radius: 5px;
  margin: 0.25rem 0;
  text-align: center;
}
</style>
