
<script>
import { ref } from "vue";

import TableClients from "../../components/dashboard/TableClientsComponent.vue";
import getAllClients from "../../api/resources/getAllClients";
import Loader from "../../components/LoaderComponent.vue";


export default {
  components: {
    TableClients,
    Loader
  },

  props: {},

  setup() {
    const allClients = ref(null);



    const setClients = async () => {

      try {
        const clients = await getAllClients();
        
        allClients.value = clients.data.content;
        console.log(clients.data);
     


      }catch (e){
        // localStorage.clear()
        // window.location.reload()
      }
     

    };


    setClients()

    


    return { allClients,setClients };
  },
};
</script>



<template >
  <div class="main w-full flex flex-col  items-center ">

    <Loader v-if="!allClients" />
    <TableClients v-else @reload="setClients" 
     :items="allClients" />
  </div>
</template>
