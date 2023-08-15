
<template class="h-full">

  <router-view></router-view>
  <p class="text-black">{{ token }}</p>
</template>


<script >
import { PushNotifications } from '@capacitor/push-notifications';
import {onMounted, ref} from 'vue'

export default {
  setup () {

    const token = ref('')

    onMounted(()=> {
    PushNotifications.addListener('registration', (tokendevice) => {
      token.value = tokendevice
    }).catch((e) => {
      console.log()
    })

    PushNotifications.register().catch((e) => {
      console.log()
    })


    })
   
  
    return {token}

  }
}

</script>

<style  scoped>

</style>