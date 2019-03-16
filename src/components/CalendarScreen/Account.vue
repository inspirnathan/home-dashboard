<template>
  <div id="account__container">
    <div class="account__title">Account Balance</div>
    <div class="account__number-bar">
      <div class="account__number-bar__balance">${{ account }}</div>
    </div>
  </div>
</template>

<script>
import { applicationRef } from "@/firebase/init";

export default {
  data() {
    return {
      account: 0
    };
  },
  created() {
    applicationRef.on('value', snapshot => {
      this.account = (+snapshot.val().account).toFixed(2);
    });
  }
};
</script>

<style scoped>
#account__container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background-color: #1867c0;
  border-radius: 0.5rem;
}

.account__title {
  color: white;
  font-size: 2rem;
}

.account__number-bar {
  width: 70%;
  height: 40%;
  background-color: white;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.account__number-bar__balance {
  font-size: 2rem;
}
</style>
