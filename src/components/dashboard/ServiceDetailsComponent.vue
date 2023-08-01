
<script>
import { ref } from "vue";
import apiResources from "../../api/apiResources";
import router from "../../router/router";
import Loader from "../LoaderComponent.vue";

export default {
  props: {
    idService: null,
  },
  components: { Loader },

  setup(props) {
    const service = ref(null);
    const img = ref(null);
    const dialog= ref( false);

    const getService = async () => {
      try {
        const resp = await apiResources.get(`/services/${props.idService}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        service.value = resp.data;

      } catch (e) {
        if (e.response.status === 401 || e.response.status === 403) {
          localStorage.clear();
          location.reload();
          return
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


    return { service, capitalize, getColor, img, dialog};
  },
};
</script>

<template>
  <div v-if="!service" class=" flex  justify-center">
    <Loader></Loader>
  </div>
  
  <div v-else class="w-full flex flex-col items-center  rounded-lg">

    <div class="w-full p-4 bg-white rounded-lg  main-cont maxwi flex">
      {{ service }} <br>
      {{ service.id }}
      {{ service.description }}
      {{ service.folio }}
      {{ service.folio }}
      {{ service.folio }}
      {{ service.folio }}

  



    </div>
  </div>


</template>





<style scoped>
img {
  width: 100%;
}
</style>