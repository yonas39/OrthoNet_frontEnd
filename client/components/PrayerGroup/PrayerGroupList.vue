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
