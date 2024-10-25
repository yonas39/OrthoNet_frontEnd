<!-- <script setup lang="ts">
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
    {{ friends }}
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
</style> -->

<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onMounted, ref } from "vue";

const friends = ref<string[]>([]);
const loading = ref(true);

const loadFriends = async () => {
  try {
    const { data } = await fetchy("/friends", "GET");
    friends.value = data;
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
    <h2>Your Friends</h2>
    <ul v-if="friends.length">
      <li v-for="friend in friends" :key="friend">{{ friend }}</li>
    </ul>
    <p v-if="!friends.length && !loading">No friends yet.</p>
    <p v-if="loading">Loading...</p>
  </section>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
</style>
