<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onMounted, ref } from "vue";
import PendingRequest from "./PendingRequest.vue";
import SuggestedFriends from "./SuggestedFriends.vue";

// const friends = ref<string[]>([]);
const friends = ref<string[]>([]);
const loading = ref(true);

const loadFriends = async () => {
  try {
    const data = await fetchy("/api/friends", "GET");
    friends.value = data;
  } catch (error) {
    console.error("Failed to load friends:", error);
  } finally {
    loading.value = false;
  }
};

const removeFriend = async (friend: string) => {
  try {
    await fetchy(`/api/friends/${friend}`, "DELETE");
    friends.value = friends.value.filter((f) => f !== friend);
  } catch (error) {
    console.error("Failed to remove friend:", error);
  }
};

onMounted(loadFriends);
</script>

<template>
  <section>
    <PendingRequest />
    <h2>Your Friends</h2>
    <ul v-if="friends.length">
      <ul v-for="friend in friends" :key="friend">
        {{
          friend
        }}
        <button @click="removeFriend(friend)">Unfriend</button>
      </ul>
    </ul>
    <p v-if="!friends.length && !loading">No friends yet.</p>
    <p v-if="loading">Loading...</p>
  </section>
  <section>
    <SuggestedFriends />
  </section>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0.2em;
  margin-left: 2em;
}
button {
  margin-left: 1em;
  background-color: rgb(238, 53, 53);
  border-radius: 15%;
}
</style>
