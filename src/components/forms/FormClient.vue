<template>
    <v-form v-model="form" @submit.prevent>
        <p class="mb-2">Añadir Cliente</p>
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field class="bg-gray-100 pb-2 rounded" v-model="firstName" label="Nombres(s)"
                    :rules="nameRules"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field class="bg-gray-100 pb-2 rounded" v-model="lastName" label="Apellidos"
                    :rules="nameRules"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field class="bg-gray-100 pb-2 rounded" v-model="phone" label="Numero de telefono" :counter="10"
                    :rules="phoneRules"></v-text-field>

            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field class="bg-gray-100 pb-2 rounded" v-model="email" label="Correo"
                    :rules="emailRules"></v-text-field>

            </v-col>


        </v-row>
        <div class="collapse bg-gray-100 mt-5 rounded collapse-plus">
            <input type="checkbox" />
            <div class="collapse-title collapse-plus text-xl font-medium">
                Elegir cliente ya existente
            </div>
            <div class="collapse-content">
                <v-autocomplete  v-model="autocomplete" no-data-text="No hay coincidencias" label="Cliente" class="bg-gray-100 pb-2 rounded"
                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-autocomplete>
            </div>
        </div>
        <v-row class=" w-11/12 ml-4 flex justify-between mt-5 items-center ">

            <button @click="sendData" :disabled="!form" block
                class="btn md:btn-sm bg-indigo-900 text-white  capitalize  font-normal">Agregar cliente</button>
            <button :disabled="!form"  block
                class="btn  md:btn-sm   bg-indigo-900 text-white  capitalize  font-normal">siguiente</button>
        </v-row>
    </v-form>

    <v-form>
        
    </v-form>
</template>


<script>
import { ref } from 'vue'
import {
    DocumentPlusIcon,
} from "@heroicons/vue/24/outline";

export default {
    components: {
        DocumentPlusIcon,
    },
    setup() {
        const form = ref(false)
        const email = ref(null)
        const password = ref(null)
        const loading = ref(false)
        const firstName = ref(null)
        const lastName = ref(null)
        const dialog = ref(true)
        const tab = ref(null)
        const phone = ref(null)
        const autocomplete = ref(null)





        const nameRules = ref([
            value => {
                if (!value) return 'Campo obligatorio'
                if (/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(value)) return true
                return 'Ingresa solo letras'
            },
        ])
        const phoneRules = ref([
            value => {
                if (!value) return 'Campo obligatorio'
                if (/^\d{10}$/.test(value)) return true
                return 'ingresa un numero de 10 digitos'
            },
        ])
        const emailRules = ref([
            value => {
                if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(value)) return true

                return 'Ingrese un correo valido'
            },
        ])





        const sendData = () => {
            console.log({ firstName: firstName.value, lastName: lastName.value, phone: phone.value });

        }

        return {
            email,
            form,
            loading,
            password,
            lastName,
            firstName,
            phone,
            tab,
            dialog,
            nameRules,
            phoneRules,
            emailRules,
            sendData,
            autocomplete,
        }
    },
}
</script>
