<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { currentUsername } = storeToRefs(useUserStore());
const targetUsername = ref("");
const status = ref<string | null>(null);

const checkFollowStatus = async () => {
  try {
    const response = await fetchy("/api/follow/status", "POST", {
      body: { follower: currentUsername.value, following: targetUsername.value },
    });
    status.value = response.isFollowing ? "Following" : "Not Following";
  } catch (error) {
    console.error("Failed to check follow status:", error);
  }
};
</script>

<template>
  <section>
    <h2>Check Follow Status</h2>
    <input v-model="targetUsername" placeholder="Enter username" />
    <button @click="checkFollowStatus">Check Status</button>
    <p v-if="status">{{ currentUsername }} is {{ status }} {{ targetUsername }}</p>
  </section>
</template>

<style scoped>
button {
  margin-top: 1em;
}
</style>
