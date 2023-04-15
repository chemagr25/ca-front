
<script>
import { ref } from "vue";
import FormService from "./DialogServicesComponent.vue";

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
    FormService,

  },
  props: {
    items: null,
  },
  setup(props) {

    

    const statusFormat = (status) => {
      if (status === 'RECIBIDO') {
        return 'Recibido'
      }
      if (status === 'EN_PROCESO') {
        return 'En proceso'
      }
      if (status === 'FINISHED') {
        return 'Finalizado'
      }

    }

    const styleBadge = (status) => {
      if (status === 'RECIBIDO') {
        return 'badge-success'
      }
      if (status === 'EN_PROCESO') {
        return 'badge-warning'
      }
      if (status === 'FINISHED') {
        return 'badge-success'
      }
    }

    return {
      statusFormat,
      styleBadge,

    }

  },


};
</script>


<template>
  <div class="filters-search-add w-full maxwi mb-3 p-2 bg-white rounded-lg">
    <div class="main px-3 w-full flex items-center justify-between">
      <div class="add-service w-1/6 md:w-1/2 gap-1  ">
        <FormService />
      </div>

      <div class=" w-5/6 md:w-1/4 p flex items-center ">
        <div class="dropdown ml-auto">
          <label tabindex="0" class="btn border-none bg-white m-1">
            <FunnelIcon class="text-black w-7 " />
          </label>
          <ul tabindex="0" class="dropdown-content  menu p-2 shadow bg-white rounded-box w-52">
            <p class="hover:bg-gray-100 px-3 py-1 rounded">Recibido</p>
            <p class="hover:bg-gray-100 px-3 py-1 rounded">En proceso</p>
            <p class="hover:bg-gray-100 px-3 py-1 rounded">Cancelado</p>
          </ul>
        </div>
        <input type="text" placeholder="Buscar" class="input bg-gray-100 input-bordered input-sm h-12 w-full " />
      </div>

    </div>
  </div>
  <div class="root  flex justify-center items-center flex-col w-full ">
    <div class="main-cont w-full flex justify-center   bg-white  p-5 rounded-lg">

      <div class=" hidden md:block overflow-x-auto w-full cont-table">
        <table class="table table-zebra w-full">
          <!-- head -->
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
          <tbody v-for=" (item,index) in items" :key="index">
            <!-- row 1 -->
            <tr>
              <td class="border-b text-sm capitalize">{{ item.id }}</td>
              <td class="border-b text-sm capitalize">
                <div class="tooltip" :data-tip="item.client.username">
                  <div class="info">{{ item.client.username }} </div>
                </div>
              </td>
              <td class="border-b text-sm capitalize">{{ item.devices[0] ? item.devices[0].brand + ' ' +
                item.devices[0].model : '' }}</td>
              <td class="border-b  text-sm capitalize ">
                <!-- <div class="info"> {{ item.technicians.name }} maria GArcia Ramirez GArcia Ramirez</div> -->
                <div class="tooltip" :data-tip="item.technicians.name">
                  <div class="info">{{ item.technicians.name }} </div>
                </div>
              </td>
              <td class="border-b text-sm capitalize ">
                <div :class="styleBadge(item.status ? item.status : 'badge-ghost')"
                  class="badge py-3  text-white border-none">
                  {{ item.status ? statusFormat(item.status) : 'No hay información' }}
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

      <div class="w-full border md:hidden ">


      </div>



    </div>


    <div class="pag flex text-black justify-center bg-white maxwi mt-4 rounded-lg p-2 w-full ">
      <div class="btn-group">
        <button class="mx-1 btn btn-outline border">1</button>
        <button class="mx-1 btn btn-outline border ">2</button>
        <button class="mx-1 btn btn-outline border">3</button>
        <button class="mx-1 btn btn-outline border">4</button>



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

.info {
  max-width: 110px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


</style>




