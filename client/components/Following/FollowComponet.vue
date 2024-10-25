<script setup lang="ts">
import FollowerList from "./FollowerList.vue";
import FollowingList from "./FollowingList.vue";
import FollowStatus from "./FollowStatus.vue";
// Example import in App.vue or another component

// import PilgrimageTourList from "../PilgrimageTour/PilgrimageTourList.vue";
import FollowUser from "./FollowUser.vue";
</script>

<template>
  <section>
    <PilgrimageTourList />
    <h1>Following System Dashboard</h1>
    <FollowingList />
    <FollowerList />
    <FollowUser />

    <FollowStatus />
  </section>
</template>

<style scoped>
section {
  padding: 2em;
}
</style>

<!-- <script setup lang="ts">
import FollowerList from "./FollowerList.vue";
import FollowingList from "./FollowingList.vue";
import FollowStatus from "./FollowStatus.vue";
import FollowUser from "..Following/FollowUser.vue";
</script>

<template>
  <section>
    <h1>Following System Dashboard</h1>
    <FollowingList />
    <FollowerList />
    <FollowUser @refreshFollowing="FollowingList.loadFollowing" />
    <FollowStatus />
  </section>
</template>

<style scoped>
section {
  padding: 2em;
}
</style> -->
