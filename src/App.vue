<template>
  <div id="app" :style="{ backgroundImage: `url('${imageType}')` }">
    <CalendarScreen v-if="screen ==='calendar'"/>
    <WeatherScreen v-if="screen === 'weather'" :weatherData="weatherData"/>
    <div v-else></div>
  </div>
</template>

<script>
import CalendarScreen from "./components/CalendarScreen/CalendarScreen.vue";
import WeatherScreen from "./components/WeatherScreen/WeatherScreen.vue";
import { applicationRef } from "@/firebase/init";
import sky from "@/assets/sky.jpeg";
import rain from "@/assets/rain.jpg";
import night from "@/assets/night.jpg";
import { getDarkSkyData, pendingData } from "@/utils/weather";
import { getCurrentHour, getCurrentTime } from "@/utils/calendar";

export default {
  name: "app",
  components: {
    CalendarScreen,
    WeatherScreen
  },
  data() {
    return {
      weatherData: pendingData,
      screen: "",
      imageType: "",
      account: 0,
      subtractValue: 0,
      sky,
      rain,
      night
    };
  },
  methods: {
    async getData() {
      // eslint-disable-next-line
      console.log("Weather Data Collected @ " + getCurrentTime());
      const weatherData = await getDarkSkyData();
      this.weatherData = weatherData;
      if (weatherData.todayIcon === "rain") {
        this.imageType = this.rain;
      } else {
        if (getCurrentHour() >= 19) {
          this.imageType = night;
        } else {
          this.imageType = sky;
        }
      }
    }
  },
  mounted() {
    this.getData();
    setTimeout(() => window.location.reload(), 43200000); // refresh page once every 12 hours to get new calendar data
  },
  created() {
    applicationRef.on("value", snapshot => {
      if (snapshot.val().screen === "weather") {
        this.screen = snapshot.val().screen;
        this.getData();
      } else if (snapshot.val().screen === "calendar") {
        this.screen = snapshot.val().screen;
      } else {
        this.screen = "calendar";
      }
    });
  }
};
</script>

<style>
html,
body {
  font-size: 18px;
  box-sizing: border-box;
}
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-position: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 1320px){
  body {
    font-size: 16px;
  }
}

@media only screen and (max-height: 900px){
  body {
    font-size: 16px;
  }
}
</style>
