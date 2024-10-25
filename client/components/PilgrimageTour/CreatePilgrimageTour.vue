<template>
  <div>
    <h1>Create a Pilgrimage Tour</h1>
    <form @submit.prevent="createTour">
      <input v-model="title" placeholder="Tour Title" required />
      <textarea v-model="description" placeholder="Tour Description" required></textarea>
      <input v-model="location" placeholder="Location" required />
      <button type="submit">Create Tour</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  name: "CreatePilgrimageTour",
  setup() {
    const title = ref("");
    const description = ref("");
    const location = ref("");

    const createTour = async () => {
      await axios.post("/api/pilgrimage-tour", {
        title: title.value,
        description: description.value,
        location: location.value,
      });
      alert("Tour created successfully!");
    };

    return { title, description, location, createTour };
  },
};
</script>
