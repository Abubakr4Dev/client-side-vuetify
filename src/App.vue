<script setup lang="ts">
import NavBar from "./components/NavBar.vue";

// const { isAuthenticated } = storeToRefs(store);
</script>

<template>
  <v-app>
    <nav-bar></nav-bar>
    <v-main heidht="50em"> <router-view></router-view> </v-main>
  </v-app>
</template>
