<template>
  <div id="top-row__item__today-sunrise">
    <div class="top-row__item__today-sunrise__icon">
      <i class="icon fas fa-sun"></i>
    </div>
    <div class="top-row__item__today-sunrise__title">Sunrise Time</div>
    <div class="top-row__item__today-sunrise__time">{{ todaySunriseTime }}</div>
  </div>
</template>

<script>
export default {
  props: ['todaySunriseTime']
}
</script>


<style scoped>
.icon {
  font-size: 4rem;
}

.fa-sun {
  color: rgb(255, 174, 0);
}
</style>
