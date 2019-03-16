<template>
  <div id="top-row__item__today-data">
    <div class="top-row__item__today-data__humidity">Humidity: {{ currentHumidity }}</div>
    <div class="top-row__item__today-data__dew-point">Dew Point: {{ currentDewPoint }}</div>
    <div class="top-row__item__today-data__pressure">Pressure: {{ currentPressure }}</div>
    <div class="top-row__item__today-data__wind-speed">Wind Speed: {{ currentWindSpeed }}</div>
    <div class="top-row__item__today-data__uv-index">UV Index: {{ currentUVIndex }}</div>
    <div class="top-row__item__today-data__visibility">Visibility: {{ currentVisibility }}</div>
  </div>
</template>

<script>
export default {
  props: [
    "currentHumidity",
    "currentDewPoint",
    "currentPressure",
    "currentWindSpeed",
    "currentUVIndex",
    "currentVisibility"
  ]
};
</script>


<style scoped>
</style>
