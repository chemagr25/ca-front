<script setup>
import { ref } from "vue";
import ItemNavBar from "./ItemNavBarComponent.vue";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  PopoverGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import {
  Bars3Icon,
  ClipboardDocumentCheckIcon,
  DocumentPlusIcon,
  XMarkIcon,
  UserGroupIcon,
  UserPlusIcon,
  WrenchScrewdriverIcon,
  EyeIcon,
} from "@heroicons/vue/24/outline";
import {
  ChevronDownIcon,

} from "@heroicons/vue/20/solid";
import router from "../router/router";

const clearSession = () => {
  localStorage.clear();
  router.push({ name: "login" });
};
const name = ref(localStorage.getItem('username'));
const getRole = () => {
  return localStorage.getItem('roles')
  
}
const ServiceActions = [
  {
    name: "Ver todos los servicios",
    description: "",
    href: "services",
    icon: ClipboardDocumentCheckIcon,
  },

];
const CustomerActions = [
  {
    name: "Ver todos los clientes",
    description: " ",
    href: "services",
    icon: UserGroupIcon,
  },

];
const TechActions = [
  {
    name: "Ver técnicos",
    description: " ",
    href: "services",
    icon: WrenchScrewdriverIcon,
  },

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

<template  class="p-1">
  <header class="bg-white w-full lg:shadow-sm ">
    <nav class="flex p-4 justify-between items-center" aria-label="Global">
      <div @click="clearSession" class="flex lg:flex-1">
        <img
          class="h-10 w-auto rounded-lg"
          src="../assets/imgs/logo.jpg"
          alt="CompuActual"
        />
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <ItemNavBar
        v-if=" getRole() === 'ROLE_ADMIN' || getRole() === 'ROLE_MODERATOR' "
          name="Servicios"
          :items="ServiceActions"
          :showItems="true"
        />
        <ItemNavBar  v-if=" getRole() === 'ROLE_ADMIN'  "  name="Tecnicos" :items="TechActions" :showItems="true" />
        <ItemNavBar v-if=" getRole() === 'ROLE_ADMIN' || getRole() === 'ROLE_MODERATOR' "
          name="Clientes"
          :items="CustomerActions"
          :showItems="true"
        />
      </PopoverGroup>

      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <Menu as="div" class="relative ml-3">
          <div>
            <MenuButton
              class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              <!-- <span class="sr-only">Open user menu</span> -->
              <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />
            </MenuButton>
          </div>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute px-1.5  right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <MenuItem class="divide-y divide-dashed">
                <p class="text-xs text-bold text-center">{{ name }}</p>
              </MenuItem>
              <MenuItem
                @click="clearSession"
                class="divide-y divide-indigo-900"
              >
                <p
                  class="rounded"
                  :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  ]"
                >
                  Cerrar sesión
                </p>
              </MenuItem>
              <MenuItem
                class="divide-y divide-indigo-900"
                v-for="item in userNavigation"
                :key="item.name"
                v-slot="{ active }"
              >
                <a
                  :href="item.href"
                  class="rounded"
                  :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  ]"
                  >{{ item.name }}</a
                >
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </nav>
    <Dialog
      as="div"
      class="lg:hidden z-50"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <a class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img
              @click="clearSession"
              class="h-8 rounded w-auto"
              src="../assets/imgs/logo.jpg"
              alt=""
            />
          </a>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <Disclosure as="div" class="-mx-3" v-slot="{ open }">
                <DisclosureButton
                  class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50"
                >
                  Servicios
                  <ChevronDownIcon
                    :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']"
                    aria-hidden="true"
                  />
                </DisclosureButton>
                <DisclosurePanel class="mt-2 space-y-2">
                  <DisclosureButton
                    v-for="item in [...ServiceActions, ...callsToAction]"
                    :key="item.name"
                    as="a"
                    :href="item.href"
                    class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >{{ item.name }}</DisclosureButton
                  >
                </DisclosurePanel>
              </Disclosure>
              <a
                href="#"
                class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >Features</a
              >
              <a
                href="#"
                class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >Marketplace</a
              >
              <a
                href="#"
                class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >{{ name }}</a
              >
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<style scoped>
header {
  z-index: 99999 !important;
}
</style>