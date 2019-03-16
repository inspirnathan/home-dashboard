<template>
  <div id="day">
    <div class="bottom-row__day-container__day__date">{{ dayOfWeek }}</div>
    <div class="bottom-row__day-container__day__content">
      <div class="bottom-row__day-container__day__content__weather-icon">
        <i :class="'icon ' + `${getClassByIcon(todayIcon)}`"></i>
      </div>
      <div class="bottom-row__day-container__day__content__status-precip">
        <p>{{ todaySummary }}</p>
        <div>Precipitation: {{ formatPercentage(currentPrecipitation) }}</div>
      </div>
      <div class="bottom-row__day-container__day__content__high-low">
        <div>High: {{ todayHigh }}&deg;F</div>
        <div>Low: {{ todayLow }}&deg;F</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapIconToImg } from '@/utils/weather';

export default {
  props: [
    "dayOfWeek",
    "todayIcon",
    "todaySummary",
    "currentPrecipitation",
    "todayHigh",
    "todayLow"
  ],
  methods: {
    getClassByIcon(icon) {
      if (!mapIconToImg[icon]) {
        return "fa-question";
      } else {
        return mapIconToImg[icon];
      }
    },
    formatPercentage(value) {
      if (typeof value === "number") {
        return Math.round(value * 100) + "%";
      } else {
        return "";
      }
    }
  }
};
</script>


<style scoped>
#day {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.bottom-row__day-container__day__date {
  color: white;
  background-color: rgba(0, 0, 255, 0.6);
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  padding: 0.5rem 0;
}

.bottom-row__day-container__day__content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  border-bottom-left-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  margin: 0.5rem;
}

.bottom-row__day-container__day__content > div:first-child {
  margin-top: 1rem;
}

.bottom-row__day-container__day__content > div:last-child {
  margin-bottom: 2rem;
}

.icon {
  font-size: 4rem;
}

.fa-sun {
  color: yellow;
}
.fa-moon {
  color: white;
}
.fa-cloud-rain {
  color: blue;
}
.fa-cloud-snow {
  color: white;
}
.fa-cloud-sleet {
  color: rgb(206, 206, 206);
}
.fa-wind {
  color: rgb(146, 146, 146);
}
.fa-cloudversify {
  color: rgb(94, 91, 91);
}
.fa-cloud {
  color: rgb(199, 197, 197);
}
.fa-cloud-sun {
  color: rgb(0, 225, 255);
}
.fa-cloud-moon {
  color: rgb(115, 93, 128);
}
</style>
