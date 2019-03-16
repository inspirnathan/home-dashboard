<template>
  <div id="top-row__item__today-details">
    <div class="top-row__item__today-details__date">{{ currentTime }}</div>
    <div class="top-row__item__today-details__high-low">
      <span class="top-row__item__today-details__high-low__high">Day {{ todayHigh }}&deg;F</span>
      &#8226;
      <span
        class="top-row__item__today-details__high-low__low"
      >Night {{ todayLow }}&deg;F</span>
    </div>
    <div class="top-row__item__today-details__temperature">Currently {{ currentTemperature }}&deg;F</div>
    <div
      class="top-row__item__today-details__apparent-temperature"
    >Feels like {{ currentApparentTemperature }}&deg;F</div>
  </div>
</template>

<script>
export default {
  props: [
    "currentTime",
    "todayHigh",
    "todayLow",
    "currentTemperature",
    "currentApparentTemperature"
  ]
};
</script>

<style scoped>
.top-row__item__today-details__high-low__high {
  color: red;
}

.top-row__item__today-details__high-low__low {
  color: blue;
}
</style>
