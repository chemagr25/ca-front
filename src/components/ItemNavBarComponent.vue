<template>
  <Popover class="relative">
    <PopoverButton
      class="flex items-center gap-x-1 text-sm font-semibold focus-visible:outline-none leading-6 text-gray-900"
    >
      {{ name }}
      <ChevronDownIcon
        class="cursor-pointer h-5 w-5 flex-none text-gray-400"
        aria-hidden="true"
      />
    </PopoverButton>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <PopoverPanel
        v-if="showItems"
        class="absolute  -left-12 top-full z-50 mt-1 w-screen max-w-md overflow-hidden rounded-2xl bg-white shadow-lg border"
      >
        <div class="p-2">
          <div
            v-for="action in items"
            :key="action.name"
            class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-200"
          >
            <div
              class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white"
            >
              <component
                :is="action.icon"
                class="h-6 w-6 text-gray-600 group-hover:text-indigo-900"
                aria-hidden="true"
              />
            </div>
            <div class="flex-auto ">
              <router-link :to="{name: action.href}" class="block font-semibold text-gray-900">
                {{ action.name }}
                <span class="absolute inset-0" />
            </router-link>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup>
import { ref } from "vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";

const props = defineProps({
  items: null,
  showItems: true,
  name: "",
});
</script>

