<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";

const username = ref("");
const feedback = ref("");
const friendsList = ref<string[]>([]);

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
    await fetchy(`/api/friend/accept/:${from}`, "PUT");
    feedback.value = `${from} is now your friend!`;
  } catch (error) {
    feedback.value = "Failed to accept request.";
    console.error("Error accepting request:", error);
  }
};
</script>

<template>
  <section>
    {{ feedback }}
    <h2>Send Friend Request</h2>
    <input v-model="username" placeholder="Enter username" />
    <button @click="sendRequest">Send Request</button>
    <p>{{ feedback }}</p>

    <h2>Pending Requests</h2>
    <ul>
      <li>User1 <button @click="acceptRequest('user1')">Accept</button></li>
    </ul>
  </section>
</template>

<style scoped>
button {
  margin-left: 1em;
}
</style>

<!-- <script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onMounted, ref } from "vue";

const requests = ref<string[]>([]);

const loadRequests = async () => {
  try {
    const { data } = await fetchy("/friend/request", "GET");
    requests.value = data;
  } catch (error) {
    console.error("Failed to load friend requests:", error);
  }
}; -->

<!-- // const handleRequest = async (username: string, action: "accept" | "reject") => {
//   const url = `/friend/${action}/${username}`;
//   try {
//     await fetchy(url, "PUT");
//     requests.value = requests.value.filter((r) => r !== username);
//   } catch (error) {
//     console.error(`Failed to ${action} request from ${username}:`, error);
//   }
// }; -->
<!--
onMounted(loadRequests);
</script>

<template>
  <section>
    <h2>Friend Requests</h2>
    <ul v-if="requests.length">
      <li v-for="request in requests" :key="request">
        {{ request }}
      <button @click="handleRequest(request, 'accept')">Accept</button>
        <button @click="handleRequest(request, 'reject')">Reject</button> -->
<!-- </li>
    </ul>
    <p v-if="!requests.length">No friend requests.</p>
  </section>
</template>

<style scoped>
button {
  margin-left: 0.5em;
}
</style> -->
