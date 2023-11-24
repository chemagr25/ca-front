


<template>
  <h1 class="font-bold text-xl">Mis servicios</h1>


  <p class="mt-6">hola {{ tokenDevice }} jejejej</p>

  <Loader v-if="!services" />





  <!-- <div v-else class="w-full card-cont  justify-around flex flex-wrap ">
    <div v-for="(item, index) in services" :key="index" class=" w-4/5 md:w-auto">
      <div class="cards md:max-wi  px-4 py-2 w-full mt-6 flex flex-col bg-white rounded-lg shadow-lg">
        <div class="flex  w-full justify-between flex-row">
          <div>
            <p class="text-gray-500 text-sm">Folio</p>
            <p class="font-bold">{{ item.folio ? item.folio : 'CA00000000' }}</p>
          </div>
          <div class="date">
            <p class="text-gray-500 text-sm text-center">Fecha</p>
            <p class="font-bold">{{ item.dateReceived ? item.dateReceived : 'No hay data' }}</p>
          </div>
        </div>
        <div class="flex mt-3 w-full justify-between  flex-row">

          <div class="date">
            <p class="text-gray-500 text-sm">Dispositivo</p>
            <p class="info">{{ item.devices[0] ? item.devices[0].brand + ' ' +
              item.devices[0].model : '' }}</p>
          </div>
        </div>

        <div class="flex  mt-4 mb-2 w-full justify-between items-center gap-8  flex-row">
          <div>
            <div :class="styleBadge(item.status ? item.status : 'badge-ghost')"
              class="badge py-3  text-white border-none">
              {{ item.status ? statusFormat(item.status) : 'No hay información' }}
            </div>
          </div>
          <div class="date">

            <div class=" badge badge-ghost py-3">
              <EyeIcon class="h-5 mr-2 w-5 text-indigo-900" /> <router-link
                :to="{ name: 'services-details', params: { id: item.id } }">Ver Detalles</router-link>
            </div>
          </div>
        </div>
      </div>

    </div>


  </div> -->
</template>

<style scoped>
.max-wi {
  max-width: 300px;
}
</style>






<script setup >

import { onMounted, ref } from 'vue'
import apiResources from '../../api/apiResources'

import { PushNotifications } from '@capacitor/push-notifications';
import Loader from '../../components/LoaderComponent.vue';
import {
  EyeIcon,
} from "@heroicons/vue/24/outline";



const id = ref(localStorage.getItem('idClient'))

const services = ref(null)

const tokenDevice = ref()



onMounted(async () => {


  await getServiceByClient()

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
    console.log(e)
  })


  const sendToken = () => {
    apiResources.post(`/clients/saveToken`, {
      clientId: id.value,
      tokenDevice: tokenDevice.value
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then((res) => {
      alert('Token guardado')
    }).catch((e) => {

    
      console.log()
    })
  }


  sendToken()

})



const statusFormat = (status) => {
  if (status === 'RECIBIDO') {
    return 'Recibido'
  }
  if (status === 'REVISION') {
    return 'En Revisión'
  }
  if (status === 'CANCELADO') {
    return 'Cancelado'
  }
  if (status === 'PROCESO') {
    return 'En proceso'
  }

}

const styleBadge = (status) => {
  if (status === 'RECIBIDO') {
    return 'badge-success'
  }
  if (status === 'REVISION') {
    return 'badge-warning'
  }
  if (status === 'CANCELADO') {
    return 'badge-error'
  }
}
const getServiceByClient = async () => {
  try {
    const response = await apiResources.get(`/clients/${id.value}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })

    services.value = response.data.services

  } catch (e) {
    servives.value = []
    console.log(e);

  }
}









</script>
