
<script>
import { ref } from "vue";

export default {
  props: {
    items: null,
  },

  setup() { },
};
</script>


<template>
  <div class="root flex justify-center flex-col w-full ">
    <div class="main-cont w-full flex justify-center   bg-white  p-5 rounded-lg">

      <div class="overflow-x-auto  w-full cont-table">
        <table class="table table-zebra w-full">
          <!-- head -->
          <thead>
            <tr>
              <th>Folio</th>
              <th>cliente</th>
              <th>Dispositivo</th>
              <th>Tecnico</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody v-for="item in items" :key="item.id">
            <!-- row 1 -->
            <tr>
              <th>{{ item.id }}</th>
              <td>{{ item.client.username }}</td>
              <td>{{ item.devices[0] ? item.devices[0].brand + ' ' + item.devices[0].model : '' }}</td>
              <td>{{ item.technicians.name }}</td>
              <td>{{ item.status }} </td>
              <td>Ver detalles</td>
            </tr>
            <tr>
              <th>{{ item.id }}</th>
              <td>{{ item.client.username }}</td>
              <td>{{ item.devices[0] ? item.devices[0].brand + ' ' + item.devices[0].model : '' }}</td>
              <td>{{ item.technicians.name }}</td>
              <td class="text-capitalize">{{ item.status }}</td>
              <td class="text-capitalize">Ver detalles</td>
            </tr>


          </tbody>
        </table>


      </div>

    </div>
    <div class="pag flex justify bg-white maxwi mt-4 rounded-lg p-2 w-full border">
      <div class="btn-group">
  <button class="mx-1 btn btn-outline border">1</button>
  <button class=" mx-1 btn btn-outline border ">2</button>
  <button class=" mx-1 border btn btn-outline">3</button>
  <button class=" mx-1 border btn btn-outline">4</button>
</div>
    </div>

  </div>
</template>

<style scoped>
.img-item {
  height: 180px;

}

.cont-table,
.main-cont,
.maxwi {

  max-width: 1400px;
}
</style>




