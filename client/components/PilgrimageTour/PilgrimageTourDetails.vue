<!-- <script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { fetchy } from "../../utils/fetchy";
import JoinTourComponent from "./JoinTourComponent.vue";

interface Tour {
  _id: string;
  title: string;
  description: string;
  location: string;
  participants: string[];
  dateCreated: string;
  dateUpdated: string;
}

const props = defineProps<{ tour: Tour }>();
const tour = ref<Tour | null>(null);
const route = useRoute();

onMounted(async () => {
  try {
    const tourID = props.tour._id;

    const response = await fetchy(`/api/pilgrimage-tour/${tourID}`, "GET");
    tour.value = response;
  } catch (error) {
    console.error("Failed to load tour details:", error);
  }
});
</script>

<template>
  <h1>Pilgrimage Tours DETAILS</h1>

  <div v-if="tour">
    <h3>Title: {{ tour.title }}</h3>
    <p><strong>Description:</strong> {{ tour.description }}</p>
    <p><strong>Location:</strong> {{ tour.location }}</p>
    <p><strong>Date Created:</strong> {{ new Date(tour.dateCreated).toLocaleDateString() }}</p>
    <p><strong>Date Updated:</strong> {{ new Date(tour.dateUpdated).toLocaleDateString() }}</p>
    <p><strong>Participants:</strong> {{ tour.participants.length }}</p>
    <JoinTourComponent :tourID="tour._id" />
    <router-link to="/">Back to Tours</router-link>
  </div>
</template> -->

<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import JoinTourComponent from "./JoinTourComponent.vue";

interface Tour {
  _id: string;
  title: string;
  description: string;
  location: string;
  participants: string[];
  dateCreated: string;
  dateUpdated: string;
}

const props = defineProps<{ tour: Tour }>();
// const tour = ref<Tour | null>(props.tour || null);
const tour = ref<Tour | null>(null);

const getPilgrimageTour = async () => {
  if (!tour.value) {
    try {
      const tourID = props.tour._id;
      const response = await fetchy(`/api/pilgrimage-tour/${tourID}`, "GET");
      tour.value = response as Tour;
    } catch (error) {
      console.error("Failed to load tour details:", error);
    }
  }
};
getPilgrimageTour();
</script>

<template>
  <h1>Pilgrimage Tour DETAILS</h1>
  <div v-if="tour">
    <h3>Title: {{ tour.title }}</h3>
    <p><strong>Description:</strong> {{ tour.description }}</p>
    <p><strong>Location:</strong> {{ tour.location }}</p>
    <p><strong>Date Created:</strong> {{ new Date(tour.dateCreated).toLocaleDateString() }}</p>
    <p><strong>Date Updated:</strong> {{ new Date(tour.dateUpdated).toLocaleDateString() }}</p>
    <p><strong>Participants:</strong> {{ tour.participants.length }}</p>
    <JoinTourComponent :tourID="tour._id" />
    <!-- <router-link to="/">Back to Tours</router-link> -->
  </div>
</template>
