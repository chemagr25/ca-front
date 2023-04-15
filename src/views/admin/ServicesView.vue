
<script>
import { ref } from "vue";

import TableServices from "../../components/dashboard/TableServicesComponent.vue";
import getAllServices from "../../api/resources/getAllServices";
import Loader from "../../components/LoaderComponent.vue";


export default {
  components: {
    TableServices,
    Loader
  },

  props: {},

  setup() {
    const allServices = ref(null);


    const setServices = async () => {

      try {
        const services = await getAllServices();
        allServices.value = services.data.content;


      }catch (e){
        localStorage.clear()
        window.location.reload()
      }
     

    };


    setServices()


    return { allServices,setServices };
  },
};
</script>



<template >
  <div class="main w-full flex flex-col  items-center ">

    <Loader v-if="!allServices" />
    <TableServices @reload="setServices" v-else :items="allServices" />



  </div>
</template>
