<!-- <script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const { currentUsername } = storeToRefs(useUserStore());
const followers = ref<string[]>([]);
const loading = ref(true);

const loadFollowers = async () => {
  try {
    const response = await fetchy(`/api/followers/${currentUsername.value}`, "GET");
    followers.value = response.followers;
  } catch (error) {
    console.error("Failed to load followers:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(loadFollowers);
</script>

<template>
  <section>
    <h2>Followers</h2>
    <ul v-if="followers.length">
      <li v-for="user in followers" :key="user">{{ user }}</li>
    </ul>
    <p v-if="!followers.length && !loading">No one is following you yet.</p>
    <p v-if="loading">Loading...</p>
  </section>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
</style> -->

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

// Store references
const { currentUsername } = storeToRefs(useUserStore());
const followers = ref<string[]>([]);
const loading = ref(true);

// Load the list of followers for the current user
const loadFollowers = async () => {
  try {
    const response = await fetchy(`/api/followers/${currentUsername.value}`, "GET");
    followers.value = response.followers; // Assuming `followers` contains the usernames
  } catch (error) {
    console.error("Failed to load followers:", error);
  } finally {
    loading.value = false;
  }
};

// Fetch data when the component is mounted
onMounted(loadFollowers);
</script>

<template>
  <section>
    <h2>Followers</h2>
    <ul v-if="followers.length">
      <li v-for="user in followers" :key="user">{{ user }}</li>
    </ul>
    <p v-if="!followers.length && !loading">No one is following you yet.</p>
    <p v-if="loading">Loading...</p>
  </section>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
</style>
