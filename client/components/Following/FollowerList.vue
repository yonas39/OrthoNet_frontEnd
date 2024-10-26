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

const { currentUsername } = storeToRefs(useUserStore());
const followers = ref<string[]>([]);
const loading = ref(true);
const nmberofFollowers = ref(0);

const loadFollowers = async () => {
  try {
    const response = await fetchy(`/api/followers/${currentUsername.value}`, "GET");
    followers.value = response.followers;
    nmberofFollowers.value = followers.value.length;
  } catch (error) {
    console.error("Failed to load followers:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(loadFollowers);
</script>

<template>
  <section class="list-section">
    <h2>Followers</h2>
    <p>Number of followers: {{ nmberofFollowers }}</p>
    <ul v-if="followers.length" class="user-list">
      <li v-for="user in followers" :key="user">{{ user }}</li>
    </ul>

    <p v-else>No followers found.</p>
  </section>
</template>

<style scoped>
.list-section {
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-list {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.user-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e0e0e0;
}
</style>

<!--
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
</style> -->
