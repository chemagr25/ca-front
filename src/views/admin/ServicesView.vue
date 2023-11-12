
<script>
import { ref } from "vue";

import TableServices from "../../components/dashboard/TableServicesComponent.vue";
import Loader from "../../components/LoaderComponent.vue";
import apiResources from "../../api/apiResources";


export default {
  components: {
    TableServices,
    Loader
  },
  setup() {
    const allServices = ref(null);
    const page = ref(0)
    const totalPages = ref()

    const getPage = async(n) => {
      page.value = n -1
      allServices.value = null
      await setServices() 
    }


    const setServices = async () => {
      try {
        const services =  await apiResources.get(`/services?pageSize=10&pageNumber=${page.value}&sortBy=id`,  {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })

        
        allServices.value = services.data.content;
        totalPages.value = services.data.totalPages



      }catch (e){
        // localStorage.clear()
        // window.location.reload()
      }
  
    };


    setServices()

    return { allServices,setServices,getPage, totalPages };
  },
};
</script>



<template >
  <div class="main w-full flex flex-col  items-center ">

    <Loader v-if="!allServices" />
    <TableServices v-else :totalPages="totalPages" @changepage="getPage"  @reload="setServices"  :items="allServices" />
  </div>
</template>
