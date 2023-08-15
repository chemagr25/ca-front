
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
    const comments = ref(null)
    const id = ref(localStorage.getItem('token'))
    const inputComment = ref()

    const getService = async () => {
      try {
        const resp = await apiResources.get(`/services/${props.idService}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        service.value = resp.data;
        comments.value = resp.data.comments
        resp.data.comments.sort((a, b) => {
          return console.log(a.id > b.id)
        })





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

    const status = ref([

      { name: 'RECIBIDO' },
      { name: 'REVISION' },
      { name: 'AUTORIZACION' },
      { name: 'PROCESO' },
      { name: 'COMPLETADO' },
      { name: 'ENTREGADO' },
      { name: 'CANCELADO' }

    ])



    const sendComment = async () => {

      try {
        await apiResources.post(`/services/${service.value.id}/comment/${localStorage.getItem('id')}`, {
          comment: inputComment.value
        },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
              "Content-Type": 'multipart/form-data'
            }
          })
        await getService();
        await sendNotification(service.value.folio)
        inputComment.value = ''



      } catch (error) {
        console.log(error)

      }

    }



    const sendNotification = async (service) => {

      try {
        await apiResources.post('services/notify/36', {
          title: `Nuevo comentario en su servicio ${service} `,
          body: 'Se ha agregado un nuevo comentario a su servicio'
        },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })

      } catch (error) {
        console.log(error)
      }
    }
    const sendNotification2 = async () => {

try {
  await apiResources.post('services/notify/36', {
    title: `Tienes novedades en su servicios `,
    body: 'Ha cambiado de status'
  },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })

} catch (error) {
  console.log(error)
}
}


    const changeStatus = async (newStatus) => {


      try {
        await apiResources.patch(`/services/update/${service.value.id}`, {
        status: newStatus
      }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })

      await getService()
      await sendNotification2()
      }catch (e) {
        console.log(e)
      }

  

    }



    return { service, capitalize, getColor, img, dialog, comments, id, sendComment, inputComment, status, changeStatus };
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
        <div class="dropdown dropdown-bottom">
          <label tabindex="0" class=" cursor-pointer">{{ service.status }}</label>
          <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li v-for="item in status"><p @click="changeStatus(item.name)"> {{ item.name }}</p></li>
            
          </ul>
        </div>
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

    <v-row class="center mt-5 ">
      <v-dialog v-model="dialog" scrollable height="500" width="600">
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props">
            Ver comentarios
          </v-btn>
        </template>
        <v-card>
          <v-card-title>Comentarios</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 300px;x">
            <div v-for="comment in comments" :key="comment.id" class="bg-accent/20 p-5 m-2 w-1/2  rounded-lg shadow-lg"
              :class="[comment.user.roles[0].name == 'ROLE_MODERATOR' ? 'ml-auto' : '']">
              <p class="font-bold mb-2">{{ comment.user.name }} <span class="text-xs font-normal">{{
                comment.user.roles[0].name === 'ROLE_MODERATOR' || comment.user.roles[0].name === 'ROLE_ADMIN' ?
                '(Técnico)' : 'Cliente' }}</span></p>
              <p class="mt-2"> {{ comment.comment }}</p>
              <img :src="comment?.photoUrl" alt="" class="w-40 rounded ">
            </div>


          </v-card-text>

          <form @submit.prevent>
            <label for="chat" class="sr-only">Escribe tu comentario</label>
            <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50">
              <textarea id="chat" rows="1" v-model="inputComment"
                class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Escribe tu comentario"></textarea>
              <button @click="sendComment"
                class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                <svg class="w-5 h-5 rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 18 20">
                  <path
                    d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span class="sr-only">Send message</span>
              </button>
            </div>
          </form>


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