<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { currentUsername } = storeToRefs(useUserStore());
const targetUsername = ref("");
const feedback = ref("");

const followUser = async () => {
  try {
    await fetchy("/api/follow", "POST", {
      body: { follower: currentUsername.value, following: targetUsername.value },
    });
    feedback.value = `You are now following ${targetUsername.value}.`;
  } catch (error) {
    feedback.value = "Failed to follow the user.";
    console.error(error);
  }
};

const unfollowUser = async () => {
  try {
    await fetchy(`/api/follow/${currentUsername.value}/${targetUsername.value}`, "DELETE");
    feedback.value = `You unfollowed ${targetUsername.value}.`;
  } catch (error) {
    feedback.value = "Failed to unfollow the user.";
    console.error(error);
  }
};
</script>

<template>
  <section class="follow-section">
    <h2>Follow or Unfollow User</h2>
    <input v-model="targetUsername" placeholder="Enter username" />
    <button @click="followUser">Follow</button>
    <button @click="unfollowUser">Unfollow</button>
    <p>{{ feedback }}</p>
  </section>
</template>

<style scoped>
.follow-section {
  padding: 1.5rem;
  text-align: center;
}

input {
  margin-top: 1rem;
  padding: 0.5rem;
  width: 80%;
  max-width: 300px;
}

button {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
}
</style>

<!-- <script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";

const { currentUsername } = storeToRefs(useUserStore()); // Get the current user's username
const targetUsername = ref(""); // Target user to follow or unfollow
const feedback = ref(""); // Display feedback messages

const followUser = async () => {
  try {
    await fetchy("/api/follow", "POST", {
      body: { follower: currentUsername.value, following: targetUsername.value },
    });
    feedback.value = `You are now following ${targetUsername.value}.`;
  } catch (error) {
    feedback.value = "Failed to follow the user.";
    console.error(error);
  }
};

const unfollowUser = async () => {
  try {
    await fetchy(`/api/follow/${currentUsername.value}/${targetUsername.value}`, "DELETE");
    feedback.value = `You unfollowed ${targetUsername.value}.`;
  } catch (error) {
    feedback.value = "Failed to unfollow the user.";
    console.error(error);
  }
};
</script>

<template>
  <section>
    <h2>Follow or Unfollow User</h2>
    <input v-model="targetUsername" placeholder="Enter username" />
    <button @click="followUser">Follow</button>
    <button @click="unfollowUser">Unfollow</button>
    <p>{{ feedback }}</p>
  </section>
</template>

<style scoped>
button {
  margin-left: 1em;
}
</style> -->
