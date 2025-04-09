<script setup>
  import NavBar from "./components/NavBar.vue";
  import { useRoute } from "vue-router";
  import { useToast } from 'primevue/usetoast';
  const toast = useToast();

  const route = useRoute();
</script>

<template>
  <NavBar v-if="!route.meta.hideNavbar"/>
  <Toast />
  <router-view />
</template>

<style scoped>
  
</style>
