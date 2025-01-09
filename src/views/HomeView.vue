<template>
  <div>
    Home
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
router.push('/posts')
</script>

<style lang="scss" scoped></style>
