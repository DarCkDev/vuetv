<script setup>
import { RouterView } from 'vue-router'
import NavComponent from './components/NavComponent.vue'
</script>

<template>
  <div class="bg-slate-900 text-white min-h-screen">
    <header>
      <div class="wrapper">
        <NavComponent />
      </div>
    </header>
    <div class="p-5 md:p-10">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
