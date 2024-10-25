<script setup lang="ts">
import { ref } from "vue";
const Orthonet = ref("OrthoNet");
</script>

<template>
  <div class="branding">
    <h1>{{ Orthonet }}</h1>
    <p>Designed for Orthodox<br />by Orthodox</p>
  </div>
</template>

<style scoped>
.branding {
  text-align: center;
  margin-bottom: 50px;
}

.branding h1 {
  font-size: 48px;
  font-weight: bold;
}

.branding p {
  font-style: italic;
  font-size: 18px;
}
</style>
