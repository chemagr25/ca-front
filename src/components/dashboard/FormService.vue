<template class="h-full">
  <div
    class="mt-22 h-1/2 py-5 z-10 absolute px-5 top-0 right-0 bottom-0 left-0"
    id="modal"
  >
    <div
      @click="$emit('close')"
      class="mt-22 bg-gray-500/[0.5] h-screen py-12 h-full fixed top-0 right-0 bottom-0 left-0"
    ></div>
    <!-- FormDevice -->
    <div
      v-if="!showClientForm"
      role="alert"
      class=" rounded-2xl z-30 container flex justify-center items-center  mx-auto"
    >
    
      <div
        class="relative rounded-2xl py-8 px-5 bg-white w-full md:w-4/5 mt-16 overflow-y-auto shadow-md rounded shadow-lg"
      >
        <h1
          class="text-gray-800 font-lg mb-10 -mt-2  font-bold tracking-normal leading-tight "
        >
      
  <!-- <v-icon icon="mdi:mdi-account" /> // This renders a MDI icon -->
          Detalles del dispositivo
        </h1>

        <div class="form-content   mb-8">
          <form @submit.prevent="submit"  >
            <div class=" flex gap-2 flex-wrap ">
              <v-text-field
            class="w-full  lg:w-1/4 md:w-1/2"
              v-model="name.value.value"
              variant="solo"
              :error-messages="name.errorMessage.value"
              label="Name"
            ></v-text-field>

            <v-text-field
            variant="solo"
            class="w-full  lg:w-1/4 md:w-1/2  "
              v-model="phone.value.value"
              :counter="10"
              :error-messages="phone.errorMessage.value"
              label="Phone Number"
            ></v-text-field>

            <v-text-field
            class="w-full  lg:w-1/4 md:w-1/2  "
            
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
              label="E-mail"
              variant="solo"
            ></v-text-field>

            <v-select
            class="w-full  lg:w-1/4 md:w-1/2 "
              v-model="select.value.value"
              :items="items"
              varint="solo"
              :error-messages="select.errorMessage.value"
              label="Select"
            ></v-select>

            <v-checkbox
            class="w-full  lg:w-1/4 md:w-1/2 "
              v-model="checkbox.value.value"
              :error-messages="checkbox.errorMessage.value"
              value="1"
              label="Option"
              type="checkbox"
            ></v-checkbox>

            <v-btn class="me-4" type="submit"> submit </v-btn>

            <v-btn @click="handleReset"> clear </v-btn>

            </div>


        
          </form>
        </div>

        <div class="flex items-center justify-end gap-5 w-full">
          <button
            @click="$emit('close')"
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
          >
            Cancelar
          </button>
          <button
            @click="showClientForm = true"
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-900 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
          >
            Siguiente
          </button>
        </div>
        <button
          class="cursor-pointer absolute top-0 right-0 mt-5 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
          aria-label="close modal"
          role="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            @click="$emit('close')"
            class="icon icon-tabler icon-tabler-x"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
    <!-- End Form -->

    <!-- FormClient -->
    <div
      v-if="showClientForm"
      role="alert"
      class="shadow-2xl rounded-2xl z-30 container mx-auto"
    >
      <div
        class="relative rounded-2xl py-8 px-5 bg-white mt-16 overflow-y-auto shadow-md rounded shadow-lg"
      >
        <h1
          class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4"
        >
          Detalles del Cliente
        </h1>

        <div class="flex gap-5">
          <div class="w-1/2">
            <label
              for="name"
              class="text-gray-800 w-50 text-sm font-bold leading-tight tracking-normal"
              >Marca</label
            >
            <input
              id="name"
              class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-900 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Marca"
            />
          </div>
          <div class="inputs w-1/2">
            <label
              for="name"
              class="text-gray-800 w-50 text-sm font-bold leading-tight tracking-normal"
              >Modelo</label
            >
            <input
              id="name"
              class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Modelo"
            />
          </div>
        </div>

        <div class="flex gap-5">
          <div class="w-1/2">
            <label
              for="name"
              class="text-gray-800 w-50 text-sm font-bold leading-tight tracking-normal"
              >Numero de Serie</label
            >
            <input
              id="name"
              class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-900 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="S/N"
            />
          </div>
          <div class="inputs w-1/2">
            <label
              for="name"
              class="text-gray-800 w-50 text-sm font-bold leading-tight tracking-normal"
              >Almacenamiento
            </label>
            <input
              id="name"
              class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="En GB"
            />
          </div>
        </div>
        <div class="flex gap-5">
          <div class="w-1/2">
            <label
              for="name"
              class="text-gray-800 w-50 text-sm font-bold leading-tight tracking-normal"
              >Procesador</label
            >
            <input
              id="name"
              class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-900 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Procesador"
            />
          </div>
          <div class="inputs w-1/2">
            <label
              for="name"
              class="text-gray-800 w-50 text-sm font-bold leading-tight tracking-normal"
              >RAM
            </label>
            <input
              id="name"
              class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="En GB"
            />
          </div>
        </div>

        <div class="flex gap-5">
          <div class="w-full">
            <label
              for="name"
              class="text-gray-800 w-50 text-sm font-bold leading-tight tracking-normal"
              >Observaciones</label
            >
            <textarea
              style="height: 120px; padding-top: 5px"
              id="name"
              class="mb-5 resize-none mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-900 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Observaciones"
            />
          </div>
        </div>
        <div class="flex gap-5">
          <div class="w-full">
            <label
              for="name"
              class="text-gray-800 w-50 text-sm font-bold leading-tight tracking-normal"
              >Subir imagen</label
            >
            <upload-file></upload-file>
          </div>
        </div>

        <div class="flex items-center justify-end gap-5 w-full">
          <button
            @click="showClientForm = false"
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
          >
            Regresar
          </button>
          <button
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-900 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
          >
            Enviar
          </button>
        </div>
        <button
          class="cursor-pointer absolute top-0 right-0 mt-5 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
          aria-label="close modal"
          role="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            @click="$emit('close')"
            class="icon icon-tabler icon-tabler-x"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
    <!-- End Form -->
  </div>
</template>



<script>
import UploadFile from "./UploadFileComponent.vue";
import { ref } from "vue";
import { useField, useForm } from "vee-validate";

export default {
  props: {},

  components: {
    UploadFile,
  },

  setup() {
    //reactive data

    const showClientForm = ref(false);
    const { handleSubmit, handleReset } = useForm({

      validationSchema: {
        name(value) {
          if (value?.length >= 2) return true;

          return "Name needs to be at least 2 characters.";
        },
        phone(value) {
          if (value?.length == 10 && /[0-9-]+/.test(value)) return true;

          return "Número de teléfono a 10 digitos";
        },
        email(value) {
          if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

          return "Must be a valid e-mail.";
        },
        select(value) {
          if (value) return true;

          return "Select an item.";
        },
        checkbox(value) {
          if (value === "1") return true;

          return "Must be checked.";
        },
      },
    });
    const name = useField("name");
    const phone = useField("phone");
    const email = useField("email");
    const select = useField("select");
    const checkbox = useField("checkbox");

    const items = ref(["Item 1", "Item 2", "Item 3", "Item 4"]);

    const submit = handleSubmit((values) => {
      
      alert(JSON.stringify(values, null, 2));
    });

    return {
      name,
      phone,
      email,
      select,
      checkbox,
      items,
      submit,
      handleReset,
      showClientForm,
    };
  },
};
</script>
