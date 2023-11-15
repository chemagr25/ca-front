<script setup>
import { ref } from "vue";
import ItemNavBar from "./ItemNavBarComponent.vue";
import { useRoute } from "vue-router";

import {
  Bars3Icon,
  ClipboardDocumentCheckIcon,
  DocumentPlusIcon,
  XMarkIcon,
  UserGroupIcon,
  UserPlusIcon,
  WrenchScrewdriverIcon,
  EyeIcon,
  ArrowLongLeftIcon
} from "@heroicons/vue/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/vue/20/solid";
import router from "../router/router";
import { getCookie } from "../helpers/cookiesHelper";

const clearSession = () => {
  localStorage.clear();
  router.push({ name: "login" });
};







const name = ref(localStorage.getItem('username'));

const getRole = () => {
  return localStorage.getItem('roles')

}


const back = () => {
  router.go(-1)
}

const ServiceActions = [
  {
    name: "Ver servicios",
    description: "",
    href: "services",
    icon: ClipboardDocumentCheckIcon,
  }
];

const CustomerActions = [
  {
    name: "Ver  clientes",
    description: " ",
    href: "clients",
    icon: UserGroupIcon,
  },
];
const TechActions = [
  {
    name: "Ver técnicos",
    description: " ",
    href: "techs",
    icon: WrenchScrewdriverIcon,
  }

];
const callsToAction = [];
const user = {
  name: "Jose María García Ramírez",
  email: "tom@example.com",
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/47/React.svg",
};
const userNavigation = [{ name: "Cambiar contraseña", href: "#" }];
const mobileMenuOpen = ref(false);
</script>

<template>
  <div class="w-full bordera absolute fix">
    <v-toolbar
    color="white">
      <v-btn @click="back" icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon @click="clearSession">mdi-export</v-icon>
      </v-btn>

    </v-toolbar>

  </div>
</template>

<style scoped></style>