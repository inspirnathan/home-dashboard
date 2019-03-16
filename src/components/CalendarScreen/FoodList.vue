<template>
  <div id="food-list__container">
      <div class="food-list__header">Food Soon To Expire</div>
      <div class="food-list__list">
          <div class="food-list__list__item" v-for="(val, index) in upcomingEvents(foodEvents).slice(0,7)" :key="index">
              <img class="food-list__list__item__icon" src="https://source.unsplash.com/qVywyNo9_-E/40x40" alt="fruit" />
              <div class="food-list__list__item__info">
                  <div class="food-list__list__item__title">{{ val.title }}</div>
                  <div class="food-list__list__item__subtitle">{{ formatDate(val.date) }}</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { formatDateForList, upcomingEvents } from '@/utils/calendar.js';

export default {
  props: ['foodEvents'],
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
#food-list__container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
}

.food-list__header {
  background-color: #00d471;
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

.food-list__list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.food-list__list__item {
  padding: 0.5rem;
  display: flex;
  align-items: center;
}

.food-list__list__item__icon {
  border-radius: 50%;
}

.food-list__list__item__info {
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
}

.food-list__list__item__subtitle {
  color: gray;
  font-size: 0.75rem;
}
</style>
