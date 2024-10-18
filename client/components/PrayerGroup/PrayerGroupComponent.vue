<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["group"]);
const emit = defineEmits(["refreshGroups"]);

const joinGroup = async () => {
  try {
    await fetchy(`/api/prayer/groups/${props.group._id}/join`, "POST");
    emit("refreshGroups");
  } catch (error) {
    console.error("Failed to join group:", error);
  }
};

const leaveGroup = async () => {
  try {
    await fetchy(`/api/prayer/groups/${props.group._id}/leave`, "POST");
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
    <button class="pure-button" @click="joinGroup">Join</button>
    <button class="pure-button" @click="leaveGroup">Leave</button>
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
