<script>

import { ref } from 'vue'
import apiResources from '../api/apiResources'
 
export default {
  props: {
  
  },
 
  setup(){

     const folioService = ref(null)
     const service = ref(null)



const getServiceByID = async() => {
    const response = await apiResources.get(`/services/search?invoice=${folioService.value}`)
    console.log(response)
    service.value = response.data

}






   //reactive data
    
    
   //methods
   
   //lifecyle hooks 'on'
   
     return {folioService, getServiceByID, service}
    
  }
}
</script>


<template>

  
<div class="  flex flex-col items-center justify-center w-full mt-16    ">
    <p class="text-xl">Buscar por folio</p>
    <input type="search"  v-model="folioService" name="text" class="bg-gray-200  mt-5 focus:outline-none text-gray-900 text-sm md:w-1/6 rounded-lg block  p-2.5" placeholder="Buscar">
<div  @click="getServiceByID" class="btn btn-sm my-2"> Buscar</div>
<div class="main flex w-full items-center flex-col" v-if="service">
    <ul class="steps w-full ">
  <li class="step step-primary">Recibido</li>
  <li class="step step-primary">Diagnostico</li>
  <li class="step step-primary">Proceso</li>
  <li class="step">Proceso</li>
  <li class="step">Entregado</li>
</ul>
<!-- <div class="main p-5 mt-5 w-1/5  border flex flex-col bg-gray-100 rounded-lg shadow-lg">
    <p>Folio</p>
    <p>{{ service.folio}}</p>
    <p>Descripcion</p>
    <p>{{ service.description }}</p>
    <p>Dispositivo</p>
    <p>{{ service.devices[0].brand + ' ' + service.devices[0].model }}</p>
    <p>Estatus</p>
    <p>{{ service.status }}</p>

</div> -->

<div class="cards maxwi  px-4 py-2 w-full mt-6 flex flex-col bg-white rounded-lg shadow-lg">
            <div class="flex  w-full justify-between flex-row">
              <div >
                <p class="text-gray-500 text-sm">Folio</p>
                <p class="font-bold">{{ service.folio ? service.folio : 'CA00000000' }}</p>
              </div>
              <div class="date">
                <p class="text-gray-500 text-sm text-center">Fecha</p>
                
                <p class="font-bold">{{ service.dateReceived ? service.dateReceived : 'No hay data' }}</p>
              </div>

            </div>

            <div class="flex mt-3 w-full justify-between  flex-row">
              <div >
                <p class="text-gray-500 text-sm">Nombre del cliente</p>

                <p class="info capitalize">{{service.client.name + ' ' +service.client.lastName }}</p>
              </div>
              <div class="date">
                <p class="text-gray-500 text-sm">Dispositivo</p>
                <p class="info">{{ service.devices[0] ? service.devices[0].brand + ' ' +
                service.devices[0].model : '' }}</p>
              </div>
            </div>
      
            <div class="flex  mt-4 mb-2 w-full justify-between items-center gap-8  flex-row">
              <div >
                <div 
                  class="badge py-3  text-white border-none">
                  {{ service.status ? service.status : 'No hay información' }}
                </div>
              </div>
              <div class="date">

               
              </div>

            </div>







          </div>

</div>
    




</div>
</template>


<style scoped>
.maxwi {
    max-width: 50%;
}
</style>