<template>
  <div class="cont flex flex-col w-full items-center gap-5">
    <p>token: {{ token }}</p>
    <p class="mt-6">Ingresa la nueva contraseña</p>
    <input type="password" v-model="password" placeholder="Nueva contraseña" class="input w-full max-w-xs" />
    <input type="password" v-model="verifyPassword" placeholder="Repita la contraseña" class="input w-full max-w-xs" />

    <button class="btn" @click="sendData"> Cambiar</button>
  </div>
</template>

<script>
import { ref } from "vue";

import { useRoute } from "vue-router";

// import apiAuth from '../api/apiAuth';
export default {
  setup() {
    const token = ref(useRoute().query.token);
    const password = ref(null);
    const verifyPassword = ref(null);

    const sendData = () => {
      console.log(password.value)
      console.log(verifyPassword.value)
    }
    return {
      token,
      sendData,
      password,
      verifyPassword
    
    };
  },
};
</script>

<style>
</style>