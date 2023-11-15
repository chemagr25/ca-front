
<script setup>
import NavBar from "../../components/NavBarComponent.vue";
import { useRoute } from "vue-router";
import router from "../../router/router";

const goRoute = (name) => {

  router.push({name: `${name}`});


}

</script>


<template class="h-full  flex  ">
  <NavBar />

  <div class="pt-24">
    <router-view></router-view>
  </div>

  <div class="block sm:hidden">

    <v-layout class="overflow-visible" style="height: 56px;">
      <v-bottom-navigation v-model="value" color="teal" grow>
      
        <v-btn @click="goRoute('services') ">
          <v-icon>mdi-file-document-multiple-outline</v-icon>
          Servicios
        </v-btn>
        <v-btn @click="goRoute('techs') ">
          <v-icon>mdi-security</v-icon>
          Técnicos
        </v-btn>
        <v-btn @click="goRoute('clients') ">
          <v-icon>mdi-account-group</v-icon>
          Clientes
        </v-btn>
        <v-btn>
          <v-icon>mdi-account</v-icon>
          Cuenta
        </v-btn>
      </v-bottom-navigation>
    </v-layout>

  </div>
</template>
   
   
   