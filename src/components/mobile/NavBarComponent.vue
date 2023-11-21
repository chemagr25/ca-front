<script setup>
import router from "../../router/router";

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
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon @click="clearSession">mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<style scoped></style>