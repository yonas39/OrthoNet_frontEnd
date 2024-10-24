<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onMounted, ref } from "vue";

const friends = ref<string[]>([]);
const loading = ref(true);

const loadFriends = async () => {
  try {
    const response = await fetchy("/api/friends", "GET");
    friends.value = response;
  } catch (error) {
    console.error("Failed to load friends:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(loadFriends);
</script>

<template>
  <section>
    <h2>My Friends</h2>
    <ul v-if="friends.length">
      <li v-for="friend in friends" :key="friend">{{ friend }}</li>
    </ul>
    <p v-else>No friends yet.</p>
    <p v-if="loading">Loading...</p>
  </section>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
</style>
