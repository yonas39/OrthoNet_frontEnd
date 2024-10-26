<script setup lang="ts">
import { useUserStore } from "@/stores/user"; // Assuming you have a user store to get the current user
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const friends = ref<any[]>([]);
const loading = ref(true);
const { currentUsername } = storeToRefs(useUserStore());

const loadFriends = async () => {
  try {
    const data = await fetchy("/api/friend/requests", "GET");
    console.log("DATA", data);

    for (const d of data) {
      console.log("DATA", d);
      if (d.to === currentUsername.value && d.status === "pending") {
        friends.value.push(d.from);
      }
    }
  } catch (error) {
    console.error("Failed to load friends:", error);
  } finally {
    loading.value = false;
  }
};

const acceptRequest = async (friendId: string) => {
  try {
    await fetchy(`/api/friend/accept/${friendId}`, "PUT");
    friends.value = friends.value.filter((friend) => friend._id !== friendId);
    console.log("Friend request accepted successfully");
    loadFriends();
  } catch (error) {
    console.error("Failed to accept friend request:", error);
  }
};

const rejectRequest = async (from: string) => {
  try {
    await fetchy(`/api/friend/reject/${from}`, "PUT");
    friends.value = friends.value.filter((friend) => friend._id !== from);
    console.log("Friend request rejected successfully");
    loadFriends();
  } catch (error) {
    console.error("Failed to reject friend request:", error);
  }
};

loadFriends();
</script>

<template>
  <section>
    <h2>Pending Friend Requests</h2>
    <ul v-if="friends.length">
      <li v-for="friend in friends" :key="friend._id">
        <strong>{{ friend }}</strong>

        <button @click="acceptRequest(friend)">Accept</button>
        <button class="reject" @click="rejectRequest(friend)">Reject</button>
      </li>
    </ul>
    <p v-else>No pending friend requests.</p>
    <p v-if="loading">Loading...</p>
  </section>
</template>

<style scoped>
li {
  list-style-type: none;
  padding: 0;
  margin: 0.25em;
}

button {
  margin-left: 0.3em;
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.reject {
  background-color: #f44336;
}

button:hover {
  opacity: 0.8;
}
</style>
