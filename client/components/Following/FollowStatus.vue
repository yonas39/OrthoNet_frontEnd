<!-- <script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";

const targetUsername = ref("");
const status = ref("");
const checkFollowStatus = async () => {
  try {
    const response = await fetchy(`/api/follow/status`, "POST", {
      body: { username: targetUsername.value },
    });
    status.value = response.isFollowing ? "Following" : "Not Following";
  } catch (error) {
    console.error("Failed to check follow status:", error);
  }
};
</script>

<template>
  <section class="status-section">
    <h2>Check Follow Status</h2>
    <input v-model="targetUsername" placeholder="Enter username" />
    <button @click="checkFollowStatus">Check Status</button>
    <p v-if="status">{{ status }}</p>
  </section>
</template>

<style scoped>
.status-section {
  padding: 1.5rem;
  text-align: center;
}

input {
  margin-top: 1rem;
  padding: 0.5rem;
  width: 80%;
  max-width: 300px;
}
button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style> -->

<!-- <script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";

const targetUsername = ref("");
const status = ref("");
const errorMessage = ref("");

const checkFollowStatus = async () => {
  if (!targetUsername.value.trim()) {
    errorMessage.value = "Please enter a valid username.";
    return;
  }

  try {
    const response = await fetchy(`/api/follow/status`, "POST", {
      body: { username: targetUsername.value },
    });

    if (!response || response.error) {
      throw new Error(response?.error || "User not found!");
    }

    status.value = response.isFollowing ? "Following" : "Not Following";
    errorMessage.value = "";
  } catch (error) {
    errorMessage.value = error.message;
    console.error("Failed to check follow status:", error);
  }
};
</script>

<template>
  <section class="status-section">
    <h2>Check Follow Status</h2>
    <input v-model="targetUsername" placeholder="Enter username" />
    <button @click="checkFollowStatus">Check Status</button>
    <p v-if="status">{{ status }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </section>
</template>

<style scoped>
.status-section {
  padding: 1.5rem;
  text-align: center;
}

input {
  margin-top: 1rem;
  padding: 0.5rem;
  width: 80%;
  max-width: 300px;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style> -->

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { currentUsername } = storeToRefs(useUserStore());
const targetUsername = ref("");
const status = ref<string | null>(null);

const checkFollowStatus = async () => {
  try {
    const response = await fetchy("/api/follow/status", "POST", {
      body: { follower: currentUsername.value, following: targetUsername.value },
    });
    status.value = response.isFollowing ? "Following" : "Not Following";
  } catch (error) {
    console.error("Failed to check follow status:", error);
  }
};
</script>

<template>
  <section>
    <h2>Check Follow Status</h2>
    <input v-model="targetUsername" placeholder="Enter username" />
    <button @click="checkFollowStatus">Check Status</button>
    <p v-if="status">{{ currentUsername }} is {{ status }} {{ targetUsername }}</p>
  </section>
</template>

<style scoped>
/* button {
  margin-top: 1em;
} */
.status-section {
  padding: 1.5rem;
  text-align: center;
}

input {
  margin-top: 1rem;
  padding: 0.5rem;
  width: 80%;
  max-width: 300px;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
