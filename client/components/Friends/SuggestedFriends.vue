<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onMounted, ref } from "vue";

const users = ref<any[]>([]);
const fetchUsers = async () => {
  try {
    const data = await fetchy("/api/users", "GET");
    console.log("API RESPONSE !!", data);
    users.value = data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};

const sendRequest = async (username: string) => {
  try {
    await fetchy(`/api/friend/request/${username}`, "POST");
    users.value = users.value.filter((user) => user.username !== username);
    // removeFriend(username);
    console.log("Friend request sent successfully");
  } catch (error) {
    console.error("Failed to send friend request:", error);
  }
};

// checkif the username is in PendingRequest or Friends if so remove it from the list send reqest list

const removeFriend = async (username: string) => {
  try {
    await fetchy(`/api/friend/${username}`, "DELETE");
    console.log("Friend removed successfully");
  } catch (error) {
    console.error("Failed to remove friend:", error);
  }
};

onMounted(fetchUsers);
</script>

<template>
  <section>
    <h2>Friend suggestion</h2>
    <div class="user-grid">
      <div v-for="user in users" :key="user._id" class="user-card">
        <div v-if="users.includes(user.username)"></div>
        <p><strong>Name:</strong> {{ user.username }} <button @click="sendRequest(user.username)">Add Friend</button></p>
      </div>
    </div>
  </section>
</template>
<style scoped>
h2 {
  text-align: center;
  margin-top: 3em;
}
section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5c5c7;
  border: 1px solid #000000;
}
.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1em;
}
</style>
