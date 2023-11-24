


<template>
  <h1 class="font-bold text-xl mt-24">Mis servicios</h1>

  <Loader v-if="!services" />

  <div v-else class="w-full card-cont  justify-start flex flex-wrap ">
   
    <div v-for="(item, index) in services" :key="index" class=" w-full md:w-1/3">
      <div class="cards md:max-wi  px-4 py-2 w-full mt-6 flex flex-col bg-white rounded-lg shadow-lg">
        <div class="flex  w-full justify-between flex-row">
          <div>
            <p class="text-gray-500 text-sm">Folio</p>
            <p class="font-bold"> {{ item.invoice }}</p>
          </div>
         
        </div>
    

        <div class="flex  mt-4 mb-2 w-full justify-between items-center gap-8  flex-row">
         
          <div class="date">

            <div class=" badge badge-ghost py-3">
              <EyeIcon class="h-5 mr-2 w-5 text-indigo-900" /> <router-link
                :to="{ name: 'services-details', params: { id: item.id } }">Ver Detalles</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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

 






})


const status = {
        RECIBIDO: { description: 'Recibido', color: 'bg-blue-500 '},
        REVISION: { description: 'Revisión', color: 'badge-success'},
        AUTORIZACION: { description: 'Autorización', color: 'badge-success'},
        PROCESO: { description: 'Proceso', color: 'bg-yellow-500 text-white'}, 
        COMPLETADO: { description: 'Completado', color: 'badge-success'}, 
        CANCELADO: { description: 'Cancelado', color: 'badge-error'}, 
        ENTREGADO: { description: 'Entregado', color: 'badge-success'}, 
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
