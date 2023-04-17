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
     const services = ref(null)
 
    
     
 
 
     const getServiceByClient = async() => {
         try { 
             const response = await apiResources.get(`/technicians/${id.value}`, {
                 headers: {
                         'Authorization': 'Bearer ' + localStorage.getItem('token')
                     }
 
             })
            
             services.value = response.data.services
             console.log(response.data)
         }catch (e) {
             console.log(e);
             
         }
     }
 
 
 
     getServiceByClient()
 
 
 
 
    //reactive data
     
    //methods
    
    //lifecyle hooks 'on'
    
      return {services}
     
   }
 }
 </script>
 