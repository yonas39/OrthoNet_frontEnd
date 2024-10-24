<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";

const username = ref("");
const feedback = ref("");

const sendRequest = async () => {
  try {
    await fetchy("/api/friend/request", "POST", { body: { to: username.value } });
    feedback.value = "Friend request sent!";
  } catch (error) {
    feedback.value = "Failed to send request.";
    console.error("Error sending request:", error);
  }
};

const acceptRequest = async (from: string) => {
  try {
    await fetchy(`/api/friend/accept/${from}`, "PUT");
    feedback.value = `${from} is now your friend!`;
  } catch (error) {
    feedback.value = "Failed to accept request.";
    console.error("Error accepting request:", error);
  }
};
</script>

<template>
  <section>
    <h2>Send Friend Request</h2>
    <input v-model="username" placeholder="Enter username" />
    <button @click="sendRequest">Send Request</button>
    <p>{{ feedback }}</p>

    <h2>Pending Requests</h2>
    <ul>
      <li>User1 <button @click="acceptRequest('User1')">Accept</button></li>
    </ul>
  </section>
</template>

<style scoped>
button {
  margin-left: 1em;
}
</style>
