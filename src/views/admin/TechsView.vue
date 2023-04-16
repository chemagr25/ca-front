
<script>
import { ref } from "vue";

import TableTechs from "../../components/dashboard/TableTechsComponent.vue";
import getAllTechs from "../../api/resources/getAllTechs";
import Loader from "../../components/LoaderComponent.vue";


export default {
  components: {
    TableTechs,
    Loader
  },

  props: {},

  setup() {
    const allTechs = ref(null);



    const setTechs = async () => {

      try {
        const techs = await getAllTechs();
        
        allTechs.value = techs.data.content;
        console.log(techs.data);
     


      }catch (e){
        // localStorage.clear()
        // window.location.reload()
      }
     

    };


    setTechs()

    


    return { allTechs,setTechs };
  },
};
</script>



<template >
  <div class="main w-full flex flex-col  items-center ">

    <Loader v-if="!allTechs" />
    <TableTechs @reload="setTechs" v-else :items="allTechs" />



  </div>
</template>
