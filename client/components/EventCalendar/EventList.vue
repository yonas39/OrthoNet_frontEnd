<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import EventDetails from "./EventDetails.vue";

const events = ref<any[]>([]);
const router = useRouter();
const selectedEvent = ref<any>(null);
const showEventDetails = ref(false);

const fetchEvents = async () => {
  try {
    events.value = await fetchy("/api/events", "GET");
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }
};

const viewEvent = (event: any) => {
  selectedEvent.value = event;
  showEventDetails.value = true;
};

const closeEventDetails = () => {
  showEventDetails.value = false;
  selectedEvent.value = null;
};

const deleteEvent = async (id: string) => {
  try {
    await fetchy(`/api/events/${id}`, "DELETE");
    fetchEvents(); // Refresh the list after deletion
  } catch (error) {
    console.error("Failed to delete event:", error);
  }
};

const joinEvent = async (id: string) => {
  try {
    await fetchy(`/api/events/${id}/attendees`, "POST");
    fetchEvents(); // Refresh the list after deletion
  } catch (error) {
    console.error("Failed to join event:", error);
  }
};

onMounted(fetchEvents);
</script>

<template>
  <div class="event-list">
    <h1>Event List</h1>
    <button class="refresh-button" @click="fetchEvents">Refresh Events</button>
    <div class="event-grid" v-if="events.length">
      <div v-for="event in events" :key="event._id" class="event-card">
        <p><strong>Title:</strong> {{ event.title || "No Title" }}</p>
        <p><strong>Location:</strong> {{ event.location || "No Location" }}</p>
        <p><strong>Description:</strong> {{ event.description }}</p>
        <p><strong>Start Date:</strong> {{ event.startDate }}</p>
        <p><strong>End Date:</strong> {{ event.endDate }}</p>
        <button class="small-button" @click="() => viewEvent(event)">View</button>
        <button class="small-button" @click="() => deleteEvent(event._id)">Delete</button>
        <button class="small-button" @click="() => joinEvent(event._id)">Join</button>
      </div>
    </div>
    <p v-else>No events available.</p>
    <EventDetails :event="selectedEvent" :show="showEventDetails" @close="closeEventDetails" />
  </div>
</template>

<style scoped>
.event-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.event-list h1 {
  text-align: center;
  color: #333;
}

.event-list .small-button {
  width: 4em;
  margin: 0.5em;
  padding: 0.35em;
  background-color: #ff9898;
  color: #040000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.refresh-button {
  width: 100%;
  padding: 10px;
  background-color: #ff9898;
  color: #040000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}

.event-list .small-button:hover {
  background-color: #f67979;
}
.refresh-button:hover {
  background-color: #f67979;
}
.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.event-card {
  background-color: #ffcccb;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid #ccc;
}

.event-card p {
  margin: 0.25em 0;
}
</style>
