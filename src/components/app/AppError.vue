<template>
  <div>
    <div class="text-center text-danger py-4">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: String
})
</script>

<style scoped>

</style>
