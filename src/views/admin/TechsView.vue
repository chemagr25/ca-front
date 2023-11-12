
<script>
import { ref } from "vue";

import TableTechs from "../../components/dashboard/TableTechsComponent.vue";
import Loader from "../../components/LoaderComponent.vue";
import apiResources from "../../api/apiResources";


export default {
  components: {
    TableTechs,
    Loader
  },

  props: {},

  setup() {
    const allTechs = ref(null);
    const totalPages = ref()
    const page = ref(0)

    const getPage = async(n) => {
      page.value = n -1
      allTechs.value = null
      await setTechs()
      
    }


    const setTechs = async () => {

      try {
        const techs = await apiResources.get(`/technicians?pageSize=10&pageNumber=${page.value}&sortBy=name`,{
            
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    
        })
        totalPages.value =  techs.data.totalPages
        allTechs.value = techs.data.content;
   
      }catch (e){
        console.log(e)
        localStorage.clear()
        window.location.reload()
      }
    };
    setTechs()
    return { 
      allTechs,
      setTechs,
      totalPages,
      getPage };
  },
};
</script>

<template >
  <div class="main w-full flex flex-col  items-center ">

    <Loader v-if="!allTechs" />
    <TableTechs @reload="setTechs" v-else  @changepage="getPage"  :totalPages="totalPages" :items="allTechs" />
  </div>
</template>
