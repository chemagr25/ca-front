
<script>
import { ref } from "vue";
import apiResources from "../../api/apiResources";
import router from "../../router/router";

import Loader from "../LoaderComponent.vue";
import Rate from "./RateComponent.vue";

export default {
  props: {
    idService: null,
  },
  components: { Loader, Rate },

  setup(props) {
    //reactive data
    const tech = ref(null);

    const getService = async () => {
      try {
        const resp = await apiResources.get(`/clients/${props.idService}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        tech.value = resp.data;
     
      } catch (e) {
        if (e.response.status === 401) {
          localStorage.clear();
          location.reload();
          return;
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


    return { tech,capitalize, getColor };
  },
};
</script>

<template>

  <div v-if="!tech" class=" flex  justify-center"> <Loader></Loader> </div>
  <div v-else class=" w-full   flex flex-col items-center  rounded-lg">
    <div class="w-full  rounded-lg  main-cont  flex justify-center">
      <div class="cont flex p-2 w-full items-center  flex-col">
        <div class="col flex flex-row  md:w-1/2 shadow-lg pl-3 pt-3   rounded-lg bg-gray-50">
          <div class="id flex flex-col  w-full ">
            <div class="flex justify-around">
              <div class="info">
                <p class="text-xl">ID</p>
                <p>#{{ tech.id }}</p>
              </div>
              <div class="info">
                <p class="text-xl">Teléfono</p>
                <p class="">
                  {{ tech.phone }}
                </p>
              </div>
            </div>
            <div class="flex mt-3 justify-around">
              <div class="info">
                <p class="text-xl">Nombre</p>
                <p class="capitalize">
                  {{ tech.name + ' ' + tech.lastName }}
                </p>
              </div>
              <div class="info">
                <p class="text-xl">Correo</p>
                <p class="">
                  {{ tech.phone }}
                </p>
              </div>
              <div class="info">
                <p class="text-xl">Username</p>
                <p class="">
                  {{ tech.username }}
                </p>
              </div>
            </div>
            <p class="ml-3 mt-3">Servicios</p>
            <div class=" justify-center flex flex-wrap">

              <router-link v-for="service in tech.services" class=" m-3 bg-white  p-4 rounded-lg shadow-sm"
                :to="{ name: 'services-details', params: { id: service.id } }">

                {{ service.folio ? service.folio : 'NO hay folio' }}
                <!-- {{ service.description ? service.description : 'NO hay folio' }} -->

              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>





<style scoped>

.tec {
   max-width: 16ch;
}

.product-img {
}

/* PRODUCT */
.product {
  /* border: 4px solid black; */
  width: 100%;
  
  position: relative;
	
	display: grid;
	grid-template-columns: 250px 1fr 1fr;
	
}

.product-title {
  text-transform: uppercase;
 
  background-color: #f7f7f7;
	
	grid-column: 1 / -1;
}

/* PRODUCT INFORMATION */
.product-info {
	/*  (825 - 8 - 250 - 80) / 2  */
	/* 	width: 243px; */
	flex: 1;
	margin-top: 20px;
}

.product-price {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.price {
  font-size: 24px;
}

.shipping {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  color: #777;
}

.sale {
  content:"SALE";
  color: #fff;
  background-color: #ec2f2f;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: bold;
  position: absolute;
  display: inline-block;
  padding: 7px 15px;
  top: -17px;
  left: -38px;
	
	/*   width: 40px;
  text-align: center; */
}

.product-description {
  margin-bottom: 10px;
}

.more-info:link, .more-info:visited  {
  color: black;
	margin-bottom: 30px;
	display: inline-block;
}

.more-info:hover, .more-info:active {
  text-decoration: none;
}

.product-colors {
	display: flex;
  gap: 10px;
}

.color {
	background-color: #000;
	height: 22px;
	width: 22px;
}

.color-blue {
	background-color: #2f6ee2;
}

.color-red {
  background-color: #ec2f2f;
}
.color-yellow {
  background-color: #f0bf1e;
}
.color-green {
  background-color: #90cc20;
}
.color-brown {
  background-color: #885214;
}

/* PRODUCT DETAILS */
.product-details {
/* 	width: 243px; */
  margin-top: 20px;
	flex: 1;
}

.details-title {
  text-transform: uppercase;
  font-size: 16px;
  margin-bottom: 15px;
}

.details-list {
  list-style: square;
  margin-left: 20px;
}

.details-list li {
  margin-bottom: 10px;
}

/* BUTTON */
.add-cart {
  color: white;
  background-color: black;
  border: none;
  font-size: 20px;
  text-transform: uppercase;
  cursor: pointer;
  width: 100%;
  padding: 15px;
  border-top: 4px solid black;
	
	grid-column: 1 / -1;
}

.add-cart:hover {
  color: black;
  background-color: white;
}

</style>