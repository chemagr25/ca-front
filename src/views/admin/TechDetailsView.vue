<script >

import TechsDetailsComponent from "../../components/dashboard/TechsDetailsComponent.vue";
import Loader from "../../components/LoaderComponent.vue";
import { ref } from "vue";

import { useRoute } from "vue-router";

export default {
  components: {
    TechsDetailsComponent,
    Loader

  },
  setup() {

    const service = ref(null)
    service.value = useRoute().params.id
    
    return {
      service
    }
  },
};
</script>

<template >
  <div class="w-full flex-col flex justify-center items-center h-full">
    <!-- <Loader  class="hidden"/> -->

    <div  class="cont-main w-full rounded-lg">
      <TechsDetailsComponent :idService="service"/>
      

   
    </div>
  </div>
</template>
<style scoped>
.chip {
  padding: 4px 15px;
}

svg {
  width: 30px !important;
}

.pname {
  max-width: 20ch;
}

.table,
.pag {
  max-width: 1500px;
}

.cont-main {
  max-width: 1700px;
}
</style>
