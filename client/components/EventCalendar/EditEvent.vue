<!-- components/EventDetails.vue -->
<template>
  <div>
    <h1>Edit Event: {{ event.title }}</h1>
    <form @submit.prevent="updateEvent">
      <div>
        <label for="title">Title</label>
        <input id="title" v-model="event.title" type="text" />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea id="description" v-model="event.description"></textarea>
      </div>
      <div>
        <label for="location">Location</label>
        <input id="location" v-model="event.location" type="text" />
      </div>
      <div>
        <label for="startDate">Start Date</label>
        <input id="startDate" v-model="event.startDate" type="date" />
      </div>
      <div>
        <label for="endDate">End Date</label>
        <input id="endDate" v-model="event.endDate" type="date" />
      </div>
      <button type="submit">Update Event</button>
    </form>
  </div>
</template>

<script lang="ts">
import { fetchy } from "@/utils/fetchy";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const event = ref<any>({});

    const fetchEvent = async () => {
      try {
        const eventId = route.params.id as string;
        event.value = await fetchy(`/events/${eventId}`, "GET");
      } catch (error) {
        console.error("Failed to fetch event:", error);
      }
    };

    const updateEvent = async () => {
      try {
        const eventId = route.params.id as string;
        await fetchy(`/events/${eventId}`, "PATCH", { body: event.value });
        router.push("/events");
      } catch (error) {
        console.error("Failed to update event:", error);
      }
    };

    onMounted(fetchEvent);

    return { event, updateEvent };
  },
});
</script>
