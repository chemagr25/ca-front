
<script>
import { ref } from "vue";

import TableServices from "../../components/dashboard/TableServicesComponent.vue";
import getAllServices from "../../api/resources/getAllServices";
import Loader from "../../components/LoaderComponent.vue";
import apiResources from "../../api/apiResources";


export default {
  components: {
    TableServices,
    Loader
  },

  props: {},

  setup() {
    const allServices = ref(null);
    const page = ref(0)

    const getPage = async(n) => {
      page.value = n -1
      allServices.value = null
      await setServices()
      
    }


    const setServices = async () => {

      try {
        const services =  await apiResources.get(`/services/all?pageNumber=${page.value}`,  {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
        allServices.value = services.data.content;

       
        


      }catch (e){
        localStorage.clear()
        window.location.reload()
      }
     

    };


    setServices()


    return { allServices,setServices,getPage };
  },
};
</script>



<template >
  <div class="main w-full flex flex-col  items-center ">

    <Loader v-if="!allServices" />
    <TableServices @changepage="getPage"  @reload="setServices" v-else :items="allServices" />

  </div>
</template>
