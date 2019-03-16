<template>
  <div id="top-row__item__today-sunset">
    <div class="top-row__item__today-sunset__icon">
      <i class="icon fas fa-sun"></i>
    </div>
    <div class="top-row__item__today-sunset__title">Sunset Time</div>
    <div class="top-row__item__today-sunset__time">{{ todaySunsetTime }}</div>
  </div>
</template>

<script>
export default {
  props: ['todaySunsetTime']
}
</script>


<style scoped>
.icon {
  font-size: 4rem;
}

.fa-sun {
  color: rgb(255, 81, 0);
}
</style>

