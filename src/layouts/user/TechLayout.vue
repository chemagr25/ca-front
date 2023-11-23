
<script setup>
import NavBar from "../../components/mobile/NavBarComponent.vue";
</script>


<template class="h-full  flex flex-column ">
  <div class="nav w-full flex justify-center  px-3  mt-2">
    <NavBar />

  </div>

  <div class="w-full main  p-5">
    <router-view  ></router-view>
  </div>
</template>
   
   
   