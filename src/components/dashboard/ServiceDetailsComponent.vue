
<script>
import { ref } from "vue";
import apiResources from "../../api/apiResources";
import router from "../../router/router";
import Valoration from "../ValorationComponent.vue";

import Loader from "../LoaderComponent.vue";
import Rate from "./RateComponent.vue";
import ValorationComponent from "../ValorationComponent.vue";

export default {
  props: {
    idService: null,
  },
  components: { Loader, Valoration, ValorationComponent },

  setup(props) {
    //reactive data
    const service = ref(null);
    const img = ref(null);

    const getService = async () => {
      try {
        const resp = await apiResources.get(`/services/${props.idService}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        service.value = resp.data;
        img.value = resp.data.comments[0].pathFile
        
    
      } catch (e) {
        if (e.response.status === 401 || e.response.status === 403) {
          localStorage.clear();
          location.reload();
          return;
        }
        if (e.response.status === 404) {
          return router.push({ name: "notFound" });
        }
      }
    };

    getService();

    const capitalize = (str) => {
      return str.replace(/\w\S*/g, (w) =>
        w.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())
      );
    };
    const getColor = (status) => {
      if (status === "En_proceso") return "bg-yellow-100 text-yellow-800";
      if (status === "Recibido") return "bg-blue-100 text-blue-800";
      if (status === "Completada") return "bg-green-100 text-green-800";
      if (status === "Cancelada") return "bg-red-100 text-red-800";
      if (status === null) return "bg-red-100 text-red-800";
    };


    return { service, capitalize, getColor,img };
  },
};
</script>

<template>
  <div v-if="!service" class=" flex  justify-center">
    <Loader></Loader>
  </div>
  <div v-else class=" w-full   flex flex-col items-center  rounded-lg">

    <div class="w-full p-4 bg-white rounded-lg  main-cont maxwi flex">
      <div class="content w-full  flex flex-col md:flex-row">

        <div class="img-cont  h-full md:w-1/2 flex items-center  justify-center md:justify-normal">
          <div class="first-img h-48  md:h-5/6 w-1/2  rounded-lg   ">
            <img :src="img+''" alt="">

          </div>

        </div>
        <div class="details-cont w-full flex rounded-lg flex-col mt-2 p-2">
          <div class="data-received flex bg-gray-50 rounded p-2 justify-between ">
            <div>
              <p>Folio</p>
              <p>{{ service.folio ? service.folio : 'CA000000000' }}</p>
            </div>
            <div>
              <p>Estado</p>
              <p>{{ service.status }}</p>
            </div>

            <div class="date text-center">
              <p>Fecha</p>
              <p class="text-center">{{ service.dateReceived ? service.dateReceived : 'NA' }}</p>
            </div>

          </div>

          <div class="data-received   bg-gray-50 rounded p-2 justify-between flex  mt-3  ">
            <div>
              <p>Cliente</p>
              <p class="" >{{ service.client ? service.client.name + ' ' + service.client.lastName : 'No hay data' }}</p>
            </div>
            <div>
              <p class="text-center">Dispositivo</p>
              <p class="text-center">{{ service.devices[0] ? service.devices[0].brand + ' ' + service.devices[0].model :
                'NO hay data' }}</p>

            </div>
            <div>
              <p>Técnico</p>
              <p class="text-center">{{ service.technicians ? service.technicians.name + ' ' +  service.technicians.lastName : 'No hay data'  }}</p>

            </div>
          </div>

          <div class="data-received flex-col md:flex-row-reverse items-center justify-between bg-gray-50 rounded p-2  flex  mt-3  ">

            <div class=" text-center mr-8">
              <p class="">Partes requeridas</p>
              <p class="">Ver partes > </p>

            </div>
            <div class=" mt-2 max-w-xs md:mt-0">
              <p class=" break-words  max-w-xs">Descripción</p>
              <p class="break-words">{{ service.description }}</p>

            </div>
          </div>
          <div class=" bg-gray-50 mt-2  flex flex-col md:flex-row-reverse items-center justify-between rounded-lg">

            <div class="  w-full flex mt-3 md:mt-1 justify-center md:justify-end">
              <button class="btn btn-sm bg-indigo-900">Ver comentarios </button>
            </div>

            <div class="val w-1/2 ">
              <Valoration cant="5" />

            </div>
         
          </div>


        </div>
      </div>


    </div>
  </div>
</template>





<style scoped>
img {
  width: 100%;
}

</style>