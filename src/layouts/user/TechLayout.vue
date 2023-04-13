
<script setup>
import NavBar from "../../components/NavBarComponent.vue";
</script>


<template class="h-full  flex flex-column ">
  <div class="nav w-full flex justify-center fixed px-3  mt-2">
    <NavBar class="" />

  </div>

  <div class="w-full main  p-5">
    <p>Tech Layout</p>
    <router-view class="  rounded-lg mt-20 "></router-view>
  </div>
</template>
   
   
   