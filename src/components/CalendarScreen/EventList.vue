<template>
  <div id="event-list__container">
      <div class="event-list__header">Upcoming Events</div>
      <div class="event-list__list">
          <div class="event-list__list__item" v-for="(val, index) in upcomingEvents(events).slice(0, 5)" :key="index">
              <img class="event-list__list__item__icon" src="https://source.unsplash.com/lJ6iASrFAnQ/40x40" alt="fruit" />
              <div class="event-list__list__item__info">
                  <div class="event-list__list__item__title">{{ val.title }}</div>
                  <div class="event-list__list__item__subtitle">{{ formatDate(val.date) }}</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { formatDateForList, upcomingEvents } from '@/utils/calendar.js';

export default {
  props: ['events'],
  methods: {
    formatDate(date) {
      return formatDateForList(date);
    },
    upcomingEvents(datesArr) {
      return upcomingEvents(datesArr);
    }
  }
};
</script>

<style scoped>
#event-list__container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
}

.event-list__header {
  background-color: #00bcd4;
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2rem;
  text-align: center;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.event-list__list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.event-list__list__item {
  padding: 0.5rem;
  display: flex;
  align-items: center;
}

.event-list__list__item__icon {
  border-radius: 50%;
}

.event-list__list__item__info {
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
}

.event-list__list__item__subtitle {
  color: gray;
  font-size: 0.75rem;
}
</style>
