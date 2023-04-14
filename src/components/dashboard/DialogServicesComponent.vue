<template>
    <v-row justify="center">
        <v-dialog class="" v-model="dialog" width="1024">
            <template v-slot:activator="{ props }">
                <div class=" mr-auto pl-3">
                    <button class="btn btn-primary flex justify-center    bg-indigo-900" color="primary" v-bind="props">
                        <DocumentPlusIcon class="h-5 w-5 text-white" />
                        <p class="hidden md:block ml-2 capitalize text-sm font-normal"> Agregar servicio</p>
                    </button>
                </div>

            </template>


            <v-card>
                <v-tabs v-model="tab" class="bg-indigo-900 text-white">
                    <v-tab value="one">
                        <p class="capitalize">Cliente</p>
                    </v-tab>
                    <v-tab value="two">
                        <p class="capitalize">Dispositivo</p>
                    </v-tab>

                </v-tabs>

                <v-card-text>
                    <v-window v-model="tab">
                        <v-window-item value="one">
                            <v-card  variant="outlined" class="overflow-y-auto border-none  pb-5" max-height="1200">
                                <FormClient />
                            </v-card>
                        </v-window-item>

                        <v-window-item value="two">
                            Two
                        </v-window-item>

                        <v-window-item value="three">
                            Three
                        </v-window-item>
                    </v-window>
                </v-card-text>
            </v-card>



        </v-dialog>
    </v-row>
</template>


<style scoped>
.border-none {
    border: none !important;
}


</style>


<script>
import { ref } from 'vue'
import FormClient from '../../components/forms/FormClient.vue';

import { useField, useForm } from 'vee-validate'
import {
    DocumentPlusIcon,
} from "@heroicons/vue/24/outline";

export default {
    components: {
        DocumentPlusIcon,
        FormClient
    },
    setup() {
        const firstName = ref(null)
        const lastName = ref(null)
        const dialog = ref(true)
        const tab = ref(null)

        const firstNameRules = ref([
            value => {
                if (value?.length > 3) return true

                return 'First name must be at least 3 characters.'
            },
        ])
        const lastNameRules = ref([
            value => {
                if (/[^0-9]/.test(value)) return true

                return 'Last name can not contain digits.'
            },
        ])

        return { tab, dialog, firstName, lastName, firstNameRules, lastNameRules }
    },
}
</script>



