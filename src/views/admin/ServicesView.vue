
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
      const services = await getAllServices();
      allServices.value = services.data.content;
     
      
    };


    setServices()

   
    return {allServices};
  },
};
</script>



<template >
  <div class="main ">


<TableServices :items="allServices"/>



  </div>
</template>
