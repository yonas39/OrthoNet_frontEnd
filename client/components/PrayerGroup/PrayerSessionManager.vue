<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["group"]);
const emit = defineEmits(["refreshGroups"]);

const startSession = async () => {
  try {
    await fetchy(`/api/prayer-session/start/${props.group._id}`, "POST");
    emit("refreshGroups");
  } catch (error) {
    console.error("Failed to start session:", error);
  }
};

const endSession = async () => {
  try {
    await fetchy(`/api/prayer-session/end/${props.group._id}`, "PUT");
    emit("refreshGroups");
  } catch (error) {
    console.error("Failed to end session:", error);
  }
};
</script>

<template>
  <div>
    <button class="pure-button" @click="startSession">Start Session</button>
    <button class="pure-button" @click="endSession">End Session</button>
  </div>
</template>

<style scoped>
button {
  margin: 0.5em;
}
</style>
