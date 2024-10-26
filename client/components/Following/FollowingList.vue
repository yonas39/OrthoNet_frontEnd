<!-- <script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const { currentUsername } = storeToRefs(useUserStore());
const following = ref<string[]>([]);
const loading = ref(true);

const loadFollowing = async () => {
  try {
    const response = await fetchy(`/api/following/${currentUsername.value}`, "GET");
    following.value = response.following;
  } catch (error) {
    console.error("Failed to load following:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(loadFollowing);
</script>

<template>
  <section class="list-section">
    <h2>Following</h2>
    <ul v-if="following.length" class="user-list">
      <li v-for="user in following" :key="user">{{ user }}</li>
    </ul>
    <p v-else>You are not following anyone yet.</p>
  </section>
</template>

<style scoped>
.list-section {
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style> -->

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const { currentUsername } = storeToRefs(useUserStore());
const following = ref<string[]>([]); // Ensure it's initialized as an empty array
const loading = ref(true);

const loadFollowing = async () => {
  try {
    const response = await fetchy(`/api/following/${currentUsername.value}`, "GET");
    following.value = response?.following || []; // Safe fallback if response is undefined
  } catch (error) {
    console.error("Failed to load following:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(loadFollowing);
</script>

<template>
  <section class="list-section">
    <h2>Following</h2>
    <ul v-if="following.length" class="user-list">
      <li v-for="user in following" :key="user">{{ user }}</li>
    </ul>
    <p v-else>You are not following anyone yet.</p>
  </section>
</template>

<style scoped>
.list-section {
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

<!-- <script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

// Store references
const { currentUsername } = storeToRefs(useUserStore());
const following = ref<string[]>([]);
const loading = ref(true);

// Load the list of users the current user is following
const loadFollowing = async () => {
  try {
    const response = await fetchy(`/api/following/${currentUsername.value}`, "GET");
    following.value = response.res; // Assuming `res` contains the list of usernames
  } catch (error) {
    console.error("Failed to load following:", error);
  } finally {
    loading.value = false;
  }
};

// Fetch the data when the component is mounted
onMounted(loadFollowing);
</script>

<template>
  <section>
    <h2>Following</h2>
    <ul v-if="following.length">
      <li v-for="user in following" :key="user">{{ user }}</li>
    </ul>
    <p v-if="!following.length && !loading">You are not following anyone yet.</p>
    <p v-if="loading">Loading...</p>
  </section>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
</style> -->
