<template>
  <div id="top-row__item__today-moon-phase">
    <div class="top-row__item__today-moon-phase__icon">
      <i :class="'icon fas ' + (formatPercentage(todayMoonPhase) === '100%' ? 'fa-circle' : 'fa-moon')"></i>
    </div>
    <div class="top-row__item__today-moon-phase__title">Moon Phase</div>
    <div class="top-row__item__today-moon-phase__time">{{ formatPercentage(todayMoonPhase) }}</div>
  </div>
</template>

<script>
export default {
  props: ['todayMoonPhase'],
  methods: {
    formatPercentage(value) {
      if (typeof value === "number") {
        return Math.round(value * 100) + "%";
      } else {
        return "";
      }
    }
  }
}
</script>


<style scoped>
.icon {
  font-size: 4rem;
}

.fa-circle {
  color: white;
}

.fa-moon {
  color: white;
}
</style>
