<!-- <script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { defineEmits, defineProps } from "vue";

import { useUserStore } from "@/stores/user"; // Assuming you have a user store to get the current user

// Define props to receive group data and the visibility state
const props = defineProps<{
  group: {
    _id: string;
    title: string;
    topic: string;
    leader: string;
    members: string[];
  } | null;
  show: boolean;
}>();

const userStore = useUserStore();
const currentUserId = userStore.currentUsername;

// Emit events to close the detail view and refresh the list
const emit = defineEmits(["close", "refreshGroups"]);

// Function to join the prayer group
const joinGroup = async () => {
  try {
    await fetchy(`/api/prayer-group/join/${props.group?._id}`, "PUT");
    emit("refreshGroups");
    emit("close");
  } catch (error) {
    console.error("Failed to join group:", error);
  }
};

// Function to leave the prayer group
const leaveGroup = async () => {
  try {
    await fetchy(`/api/prayer-group/leave/${props.group?._id}`, "PUT");
    emit("refreshGroups");
    emit("close");
  } catch (error) {
    console.error("Failed to leave group:", error);
  }
};
</script>

<template>
  <div v-if="show" class="overlay">
    <div class="group-details">
      <button class="close-button" @click="$emit('close')">Close</button>
      <h2><strong>Title:</strong> {{ group?.title }}</h2>
      <p><strong>Topic:</strong> {{ group?.topic }}</p>
      <p><strong>Leader:</strong> {{ group?.leader }}</p>
      <p><strong>Members:</strong> {{ group?.members.length }}</p>

      <button @click="leaveGroup" v-if="!group?.members.includes('user_id')">Leave</button>
      <button @click="joinGroup" v-else>Join</button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.group-details {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}

.close-button {
  background: red;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  float: right;
}

button {
  margin: 10px 0;
  padding: 10px;
  background-color: #ff9898;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #ff7171;
}
</style> -->

<script setup lang="ts">
import { useUserStore } from "@/stores/user"; // Assuming you have a user store to get the current user
import { fetchy } from "@/utils/fetchy";
import { defineEmits, defineProps } from "vue";

// Define props to receive group data and the visibility state
const props = defineProps<{
  group: {
    _id: string;
    title: string;
    topic: string;
    leader: string;
    members: string[];
  } | null;
  show: boolean;
}>();

// Emit events to close the detail view and refresh the list
const emit = defineEmits(["close", "refreshGroups"]);

// Get the current user's ID from the user store
const userStore = useUserStore();
const currentUserId = userStore.id;

// Function to join the prayer group
const joinGroup = async () => {
  try {
    await fetchy(`/api/prayer-group/join/${props.group?._id}`, "PUT");
    emit("refreshGroups");
    emit("close");
  } catch (error) {
    console.error("Failed to join group:", error);
  }
};

// Function to leave the prayer group
const leaveGroup = async () => {
  try {
    await fetchy(`/api/prayer-group/leave/${props.group?._id}`, "PUT");
    emit("refreshGroups");
    emit("close");
  } catch (error) {
    console.error("Failed to leave group:", error);
  }
};

// Check if the current user is a member of the group
const isMember = () => {
  return props.group?.members.includes(currentUserId);
};
</script>

<template>
  <div v-if="show" class="overlay">
    <div class="group-details">
      <button class="close-button" @click="$emit('close')">Close</button>
      <h2><strong>Title:</strong> {{ group?.title }}</h2>
      <p><strong>Topic:</strong> {{ group?.topic }}</p>
      <p><strong>Leader:</strong> {{ group?.leader }}</p>
      <p><strong>Members:</strong> {{ group?.members.length }}</p>

      <button @click="leaveGroup" v-if="isMember()">Leave</button>
      <button @click="joinGroup" v-else>Join</button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.group-details {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}

.close-button {
  background: red;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  float: right;
}

button {
  margin: 10px 0;
  padding: 10px;
  background-color: #ff9898;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #ff7171;
}
</style>
