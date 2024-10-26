<!-- <script setup lang="ts">
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
-->

<script setup lang="ts">
import FollowerList from "./FollowerList.vue";
import FollowingList from "./FollowingList.vue";
import FollowStatus from "./FollowStatus.vue";
import FollowUser from "./FollowUser.vue";
</script>

<template>
  <section class="dashboard">
    <h1>Following System Dashboard</h1>
    <div class="content-grid">
      <FollowingList />
      <FollowerList />
      <FollowUser />
      <FollowStatus />
    </div>
  </section>
</template>

<style scoped>
.dashboard {
  padding: 2rem;
  background-color: #f7f8fa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}
</style>
