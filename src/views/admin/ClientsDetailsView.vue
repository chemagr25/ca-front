<script >

import ClientsDetailsComponent from "../../components/dashboard/ClientsDetailsComponent.vue";
import Loader from "../../components/LoaderComponent.vue";
import { ref } from "vue";

import { useRoute } from "vue-router";

export default {
  components: {
    ClientsDetailsComponent,
    Loader

  },
  setup() {
    const service = ref( useRoute().params.id) 
    return {
      service
    }
  },
};
</script>

<template >
  <div class="w-full flex-col flex justify-center items-center h-full">
    <div  class="cont-main w-full rounded-lg">
      <ClientsDetailsComponent :idService="service"/>
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
