<template>
  <div v-if="show" class="d-flex justify-content-center">
    <div class="spinner-border">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false)

setTimeout(() => {
  show.value = true
}, 500);
</script>

<style scoped></style>
