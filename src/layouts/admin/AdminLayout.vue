
<script setup>
import NavBarMobile from "../../components/mobile/NavBarComponent.vue";
import NavBarComponent from "../../components/NavBarComponent.vue";
import router from "../../router/router";

import { DocumentIcon,ShieldCheckIcon,UserGroupIcon } from "@heroicons/vue/24/outline";

const goRoute = (name) => {
  router.push({ name: `${name}` });
}

</script>


<template class="h-full  flex  ">
  <NavBarMobile class="lg:hidden" />
  <NavBarComponent class="hidden lg:block"/>
  <div class="pt-24 lg:pt-8">
  
    <router-view></router-view>
  </div>

  <div class="block lg:hidden">
    <v-layout class="overflow-visible" style="height: 56px;">
      <v-bottom-navigation color="teal" grow>
        <v-btn @click="goRoute('services')">
          <DocumentIcon class="w-4"></DocumentIcon>
          Servicios
        </v-btn>
        <v-btn @click="goRoute('techs')">
          <ShieldCheckIcon class="w-4"></ShieldCheckIcon>
          Técnicos
        </v-btn>
        <v-btn @click="goRoute('clients')">
          <UserGroupIcon class="w-4"></UserGroupIcon>
          Clientes
        </v-btn>
       
      </v-bottom-navigation>
    </v-layout>
  </div>
</template>
   
   
   