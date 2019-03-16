<template>
  <div id="top-row">
    <div class="top-row__item">
      <Details
        :currentTime="getRecentWeatherTimeStamp(weatherData.currentTime)"
        :todayHigh="weatherData.dailyForecast[0].temperatureHigh"
        :todayLow="weatherData.dailyForecast[0].temperatureLow"
        :currentTemperature="weatherData.currentTemperature"
        :currentApparentTemperature="weatherData.currentApparentTemperature"
      />
    </div>
    <div class="top-row__item">
      <Forecast
        :todayIcon="weatherData.todayIcon"
        :todaySummary="weatherData.todaySummary"
        :currentPrecipitation="weatherData.currentPrecipitation"
      />
    </div>
    <div class="top-row__item">
      <Data
        :currentHumidity="weatherData.currentHumidity"
        :currentDewPoint="weatherData.currentDewPoint"
        :currentPressure="weatherData.currentPressure"
        :currentWindSpeed="weatherData.currentWindSpeed"
        :currentUVIndex="weatherData.currentUVIndex"
        :currentVisibility="weatherData.currentVisibility"
      />
    </div>
    <div class="top-row__item">
      <Sunrise :todaySunriseTime="getSunriseSunsetTime(weatherData.dailyForecast[0].sunriseTime)"/>
    </div>
    <div class="top-row__item">
      <Sunset :todaySunsetTime="getSunriseSunsetTime(weatherData.dailyForecast[0].sunsetTime)"/>
    </div>
    <div class="top-row__item">
      <MoonPhase :todayMoonPhase="weatherData.dailyForecast[0].moonPhase"/>
    </div>
  </div>
</template>

<script>
import Details from "@/components/WeatherScreen/TopRow/Details/Details.vue";
import Forecast from "@/components/WeatherScreen/TopRow/Forecast/Forecast.vue";
import Data from "@/components/WeatherScreen/TopRow/Data/Data.vue";
import Sunrise from "@/components/WeatherScreen/TopRow/Sunrise/Sunrise.vue";
import Sunset from "@/components/WeatherScreen/TopRow/Sunset/Sunset.vue";
import MoonPhase from "@/components/WeatherScreen/TopRow/MoonPhase/MoonPhase.vue";

import { getRecentWeatherTimeStamp, getTodaySunriseSunsetTime } from "@/utils/weather";

export default {
  components: {
    Details,
    Forecast,
    Data,
    Sunrise,
    Sunset,
    MoonPhase
  },
  props: ["weatherData"],
  methods: {
    getRecentWeatherTimeStamp: time => getRecentWeatherTimeStamp(time),
    getSunriseSunsetTime: time => getTodaySunriseSunsetTime(time)
  }
};
</script>


<style scoped>
#top-row {
  width: 100%;
  height: 35%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#top-row > div {
  flex: 1;
  margin: 0 0.5rem;
}

#top-row > div:first-child {
  margin-left: 0;
}

#top-row > div:last-child {
  margin-right: 0;
}

.top-row__item {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid black;
  border-radius: 0.5rem;
}

.top-row__item > div {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>
