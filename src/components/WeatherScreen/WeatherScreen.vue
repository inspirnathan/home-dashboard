<template>
  <div id="weather-screen">
    <div class="flex-container">
      <TopRow :weatherData="weatherData" />
      <BottomRow :weatherData="weatherData"/>
    </div>
  </div>
</template>

<script>
import TopRow from "@/components/WeatherScreen/TopRow/TopRow.vue";
import BottomRow from "@/components/WeatherScreen/BottomRow/BottomRow.vue";

export default {
  name: "weather-screen",
  components: {
    TopRow,
    BottomRow
  },
  props: ['weatherData'],
};
</script>

<style scoped>
#weather-screen {
  height: 95%;
  width: 95%;
}

.flex-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
</style>
