
<script>
import { ref } from "vue";

import TableClients from "../../components/dashboard/TableClientsComponent.vue";
import Loader from "../../components/LoaderComponent.vue";
import apiResources from "../../api/apiResources";


export default {
  components: {
    TableClients,
    Loader
  },

  setup() {
    const allClients = ref(null);

    const page = ref(0)
    const totalPages = ref()

    const getPage = async(n) => {
      console.log(page.value)
      page.value = n -1
      allClients.value = null
      await setClients()
    }




    const setClients = async () => {

      try {
        const clients = await await apiResources.get(`/clients/all?pageNumber=${page.value}`,  {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      totalPages.value = clients.data.totalPages
        allClients.value = clients.data.content;
      }catch (e){
        console.log(e)
        localStorage.clear()
        window.location.reload()
      }
     

    };


    setClients()
    return { allClients,setClients, getPage, totalPages };
  },
};
</script>



<template >
  <div class="main w-full flex flex-col  items-center ">

    <Loader v-if="!allClients" />
    <TableClients v-else
     :totalPages="totalPages" @changepage="getPage"    @reload="setClients" 
     :items="allClients" />
  </div>
</template>
