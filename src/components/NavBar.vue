<script setup lang="ts">
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const store = useStore();

const { links } = storeToRefs(store);

const { getToken } = storeToRefs(store);
</script>

<template>
  <v-app-bar color="info" :elevation="2">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Application Bar</v-app-bar-title>
    <v-spacer></v-spacer>
    <div v-if="!getToken" class="text-center">
      <v-btn
        v-for="link in links"
        :key="`${link.label}-header-link`"
        rounded
        :to="link.url"
        >{{ link.label }}</v-btn
      >
    </div>
  </v-app-bar>
</template>
