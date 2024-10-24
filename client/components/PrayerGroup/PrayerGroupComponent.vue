<script setup lang="ts">
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
</script>

<template>
  <article class="group">
    <h3>{{ group.title }}</h3>
    <p>{{ group.topic }}</p>
    
    <button @click="joinGroup()">Join Group</button>
    <button @click="leaveGroup()">Leave Group</button>
  </article>
</template>

<style scoped>
.group {
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 1em 0;
}
</style>
