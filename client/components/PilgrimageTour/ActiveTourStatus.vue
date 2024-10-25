<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const activeTour = ref(null);

const onMounted = async () => {
  const response = await fetchy("/api/pilgrimage-session/active", "GET");
  activeTour.value = response.data.activeTour;
};

onMounted();
</script>

<template>
  <div>
    <h2>Your Active Tour</h2>
    <p v-if="activeTour">Currently on: {{ activeTour.title }}</p>
    <p v-else>No active tours. Join one today!</p>
  </div>
</template>
