<template>
  <div id="bottom-row">
    <div class="bottom-row__title">
      <h1>Daily Forecast</h1>
    </div>
    <div class="bottom-row__day-container">
      <div class="bottom-row__day-container__day" v-for="(val, index) in 8" :key="index">
        <Day
          :dayOfWeek="getDayOfWeekFromTime(weatherData.dailyForecast[index].time, index)"
          :todayIcon="weatherData.dailyForecast[index].icon"
          :todaySummary="weatherData.dailyForecast[index].summary"
          :currentPrecipitation="weatherData.dailyForecast[index].precipProbability"
          :todayHigh="weatherData.dailyForecast[index].temperatureHigh"
          :todayLow="weatherData.dailyForecast[index].temperatureLow"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Day from "@/components/WeatherScreen/BottomRow/Day/Day.vue";
import { getDayOfWeek, getTodayDayOfWeek } from "@/utils/weather";

export default {
  components: {
    Day
  },
  props: ["weatherData"],
  methods: {
    getDayOfWeekFromTime: (time, index) => {
      if (getDayOfWeek(time) === getTodayDayOfWeek() && index === 0) {
        return "Today";
      } else {
        return getDayOfWeek(time);
      }
    }
  }
};
</script>


<style scoped>
#bottom-row {
  width: 100%;
  height: 55%;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid black;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.bottom-row__title {
  height: 10%;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom-row__day-container {
  width: 98%;
  height: 80%;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bottom-row__day-container > div {
  flex: 1;
  margin: 0 0.5rem;
}

.bottom-row__day-container__day {
  height: 100%;
  border: 1px solid black;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
}
</style>
