<template>
    <v-form class="pb-8" v-model="form" @submit.prevent>
        <div class="titles w-100 flex items-center justify-center bg-indigo-900 text-white rounded p-3">
            <p class="font-bold  text-lg">Agregar servicio</p>
        </div>
        <v-row class=" mt-4">
            <v-col cols="12" sm="6" md="4">
                <v-text-field clearable persistent-hint hint="Marca del dispositivo"
                    class="shadow bg-gray-100  pb-2 rounded"  label="Marca"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field persistent-hint hint="Modelo del dispositivo" class=" shadow bg-gray-100 pb-2 rounded"
                     label="Modelo"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field persistent-hint hint="S/N" class="shadow bg-gray-100 pb-2 rounded" 
                    label="Numero de serie"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field persistent-hint hint="Marca y modelo del procesador" class="shadow bg-gray-100 pb-2 rounded"
                     label="Procesador"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field persistent-hint hint="En GB" class="shadow bg-gray-100 pb-2 rounded" 
                    label="RAM"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field persistent-hint hint="En GB" class="shadow bg-gray-100 pb-2 rounded" 
                    label="Almacenamiento"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-textarea no-resize persistent-hint hint="Pantalla rota, etc... " class="shadow bg-gray-100"
                    label="Observaciones"></v-textarea>
            </v-col>
            <v-col cols="12" sm="6">
                <v-autocomplete persistent-hint hint="Elegir cliente " class="shadow rounded bg-gray-100"
                     no-data-text="No hay coincidencias" label="Cliente"
                    :items="['juan', 'jose', 'Maria', 'Georgia', 'Texas', 'Wyoming']"></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6">
                <v-autocomplete persistent-hint hint="Elegir técnico" class="shadow rounded bg-gray-100"
                     no-data-text="No hay coincidencias" label="Tecnico"
                    :items="['juan', 'jose', 'Maria', 'Georgia', 'Texas', 'Wyoming']"></v-autocomplete>
            </v-col>
            <v-col cols="12">
                <v-textarea no-resize heigth="5" persistent-hint class="shadow rounded bg-gray-100"
                    hint="Decripcion del servicio" label="Descripción del servicio"></v-textarea>
            </v-col>
        </v-row>
        <v-row class=" w-11/12 ml-4 flex justify-end mt-5 items-center ">
        </v-row>
        <div class="w-full flex justify-end">
            <button class="btn  bg-indigo-900  capitalize font-normal mt-2">Agregar servicio</button>
        </div>

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
        const dialog = ref(true)
        const description = ref(null)
        const brand = ref(null)
        const model = ref(null)
        const serialNumber = ref(null)
        const processor = ref(null)
        const ram = ref(null)
        const storage = ref(null)
        const observations = ref(null)
        const client = ref(null)
        const technician = ref(null)
        const price = ref(0)






        // const nameRules = ref([
        //     value => {
        //         if (!value) return 'Campo obligatorio'
        //         if (/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(value)) return true
        //         return 'Introduce solo letras'
        //     },
        // ])
        // const phoneRules = ref([
        //     value => {
        //         if (!value) return 'Campo obligatorio'
        //         if (/^\d{10}$/.test(value)) return true
        //         return ''
        //     },
        // ])
        // const emailRules = ref([
        //     value => {
        //         if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(value)) return true

        //         return ''
        //     },
        // ])

        const sendData = () => {
            

        }

        return {
        
            form,
            dialog,
            sendData,
        }
    },
}
</script>
