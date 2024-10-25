<!-- <template>
  <button :disabled="isJoining" @click="joinTour">
    {{ isJoining ? "Joining..." : "Join Tour" }}
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps<{ tourID: string }>();
const isJoining = ref(false);

const joinTour = async () => {
  try {
    isJoining.value = true;
    const response = await fetchy(`/api/pilgrimage-tour/${props.tourID}/join`, "POST");

    if (response.success) {
      alert("You have successfully joined the tour!");
    } else {
      throw new Error(response.message || "Failed to join.");
    }
  } catch (error) {
    console.error("Failed to join the tour:", error);
    // alert("Failed to join the tour. Please try again later.");
  } finally {
    isJoining.value = false;
  }
};
</script>

<style scoped>
button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
</style> -->

<template>
  <button>Join Tour</button>
</template>

<!--
<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps<{ tourID: string }>();
const isJoining = ref(false);

const joinTour = async () => {
  try {
    isJoining.value = true;
    const response = await fetchy(`/api/pilgrimage-tour/${props.tourID}/join`, "POST");

    if (response.success) {
      alert("You have successfully joined the tour!");
    } else {
      throw new Error(response.message || "Failed to join.");
    }
  } catch (error) {
    console.error("Failed to join the tour:", error);
    alert("Failed to join the tour. Please try again later.");
  } finally {
    isJoining.value = false;
  }
};
</script>

<template>
  <button :disabled="isJoining" @click="joinTour">
    {{ isJoining ? "Joining..." : "Join Tour" }}
  </button>
</template>

<style scoped>
button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
</style> -->
