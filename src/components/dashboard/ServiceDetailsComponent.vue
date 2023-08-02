
  <script>
  import { ref } from "vue";
  import apiResources from "../../api/apiResources";
  import router from "../../router/router";
  import Loader from "../LoaderComponent.vue";

  export default {
    props: {
      idService: null,
    },
    components: { Loader },

    setup(props) {
      const service = ref(null);
      const img = ref(null);
      const dialog = ref(false);

      const getService = async () => {
        try {
          const resp = await apiResources.get(`/services/${props.idService}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          service.value = resp.data;

        } catch (e) {
          if (e.response.status === 401 || e.response.status === 403) {
            localStorage.clear();
            location.reload();
            return
          }
          if (e.response.status === 404) {
            return router.push({ name: "notFound" });
          }
        }
      };

      getService();

      const capitalize = (str) => {
        return str.replace(/\w\S*/g, (w) =>
          w.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())
        );
      };
      const getColor = (status) => {
        if (status === "En_proceso") return "bg-yellow-100 text-yellow-800";
        if (status === "Recibido") return "bg-blue-100 text-blue-800";
        if (status === "Completada") return "bg-green-100 text-green-800";
        if (status === "Cancelada") return "bg-red-100 text-red-800";
        if (status === null) return "bg-red-100 text-red-800";
      };


      return { service, capitalize, getColor, img, dialog };
    },
  };
  </script>

  <template>
    <div v-if="!service" class=" flex  justify-center">
      <Loader></Loader>
    </div>

    <div v-else class="w-full flex flex-col items-center  rounded-lg">

      <div class="w-full shadow-lg lg:w-1/2 p-4 bg-white rounded-lg  main-cont maxwi flex flex-col lg:flex-row">

        <div class=" basis-1/3  gap-1 flex flex-col ">
          <p class="self-center font-bold">Servicio</p>
          <p class="font-bold">Folio</p>
          <p>{{ service.folio }}</p>
          <p class="font-bold">Fecha</p>
          <p>{{ service.dateReceived }}</p>
          <p class="font-bold">Técnico</p>
          <p>{{ service.technicians.name }} {{ service.technicians.lastName }}</p>
          <p class="font-bold">Estatus</p>
          <p>{{ service.status }}</p>
        </div>
        <div class=" flex flex-col gap-1  basis-1/3">
          <p class="self-center font-bold">Dispositivo</p>

          <p class="font-bold">Marca</p>
          <p>{{ service.devices[0].brand }}</p>
          <p class="font-bold">Modelo</p>
          <p>{{ service.devices[0].model }}</p>
          <p class="font-bold">Descripción</p>
          <p>{{ service.description }}</p>
          <p class="font-bold">Observaciones</p>
          <p>{{ service?.observations }}</p>

        </div>
        <div class="flex flex-col gap-1  basis-1/3 ">
          <p class="self-center font-bold">Cliente</p>
          <p class="font-bold">Nombre</p>
          <p>{{ service.client.name }}</p>
          <p>{{ service.client.lastName }}</p>
          <p class="font-bold">Teléfono</p>
          <p>{{ service.client.phone }}</p>
          <p class="font-bold">Correo</p>
          <p>{{ service.client.email }}</p>
        </div>
      </div>

      <v-row class="center mt-5">
        <v-dialog v-model="dialog" scrollable width="500">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props">
              Ver comentarios
            </v-btn>
          </template>
          <v-card>
            <v-card-title>Comentarios</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;x">
            </v-card-text>
            <v-divider></v-divider>
     
          </v-card>
        </v-dialog>
      </v-row>


    </div>
  </template>





  <style scoped>
  img {
    width: 100%;
  }
  </style>