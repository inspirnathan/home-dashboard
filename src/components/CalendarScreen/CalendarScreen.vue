<template>
  <div id="calendar-screen">
    <div class="grid-container">
      <div class="calendar">
        <Calendar :events="events" :foodEvents="foodEvents"/>
      </div>
      <div class="account">
        <Account/>
      </div>
      <div class="event-list">
        <EventList :events="events"/>
      </div>
      <div class="food-list">
        <FoodList :foodEvents="foodEvents"/>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from "./Calendar.vue";
import Account from "./Account.vue";
import EventList from "./EventList.vue";
import FoodList from "./FoodList.vue";

import { sortedEvents } from "@/utils/calendar.js";
import { applicationRef } from "@/firebase/init";

export default {
  name: "calendar-screen",
  components: {
    Calendar,
    Account,
    EventList,
    FoodList
  },
  data: () => {
    return {
      events: [],
      foodEvents: []
    };
  },
  created() {
    applicationRef.on("value", snapshot => {
      if (snapshot.val().events) {
        const events = snapshot.val().events;
        const eventData = Object.values(events);
        this.events = sortedEvents(eventData);
      } else {
        this.events = [];
      }

      if (snapshot.val().foodEvents) {
        const foodEvents = snapshot.val().foodEvents;
        const foodEventData = Object.values(foodEvents);
        this.foodEvents = sortedEvents(foodEventData);
      } else {
        this.foodEvents = [];
      }
    });
  }
};
</script>

<style scoped>
#calendar-screen {
  height: 95%;
  width: 95%;
}

.grid-container {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 1fr 2fr 3fr;
  grid-gap: 2rem;
  height: 100%;
}

.calendar {
  grid-column: 1 / 3;
  grid-row: 1 / 4;
}
</style>
