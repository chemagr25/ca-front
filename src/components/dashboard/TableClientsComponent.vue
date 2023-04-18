
<script>
import { ref } from "vue";
import DialogClients from "./DialogClientsComponent.vue";

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
    DialogClients,

  },
  props: {
    items: null,
  },
  emits: ['reload'],
  setup(props,ctx) {

    
    const pop = () => {
      ctx.emit('reload')
      
    }
    return {
   
      pop

    }

  },


};
</script>


<template>
  <div class="filters-search-add w-full maxwi mb-3 p-2 bg-white rounded-lg">
    <div class="main px-3 w-full flex items-center justify-between">
      <div class="add-service w-1/6 md:w-1/2 gap-1  ">
        <DialogClients @reload-table="pop"/>
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
    <div class="main-cont hidden sm:block w-full  justify-center   bg-white  p-5 rounded-lg">

      <div class="  overflow-x-auto w-full cont-table">
        <table class="table table-zebra w-full">
          <!-- head -->
          <thead>
            <tr>
              <td>id</td>
              <th>nombre</th>
              <th>Apellidos</th>
              <th>username</th>
              <th>correo</th>

              <th>Telefono</th>
              <th class="pl-8">Acciones</th>
            </tr>
          </thead>
          <tbody v-for=" (item,index) in items" :key="index">

          
            <tr>
              <td class="border-b text-sm capitalize">{{ index +1 }}</td>
              <td class="border-b text-sm capitalize">
                <div class="tooltip" :data-tip="item.name">
                  <div class="info">{{ item.name}} </div>
                </div>
              </td>
              <td class="border-b text-sm capitalize">
                <div class="tooltip" :data-tip="item.lastName">
                  <div class="info">{{ item.lastName }} </div>
                </div>
              </td>
              <td class="border-b text-sm capitalize">
                <div class="tooltip" >
                  <div class="info">{{ item.username }} </div>
                </div>
              </td>
              <td class="border-b text-sm ">
                <div class="tooltip" :data-tip="item.email">
                  <div class="info">{{ item.email }} </div>
                </div>
              </td>
             
              <td class="border-b  text-sm capitalize ">
                <div class="tooltip" :data-tip="'hola'">
                  <div class="info">{{ item.phone }} </div>
                </div>
              </td>
              <td class="border-b">
                <div class=" badge badge-ghost py-3">
                  <EyeIcon class="h-5 mr-2 w-5 text-indigo-900" /> <router-link
                    :to="{ name: 'clients-details', params: { id: item.id } }">Ver Detalles</router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>



      </div>

  



    </div>

    <div class="  cards-mobile flex flex-col wi mt-2 sm:hidden">
        <div v-for="(item, index) in items" :key="index">
          <div class="cards  px-4 py-2 w-full mt-6 flex flex-col bg-white rounded-lg shadow-lg">
            <div class="flex  w-full justify-between flex-row">
              <div >
                <p class="text-gray-500 text-sm">#</p>
                <p class="font-bold">{{ index + 1 }}</p>
              </div>
              <div class="date">
                <p class="text-gray-500 text-sm text-center">Teléfono</p>
                
                <p class="font-bold"> {{ item.phone }}</p>
              </div>

            </div>

            <div class="flex mt-3 w-full justify-between  flex-row">
              <div >
                <p class="text-gray-500 text-sm">Nombre</p>
                <div class="tooltip capitalize" :data-tip="item.name">
                <p class="info capitalize"> {{ item.name + ' ' + item.lastName }}</p>
                </div>
              </div>
              <div class="date">
                <p class="text-gray-500 text-sm">Username</p>
                <div class="tooltip" :data-tip="item.username">
                
                  <p class="info">{{ item.username }}</p>
                </div>
              </div>
            </div>
      
            <div class="flex  mt-4 mb-2 w-full justify-between items-center gap-8  flex-row">
              <div >
               
              </div>
              <div class="date">

                <div class=" badge badge-ghost py-3">
                  <EyeIcon class="h-5 mr-2 w-5 text-indigo-900" /> <router-link
                    :to="{ name: 'clients-details', params: { id: item.id } }">Ver Detalles</router-link>
                </div>
              </div>

            </div>







          </div>

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

.wi {
  width: 75%;
}
.info {
  max-width: 110px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


</style>




