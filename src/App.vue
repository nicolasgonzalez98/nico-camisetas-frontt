<script setup>
  import NavBar from "./components/NavBar.vue";
  import { useRoute } from "vue-router";

  const route = useRoute();
</script>

<template>
  <NavBar v-if="!route.meta.hideNavbar"/>
  <router-view />
</template>

<style scoped>
  
</style>
