
<template>
  <div class="flex min-h-full  w-full    px-8 rounded-3xl   sm:2/5 md:w-3/6 mt-28 login-form   items-center   py-12 ">
    <div class="w-full  space-y-8">
      <div>
        <h1 class=" text-center text-3xl font-bold tracking-tight text-gray-900">
          CompuActual {{ tokenDevice }}
        </h1>
        <h2 class="mt-6 text-center text-3xl font-600 tracking-tight text-gray-900">
          Inicia sesión
        </h2>
      </div>
      <div class="mt-8 space-y-6" action="#" method="POST">
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address " class="sr-only focus:outline-none">Usuario</label>
            <input id="email-address" v-model="user" name="email" type="text"
              class="p-3 h-11 focus:outline-none relative  block w-full rounded-t-md border-0 py-1.5  ring-1 ring-inset ring-gray-200  focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-900 sm:text-sm sm:leading-6"
              placeholder="Usuario" />
          </div>
          <div>
            <label for="password" class="sr-only focus:outline-none">Password</label>
            <input id="password" v-model="password" name="password" type="password" autocomplete="current-password"
              class="p-3 h-11 focus:outline-none relative block w-full  rounded-b-md border-0 py-1.5  ring-1 ring-inset ring-gray-200  focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-900 sm:text-sm sm:leading-6"
              placeholder="Contraseña" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-900 hover:text-indigo-900">¿Olvidaste tu contraseña?</a>
          </div>
        </div>

        <div>
          <button :disabled="!isValid" @click="sendLogin"
            class="group h-12 items-center relative flex w-full justify-center align-center rounded-md bg-indigo-900 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900">
            <p>Iniciar sesión</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import apiAuth from "../../api/apiAuth";
import { PushNotifications } from '@capacitor/push-notifications';

import { createToast } from "mosha-vue-toastify";
import router from "../../router/router";
import apiResources from "../../api/apiResources";
// import router from 'vue-router'

const user = ref(null);
const password = ref(null);
const isValid = ref(true);

const tokenDevice = ref(null)

onMounted(async () => {
  await PushNotifications.checkPermissions().then((res) => {
    if (res.receive === 'granted') {
      console.log('User granted permission');
    } else {
      console.log('User did not grant permission');
    }
  })
  await PushNotifications.requestPermissions().catch((e) => {
    console.log(e)
  })

  await PushNotifications.addListener('registration', (tokendevice) => {
    tokenDevice.value = tokendevice.value
  }).catch((e) => {
    console.log()
  })
  await PushNotifications.register().then((res) => {
    console.log(res)
  }).catch((e) => {
    console.log()
  })
});

if (user.value && password.value) {
  isValid.value = true;
}

const nextPage = () => {
  router.push({ name: "main-log" });
};


const sendTokenDevice = async (id) => {
  try {
    const res = await apiResources.post("/clients/saveToken", {
      clientId: id,
      tokenDevice: tokenDevice.value
    }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
    alert(res)
  } catch (e) {
    console.log(e)
  }
}

const sendLogin = async () => {
  if (!password.value || !user.value) {
    return createToast(
      {
        title: "Error",
        description: "Llena todos los campos",
      },
      { type: "danger", timeout: 1500, hideProgressBar: true }
    );
  }

  try {
    const res = await apiAuth.post("/login", {
      username: user.value,
      password: password.value,

    });

    console.log(res)
    const { token, username, email, roles, id } = res.data;
    
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("roles", roles[0]);


    if (roles[0] === "ROLE_USER") {
      localStorage.setItem("idClient", res.data.clientId)
      sendTokenDevice(res.data.clientId)
    }



    if (res.status === 200) {
      return router.push({ name: 'main-log' })
      return nextPage();
    }
  } catch (e) {
    console.log();

    return createToast(
      {
        title: "Usuario no válido",
        description: "Revisa tus credenciales de acceso",
      },
      { type: "danger", timeout: 1500, hideProgressBar: true }
    );
  }
};
</script>

<style scoped>
.loader {
  border: 2px solid #f3f3f3;
  /* Light grey */
  border-top: 2px solid #3498db;
  /* Blue */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

button:disabled {
  background-color: red;
}


.login-form {
  max-width: 400px !important;
}
</style>