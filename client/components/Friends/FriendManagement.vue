<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";

const feedback = ref("");

const removeFriend = async (friend: string) => {
  try {
    await fetchy(`/api/friends/${friend}`, "DELETE");
    feedback.value = `${friend} removed from friends list.`;
  } catch (error) {
    feedback.value = "Failed to remove friend.";
    console.error("Error removing friend:", error);
  }
};

const rejectRequest = async (from: string) => {
  try {
    await fetchy(`/api/friend/reject/${from}`, "PUT");
    feedback.value = `Friend request from ${from} rejected.`;
  } catch (error) {
    feedback.value = "Failed to reject request.";
    console.error("Error rejecting request:", error);
  }
};
</script>

<template>
  <section>
    <h2>Manage Friends</h2>

    <ul>
      <li>
        Friend1
        <button @click="removeFriend('Friend1')">Remove</button>
      </li>
    </ul>

    <h2>Pending Requests</h2>
    <ul>
      <li>User2 <button @click="rejectRequest('User2')">Reject</button></li>
    </ul>

    <p>{{ feedback }}</p>
  </section>
</template>

<style scoped>
button {
  margin-left: 1em;
}
</style>
