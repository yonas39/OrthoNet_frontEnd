<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import PilgrimageTourDetails from "./PilgrimageTourDetails.vue";

interface Tour {
  _id: string;
  title: string;
  description: string;
  location: string;
  participants: string[];
  dateCreated: string;
  dateUpdated: string;
}

const tours = ref<Tour[]>([]);

const loadPilgrimageTours = async () => {
  try {
    const response = await fetchy("/api/pilgrimage-tours", "GET");
    tours.value = response.tours;
  } catch (error) {
    console.error("Failed to load tours:", error);
  }
};

onMounted(loadPilgrimageTours);
</script>

<template>
  <div>
    <h1>Pilgrimage Tours</h1>
    <ul v-if="tours.length">
      <li v-for="tour in tours" :key="tour._id" class="tour-item">
        <PilgrimageTourDetails :tour="tour" />
      </li>
    </ul>
    <p v-else>No tours available at the moment.</p>
  </div>
</template>

<style scoped>
.tour-item {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
}
</style>
