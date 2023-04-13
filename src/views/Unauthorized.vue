<template>
    <main class="grid min-h-full place-items-center  py-24 px-6 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-6xl font-semibold text-indigo-900">403</p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"></h1>
        <p class="mt-6 text-base leading-7 text-gray-600">Lo sentimos, no tienes permisos para entrar a esta página</p>
        <p class="mt-6 text-base leading-7 text-gray-600">Usuario no autorizado o token de validación expirado</p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <p  @click="clearSession" class="rounded-md bg-indigo-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Regresar a inicio</p>
        </div>
      </div>
    </main>
  </template>



<script>

import { ref } from 'vue'
import router from '../router/router'
 
export default {
  props: {
  
  },
 
  setup(){

   //reactive data
     const name = ref()


     const clearSession = () =>  {


      localStorage.clear()
      router.push({name:'login'})
     }
    
   //methods
   
   //lifecyle hooks 'on'
   
     return {name, clearSession}
    
  }
}
</script>

  