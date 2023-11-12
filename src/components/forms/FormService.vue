<template>
    <v-form class="pb-8" v-model="form" @submit.prevent>
        <div class="titles w-100 flex items-center justify-center bg-indigo-900 text-white rounded p-3">
            <p class="font-bold  text-lg">Agregar servicio</p>
        </div>
        <v-row class=" mt-4">
            <v-col cols="12" sm="6" md="4">
                <v-text-field clearable persistent-hint hint="Marca del dispositivo"
                    class="shadow bg-gray-100  pb-2 rounded" :rules="brandRules" v-model="brand"
                    label="Marca"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field clearable persistent-hint hint="Modelo del dispositivo" :rules="brandRules"
                    class=" shadow bg-gray-100 pb-2 rounded" v-model="model" label="Modelo"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field clearable persistent-hint hint="S/N" :rules="brandRules"
                    class="shadow bg-gray-100 pb-2 rounded" v-model="serialNumber" label="Numero de serie"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field clearable persistent-hint hint="Marca y modelo del procesador" :rules="brandRules"
                    class="shadow bg-gray-100 pb-2 rounded" v-model="processor" label="Procesador"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field clearable persistent-hint hint="En GB" :rules="numRules"
                    class="shadow bg-gray-100 pb-2 rounded" v-model="ram" label="RAM"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field clearable persistent-hint hint="En GB" :rules="numRules"
                    class="shadow bg-gray-100 pb-2 rounded" v-model="storage" label="Almacenamiento"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-textarea clearable no-resize persistent-hint hint="Pantalla rota, etc... " class="shadow bg-gray-100"
                    v-model="observations" :rules="brandRules" label="Observaciones del dispositivo"></v-textarea>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field clearable persistent-hint hint="Elegir cliente " v-model="client"
                    class="shadow rounded bg-gray-100" label="Cliente"></v-text-field>
                <div v-if="clientsSuggestions && clientsSuggestions.length > 0"
                    class="inset w-full mt-2 rounded  border shadow-xl px-3 bg-white p-2">
                    <div v-for="item in clientsSuggestions " :key="item.id">
                        <p @click="selectClient(item.name + ' ' + item.lastName, item.id)" class="border-b py-1 "> {{
                            item.name + ' ' + item.lastName }} </p>


                    </div>
                </div>
            </v-col>

            <v-col cols="12" sm="6">
                <v-text-field clearable persistent-hint hint="Elegir técnico" v-model="technician"
                    class="shadow rounded bg-gray-100" label="Tecnico"></v-text-field>
                <div v-if="items && items.length > 0" class="inset w-full mt-2 rounded  border shadow-xl px-3 bg-white p-2">
                    <div v-for="item in items " :key="item.id">
                        <p @click="selectTech(item.name + ' ' + item.lastName, item.id)" class="border-b py-1 ">{{ item.name
                            + ' ' + item.lastName }} </p>


                    </div>
                </div>
            </v-col>
            <v-col cols="12">
                <v-textarea clearable :rules="brandRules" no-resize v-model="description" heigth="5" persistent-hint
                    class="shadow rounded bg-gray-100" hint="Decripcion del servicio"
                    label="Descripción del servicio"></v-textarea>
            </v-col>
        </v-row>
        <div class="buttons flex flex-row-reverse items-center mt-4">
            <div class="w-full flex justify-end ">
                <button @click="sendData" :disabled="!form"
                    class="btn  : bg-indigo-900  capitalize font-normal mt-2">Agregar servicio</button>
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


export default {
    components: {
        DocumentPlusIcon,
    },
    emits: ['close', 'newData'],
    setup(_, ctx) {




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
        const filterName = ref(null)
        const items = ref(null)
        const techSelect = ref(null)
        const clientsSuggestions = ref(null)
        const clientsSelect = ref(null)

        const isTech = () => {
            if (localStorage.getItem('roles') == 'ROLE_MODERATOR') {

                console.log(localStorage.getItem('id'));

                techSelect.value = localStorage.getItem('id')
                technician.value = localStorage.getItem('username')

            }
        }

        isTech()

        const sendData = async () => {
            try {
                const resp = await apiResources.post('/services', {
                    description: description.value + '',
                    device:
                    {
                        brand: brand.value + '',
                        model: model.value + '',
                        serialNumber: serialNumber.value + '',
                        processor: processor.value + '',
                        ram: ram.value + '',
                        storage: storage.value + '',
                        observations: observations.value + ''
                    },
                    idClient: clientsSelect.value +"",
                    idTechnician: techSelect.value +"",
                    price: "0",
                    observation: 'jejejej'
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }
                )
                createToast(
                    {
                        title: "Éxito",
                        description: "Servicio creado correctamente",
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

        const selectTech = (name, id) => {
            technician.value = name
            techSelect.value = id


        }
        const selectClient = (name, id) => {
            client.value = name
            clientsSelect.value = id

        }


        watchEffect(async () => {
            if (technician.value === null) return
            if (technician.value.length < 2) return items.value = null
            if (technician.value.length >= 3) {
                const response = await filterTechnicians(technician.value)
                items.value = response.data
                return
            }
            return
        })
        watchEffect(async () => {
            if (client.value === null) return
            if (client.value.length < 2) return clientsSuggestions.value = null
            if (client.value.length >= 3) {
                const response = await filterClients(client.value)
                clientsSuggestions.value = response.data
                return
            }
            return
        })




        const brandRules = ref([
            value => {
                if (!value) return 'Campo obligatorio'
                if (/^[A-Za-z0-9\s]+$/.test(value)) return true
                return 'Introduce solo letras'
            },
        ])
        const numRules = ref([
            value => {
                if (!value) return 'Campo obligatorio'
                if (/^\d+$/.test(value)) return true
                return 'Solo numeros'
            },
        ])
        const emailRules = ref([
            value => {
                if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(value)) return true

                return ''
            },
        ])



        return {
            brandRules,
            numRules,
            emailRules,
            form,
            dialog,
            sendData,
            description,
            brand,
            model,
            serialNumber,
            processor,
            ram,
            storage,
            observations,
            client,
            technician,
            price,
            filterName,
            items,
            selectTech,
            clientsSuggestions,
            selectClient
        }
    },
}
</script>
