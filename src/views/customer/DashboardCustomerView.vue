<template>
   <p>{{ services }}</p>
</template>






<script>

import { ref } from 'vue'
import apiResources from '../../api/apiResources'
export default {
  props: {
  
  },
 
  setup(){
    
    const id = ref(localStorage.getItem('id'))


    const getServiceByClient = () => {
        try { 
            const response = apiResources.get(`/clienst/${id.value}`)
            console.log(response)
        }catch (e) {
            console.log(e);
            
        }
    }


    getServiceByClient()



    const services = ref(null)

   //reactive data
    
   //methods
   
   //lifecyle hooks 'on'
   
     return {services}
    
  }
}
</script>
