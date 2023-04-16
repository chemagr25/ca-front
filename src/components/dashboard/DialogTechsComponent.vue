<template>
    <v-row>
        <v-dialog class=" p-5" v-model="dialog" width="1024">
            <template v-slot:activator="{ props }">
                <div class=" mr-auto pl-3">
                    <button class="btn btn-primary flex justify-center    bg-indigo-900" color="primary" v-bind="props">
                        <DocumentPlusIcon class="h-5 w-5 text-white" />
                        <p class="hidden md:block ml-2 capitalize text-sm font-normal"> Agregar tecnico</p>
                    </button>
                </div>

            </template>
            <v-row>
                <v-dialog class="  mb-5 p-5" v-model="dialog" width="1024">

                    <v-card class="overflow-y-auto" height="600">
                        <v-card-text>
                            <FormTech  @new-data="newData" @close="dialog = false"/>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-dialog>
    </v-row>
</template>


<style scoped>
.border-none {
    border: none !important;
}

.text-white {
    color: #fff !important;
}
</style>


<script>
import { ref } from 'vue'
import FormTech from '../forms/FormTech.vue';

import {
    DocumentPlusIcon,
} from "@heroicons/vue/24/outline";

export default {
    components: {
        DocumentPlusIcon,
        FormTech
    },
    emits: ['reloadTable'],
    setup(_,ctx) {
        const firstName = ref(null)
        const lastName = ref(null)
        const dialog = ref(false)
        const tab = ref(null)

        const newData= () => {
            ctx.emit('reloadTable')
            dialog.value= false
        }


     

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

        return { newData,tab, dialog, firstName, lastName, firstNameRules, lastNameRules }
    },
}
</script>



