
<script>
import { ref } from "vue";
import Dialog from "./DialogServicesComponent.vue";

import {
  ClipboardDocumentCheckIcon,
  DocumentPlusIcon,
  XMarkIcon,
  FunnelIcon,
  EyeIcon,
} from "@heroicons/vue/24/outline";

export default {
  components: {
    ClipboardDocumentCheckIcon,
    DocumentPlusIcon,
    XMarkIcon,
    EyeIcon,
    FunnelIcon,
    Dialog,

  },
  props: {
    items: null,
    totalPages: 0,
  },
  emits: ['reload', 'changepage'],
  setup(props, ctx) {

    const status = {
        RECIBIDO: { description: 'Recibido', color: 'bg-blue-500 '},
        REVISION: { description: 'Revisión', color: 'badge-success'},
        AUTORIZACION: { description: 'Autorización', color: 'badge-success'},
        PROCESO: { description: 'Proceso', color: 'bg-yellow-500 text-white'}, 
        COMPLETADO: { description: 'Completado', color: 'badge-success'}, 
        CANCELADO: { description: 'Cancelado', color: 'badge-error'}, 
    }

    const pop = () => {
      ctx.emit('reload')
    }

    return {
      pop,
      status

    }

  },

};
</script>


<template>
  <div class="filters-search-add w-full maxwi mb-3 p-2 rounded-lg">
    <div class="main px-3 w-full flex items-center justify-between">
      <div class="add-service w-1/6 md:w-1/2 gap-1  ">
        <Dialog @reload-table="pop" />
      </div>
    </div>
  </div>
  <div class="root  flex justify-center items-center flex-col w-full ">
    <div class=" main-cont w-full flex justify-center   md:bg-white  p-5 rounded-lg">

      <div class=" hidden sm:block overflow-x-auto w-full cont-table">
        <div class="w-full justify-center text-lg font-bold flex  " v-if="items.length < 1 "> <p>No Data</p></div>
        <table v-else class="table table-zebra w-full">
          <thead>
            <tr>
              <td>Folio</td>
              <th>cliente</th>
              <th>Dispositivo</th>
              <th>Tecnico</th>
              <th class="pl-8">Estado</th>
              <th class="pl-8">Acciones</th>
            </tr>
          </thead>
          <tbody v-for=" (item, index) in items" :key="index">
            <tr>
              <td class="border-b text-sm capitalize">{{ item.invoice ? item.invoice : 'CA00000000' }}</td>
              <td class="border-b text-sm capitalize">
                <div class="tooltip" :data-tip="item.client.name + ' ' + item.client.lastName">
                  <router-link :to="{ name: 'clients-details', params: { id: item.client.id } }"> {{ item.client.name + ' ' + 
                  item.client.lastName }}</router-link>
                </div>
              </td>
              <td class="border-b text-sm capitalize">{{ item.device.brand }} {{ item.device.model }}</td>
              <td class="border-b  text-sm capitalize ">
                <div class="tooltip" :data-tip="item.technician.name">
                  <router-link :to="{ name: 'techs-details', params: { id: item.technician.id } }"> {{
                    item.technician.name + ' ' + item.technician.lastName }}</router-link>
                </div>
              </td>
              <td class="border-b text-sm capitalize ">
                <div :class="status[item.status].color"
                  class="badge py-3  text-white border-none">
                  {{ status[item.status].description }}
                </div>
              </td>
              <td class="border-b">
                <div class=" badge badge-ghost py-3">
                  <EyeIcon class="h-5 mr-2 w-5 text-indigo-900" /> <router-link
                    :to="{ name: 'services-details', params: { id: item.id } }">Ver Detalles</router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class=" -mt-8 cards-mobile flex flex-col wi sm:hidden">
        <div class="w-full justify-center text-lg font-bold flex mt-8  " v-if="items.length < 1 "> <p>No data</p></div>

        <div v-for="(item, index) in items" :key="index">
          <div class="cards  px-4 py-2 w-full mt-6 flex flex-col bg-white rounded-lg shadow-lg">
            <div class="flex  w-full justify-between flex-row">
              <div >
                <p class="text-gray-500 text-sm">Folio</p>
                <p class="font-bold">{{ item.invoice || 'CA000000' }}</p>
              </div>
              <div class="date">
                <p class="text-gray-500 text-sm text-center">Fecha</p>
                
                <p class="font-bold">{{ item.dateReceived || 'No hay data' }}</p>
              </div>

            </div>

            <div class="flex mt-3 w-full justify-between  flex-row">
              <div >
                <p class="text-gray-500 text-sm">Nombre del cliente</p>

                <p class="info capitalize">{{ item.client.name + ' ' + item.client.lastName }}</p>
              </div>
              <div class="date">
                <p class="text-gray-500 text-sm">Dispositivo</p>
                <p class="info">{{ item.device.brand }} {{ item.device.model }}</p>
              </div>
            </div>
      
            <div class="flex  mt-4 mb-2 w-full justify-between items-center gap-8  flex-row">
              <div >
                <div :class="status[item.status].color"
                  class="badge py-3  text-white border-none">
                  {{ status[item.status].description }}
                </div>
              </div>
              <div class="date">

                <div class=" badge badge-ghost py-3">
                  <router-link
                  
                    :to="{ name: 'services-details', params: { id: item.id } }"> <EyeIcon class="h-5  w-5  text-indigo-900" /> <p class="hidden md:block">Ver detalles</p> </router-link>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>



    </div>


    <div class="pag flex text-black justify-center  mb-2  rounded-lg p-2 w-full ">
      <div class="btn-group">
        <button v-for="(item) in totalPages" class="mx-1 btn btn-outline border"  @click="$emit('changepage', item  )">{{  item }}  </button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.img-item {
  height: 180px;

}

.cont-table,
.main-cont,
.maxwi {

  max-width: 1400px;
}

.wi {
  width: 95%;
}

.info {
  max-width: 110px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>




