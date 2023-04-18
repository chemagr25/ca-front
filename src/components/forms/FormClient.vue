<template>
    <v-form class="pb-8" v-model="form" @submit.prevent>
        <div class="titles w-100 flex items-center justify-center bg-indigo-900 text-white rounded p-3">
            <p class="font-bold  text-lg">Agregar cliente</p>
        </div>
        <v-row class=" mt-4">
          
            <v-col cols="12" sm="6" >
                <v-text-field clearable persistent-hint hint="Nombres del técnico" class="shadow bg-gray-100 pb-2 rounded"
                    :rules="nameRules" v-model="name" label="Nombre(s)"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" >
                <v-text-field clearable persistent-hint hint="Apellidos del técnico"
                :rules="nameRules" class="shadow bg-gray-100  pb-2 rounded" v-model="lastName" label="Apellidos"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" >

                <v-text-field clearable persistent-hint hint="nombre de ususario para iniciar sesión"
                  :rules="usernameRules"  class="shadow bg-gray-100  pb-2 rounded" v-model="username" label="Username"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" >
                <v-text-field clearable persistent-hint hint="Correo personal" class=" shadow bg-gray-100 pb-2 rounded"
                   :rules="emailRules" v-model="email" label="e-mail"></v-text-field>
            </v-col>
        
            <v-col cols="12" sm="6" >
                <v-text-field clearable persistent-hint hint="Número personal" class="shadow bg-gray-100 pb-2 rounded" v-model="phone"
                   :rules="phoneRules" counter="10" label="Teléfono"></v-text-field>
            </v-col>



        </v-row>
        <div class="buttons flex flex-row-reverse items-center mt-4">
            <div class="w-full flex justify-end ">
                <button :disabled="!form" @click="sendData" class="btn  bg-indigo-900  capitalize font-normal mt-2">Agregar cliente</button>
            </div>
            <div class="w-full ">
                <button @click="$emit('close')" class="btn   bg-indigo-900  capitalize font-normal mt-2">
                    cerrar
                </button>
            </div>

        </div>




    </v-form>

    <v-form>

    </v-form>
</template>


<script>
import { ref, watch, watchEffect } from 'vue'
import { filterClients, filterTechnicians } from '../../api/resources/getFilterNameClients'

import {
    DocumentPlusIcon,
} from "@heroicons/vue/24/outline";
import apiResources from '../../api/apiResources';
import swal from 'sweetalert';
import { createToast } from "mosha-vue-toastify";
import apiAuth from '../../api/apiAuth';


export default {
    components: {
        DocumentPlusIcon,
    },
    emits: ['close', 'newData'],
    setup(_, ctx) {




        const form = ref(false)
        const dialog = ref(true)
        const username = ref(null)
     
        const email = ref(null)
        const name = ref(null)
        const lastName = ref(null)
        const phone = ref(null)





        const setService = () => {
            return {
                "username": username.value,
                "email": email.value,
                "name": name.value,
                "lastName": lastName.value,
                "phone": phone.value
            }
        }

        const sendData = async () => {
            try {
                const resp = await apiAuth.post('/registerUser', setService(), {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }
                )
                createToast(
                    {
                        title: "Éxito",
                        description: "Usuario",
                    },
                    { type: "success", timeout: 1500, hideProgressBar: true }
                );
                ctx.emit('newData')
            } catch (e) {
                createToast(
                    {
                        title: "Error",
                        description: "Revisa los datos e inténtalo nuevamente",
                    },
                    { type: "danger", timeout: 3000, hideProgressBar: true }
                );

                console.log(e);

            }






        }


        const nameRules = ref([
            value => {
                if (!value) return 'Campo obligatorio'
                if (/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(value)) return true
                return 'Introduce solo letras'
            },
        ])
        const usernameRules = ref([
            value => {
                if (!value) return 'Campo obligatorio'
                if (/^\S+$/.test(value)) return true
                return 'sin espacios'
            },
        ])
        const phoneRules = ref([
            value => {
                if (!value) return 'Campo obligatorio'
                if (/^\d{10}$/.test(value)) return true
                return 'Numero a 10 digitos'
            },
        ])
        const emailRules = ref([
            value => {
                if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(value)) return true

                return 'Ingresa un correo valido'
            },
        ])















        return {
            nameRules,
            usernameRules,
            phoneRules,
            emailRules,

            form,
            dialog,
            sendData,
            form,
            dialog,
            username,
            email,
         
            name,
            lastName,
            phone,

        }
    },
}
</script>
