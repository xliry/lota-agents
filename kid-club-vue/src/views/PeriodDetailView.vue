<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-gray-800">Period: {{ route.params.donemId }}</h1>
    <router-link to="/" class="mt-4 inline-block text-blue-600 hover:underline">
      Back to Dashboard
    </router-link>
  </div>
</template>
