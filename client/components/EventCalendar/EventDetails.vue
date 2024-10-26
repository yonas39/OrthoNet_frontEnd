<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";

const props = defineProps<{
  event: any;
  show: boolean;
}>();

const currentUser = ref();
const emit = defineEmits(["close"]);

const joinEvent = async () => {
  try {
    await fetchy(`/api/events/${props.event._id}/attendees`, "POST");
    emit("close");
  } catch (error) {
    console.error("Failed to join event:", error);
  }
};

const isAttendee = () => {
  return !props.event.attendees.includes("user_id");
};

// const isAttendee = () => {
//   return props.event.attendees.some((attendee: any) => attendee._id === props.currentUser._id);
// };
</script>

<template>
  <!-- {{ props }} -->
  <div v-if="show" class="overlay">
    <div class="event-details">
      <button class="close-button" @click="$emit('close')">Close</button>
      <h2><strong>Title:</strong> {{ event.title }}</h2>
      <p><strong>Location:</strong> {{ event.location }}</p>
      <p><strong>Description:</strong> {{ event.description }}</p>
      <p><strong>Start Date:</strong> {{ event.startDate }}</p>
      <p><strong>End Date:</strong> {{ event.endDate }}</p>
      <p><strong>Attendees:</strong> {{ event.attendees.length }}</p>
      <!-- <button @click="joinEvent" v-if="isAttendee()">Join</button> -->
      <button v-if="!isAttendee()" @click="joinEvent">Join</button>
      <!-- <button @click="leaveEvent">Leave</button>
      <button @click="startSession">Start Session</button> -->
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

.event-details {
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
</style>
