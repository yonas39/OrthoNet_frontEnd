<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import PrayerGroupForm from "./PrayerGroupForm.vue";
import PrayerGroupComponent from "./PrayerGroupComponent.vue";
import { fetchy } from "../../utils/fetchy";

const groups = ref([]);
const loaded = ref(false);

const getGroups = async () => {
  try {
    groups.value = await fetchy("/api/prayer/groups", "GET");
    loaded.value = true;
  } catch (error) {
    console.error("Failed to fetch groups:", error);
  }
};

onBeforeMount(getGroups);
</script>

<template>
  <section>
    <PrayerGroupForm @refreshGroups="getGroups" />
    <div v-if="loaded">
      <PrayerGroupComponent v-for="group in groups" :key="group._id" :group="group" @refreshGroups="getGroups" />
    </div>
    <p v-else>Loading...</p>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>
