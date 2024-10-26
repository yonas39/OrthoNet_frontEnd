<!-- <script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { defineEmits, defineProps } from "vue";

const props = defineProps(["group"]);
const emit = defineEmits(["refreshGroups"]);

const joinGroup = async () => {
  try {
    await fetchy(`/api/prayer-group/join/${props.group._id}`, "PUT");
    emit("refreshGroups");
  } catch (error) {
    console.error("Failed to join group:", error);
  }
};

const leaveGroup = async () => {
  try {
    await fetchy(`/api/prayer-group/leave/${props.group._id}`, "PUT");
    emit("refreshGroups");
  } catch (error) {
    console.error("Failed to leave group:", error);
  }
};
const viewGroupDetail = async () => {
  try {
    // const data = await fetchy(`/api/prayer-group/join/${props.group._id}`, "PUT");
    props.group;
    console.log("Group joined successfully", props.group);
  } catch (error) {
    console.error("Failed to join group:", error);
  }
};
</script>

<template>
  <article class="group">
    <h3>{{ group.title }}</h3>
    <p>{{ group.topic }}</p>

    <button class="join-button" @click="joinGroup()">Join</button>
    <button @click="leaveGroup()">Leave</button>
    <button @click="viewGroupDetail()">Detail</button>
  </article>
</template>

<style scoped>
.group {
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 1em 0;
}

button {
  padding: 0.5em 1em;
  margin: 0.5em;
  width: 30%;
  padding: 10px;
  background-color: #ff9898;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #ff7171;
}
</style> -->

<script setup lang="ts">
import { defineProps, ref } from "vue";
import PrayerGroupDetail from "./PrayerGroupDetails.vue";

import { fetchy } from "@/utils/fetchy";
import { defineEmits } from "vue";

// const props = defineProps(["group"]);
const emit = defineEmits(["refreshGroups"]);

const joinGroup = async () => {
  try {
    await fetchy(`/api/prayer-group/join/${props.group._id}`, "PUT");
    // emit("refreshGroups");
  } catch (error) {
    console.error("Failed to join group:", error);
  }
};
const leaveGroup = async () => {
  try {
    await fetchy(`/api/prayer-group/leave/${props.group._id}`, "PUT");
    emit("refreshGroups");
  } catch (error) {
    console.error("Failed to leave group:", error);
  }
};

const props = defineProps<{
  group: {
    _id: string;
    title: string;
    topic: string;
    leader: string;
    members: string[];
  };
}>();

const showGroupDetail = ref(false);

// Function to show the detail view
const viewGroupDetail = () => {
  showGroupDetail.value = true;
};

// Function to close the detail view
const closeGroupDetail = () => {
  showGroupDetail.value = false;
};
</script>

<template>
  <article class="group">
    <h3>{{ group.title }}</h3>
    <p>{{ group.topic }}</p>
    <button class="join-button" @click="viewGroupDetail()">View Details</button>
    <button @click="leaveGroup()">Leave</button>

    <button class="join-button" @click="joinGroup()">Join</button>

    <!-- PrayerGroupDetail Component -->
    <PrayerGroupDetail :group="group" :show="showGroupDetail" @close="closeGroupDetail" @refreshGroups="$emit('refreshGroups')" />
  </article>
</template>

<style scoped>
.group {
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 1em 0;
}

button {
  padding: 0.5em 1em;
  margin: 0.5em;
  background-color: #ff9898;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}

button:hover {
  background-color: #ff7171;
}
</style>
