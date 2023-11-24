<script setup>
import router from "../../router/router";

import { ArrowLeftIcon,
ArrowLeftOnRectangleIcon } from "@heroicons/vue/24/outline";

const clearSession = () => {
  localStorage.clear();
  router.push({ name: "login" });
};

const back = () => {
  router.go(-1)
}

</script>

<template>
  <div class="w-full bordera absolute fix">
    <v-toolbar
    color="white">
      <v-btn @click="back" icon>
        <ArrowLeftIcon @click="back" class="w-5"></ArrowLeftIcon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <ArrowLeftOnRectangleIcon class="w-5 " @click="clearSession"></ArrowLeftOnRectangleIcon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<style scoped></style>