<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import PrayerGroupComponent from "./PrayerGroupComponent.vue";
import PrayerGroupForm from "./PrayerGroupForm.vue";

interface PrayerGroup {
  _id: string;
  title: string;
  topic: string;
  members: string[];
}

const groups = ref<PrayerGroup[]>([]);
const loaded = ref(false);
const route = useRoute();

const getGroups = async () => {
  try {
    const groupID = route.params.groupID as string;
    if (groupID) {
      const group = await fetchy(`/api/prayer-group/${groupID}`, "GET");
      groups.value = [group];
    } else {
      const response = await fetchy("/api/prayer-groups", "GET");
      groups.value = response.groups;
    }
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

    <h2 v-if="loaded"><strong>List of Prayer Groups</strong></h2>
    <div v-if="loaded" class="prayer-group">
      <PrayerGroupComponent class="each-group" v-for="group in groups" :key="group._id" :group="group" @refreshGroups="getGroups" />
    </div>
    <p v-else>Loading...</p>
  </section>
</template>

<style scoped>
h2 {
  text-align: center;
  margin-top: 3em;
}
section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  /* background-color: #f9f9f9; */
  background-color: #f5c5c7;
  border: 1px solid #000000;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.prayer-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;

  padding: 16px;
  border-radius: 8px;
}

.each-group {
  flex: 1 1 calc(33.333% - 1em);
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.each-group:hover {
  transform: scale(1.05);
}

.each-group h3 {
  margin-top: 0;
  color: #333;
}

.each-group p {
  color: #666;
}
</style>
