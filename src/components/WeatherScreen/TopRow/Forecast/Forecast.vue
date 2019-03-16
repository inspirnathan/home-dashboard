<template>
  <div id="top-row__item__today-forecast">
    <div class="top-row__item__today-forecast__icon">
      <i :class="'icon ' + `${getClassByIcon(todayIcon)}`"></i>
    </div>
    <div class="top-row__item__today-forecast__status">{{ todaySummary }}</div>
    <div
      class="top-row__item__today-forecast__precipitation"
    >Chance of Precipitation: {{ formatPrec(currentPrecipitation) }}</div>
  </div>
</template>

<script>
import { mapIconToImg } from "@/utils/weather";

export default {
  props: ["todayIcon", "todaySummary", "currentPrecipitation"],
  methods: {
    getClassByIcon(icon) {
      if (!mapIconToImg[icon]) {
        return "fa-question";
      } else {
        return mapIconToImg[icon];
      }
    },
    formatPrec(value) {
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
