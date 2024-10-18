<!-- <script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";
const title = ref("");
const topic = ref("");
const emit = defineEmits(["refreshGroups"]);

const createGroup = async () => {
  try {
    await fetchy("/api/prayer/groups", "POST", {
      body: { title: title.value, topic: topic.value },
    });
    emit("refreshGroups");
    clearForm();
  } catch (error) {
    console.error("Failed to create group:", error);
  }
};

const clearForm = () => {
  title.value = "";
  topic.value = "";
};
</script>

<template>
  <form @submit.prevent="createGroup" class="pure-form">
    <fieldset>
      <legend>Create Prayer Group</legend>
      <input v-model="title" placeholder="Group Title" required />
      <input v-model="topic" placeholder="Group Topic" required />
      <button type="submit" class="pure-button pure-button-primary">Create Group</button>
    </fieldset>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style> -->

<script setup lang="ts">
import { ref, reactive } from "vue";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

const { currentUsername } = storeToRefs(useUserStore()); // Fetch the current user ID
const emit = defineEmits(["refreshGroups"]);

const form = reactive({
  title: "",
  topic: "",
  startTime: "",
  endTime: "",
  NumParticipants: 0,
  // active: false,
  loading: false,
  errorMessage: "",
  successMessage: "",
});

// Form submission logic
const createGroup = async () => {
  if (!validateForm()) return;

  form.loading = true;
  form.errorMessage = "";
  form.successMessage = "";
  form.startTime = new Date(form.startTime).toISOString();
  form.endTime = new Date(form.endTime).toISOString();
  // form.active = true;
  try {
    await fetchy("/api/prayer/groups", "POST", {
      body: {
        title: form.title,
        topic: form.topic,
        leader: userId.value, // Set the leader as the current user
      },
    });

    form.successMessage = "Prayer group created successfully!";
    emit("refreshGroups"); // Refresh the group list
    clearForm();
  } catch (error) {
    form.errorMessage = "Failed to create the group. Please try again.";
    console.error("Error creating group:", error);
  } finally {
    form.loading = false;
  }
};

// Validate the form inputs
const validateForm = () => {
  if (!form.title || !form.topic) {
    form.errorMessage = "Both title and topic are required.";
    return false;
  }
  return true;
};

// Clear the form inputs
const clearForm = () => {
  form.title = "";
  form.topic = "";
  form.startTime = "";
  form.endTime = "";
};
</script>

<template>
  <form @submit.prevent="createGroup" class="pure-form">
    <fieldset>
      <legend>Create Prayer Group</legend>

      <input v-model="form.title" placeholder="Group Title" required />
      <input v-model="form.topic" placeholder="Group Topic" required />
      <input v-model="form.startTime" type="datetime-local" placeholder="Start Time" required />
      <input v-model="form.endTime" type="datetime-local" placeholder="End Time" required />
      <input v-model="form.NumParticipants" type="number" placeholder="Number of Participants" required />
      <!-- <label for="active">Active:</label>
      <input v-model="form.active" type="checkbox" placeholder="Active" required /> -->

      <button type="submit" class="pure-button pure-button-primary" :disabled="form.loading">
        {{ form.loading ? "Creating..." : "Create Group" }}
      </button>

      <p v-if="form.errorMessage" class="error">{{ form.errorMessage }}</p>
      <p v-if="form.successMessage" class="success">{{ form.successMessage }}</p>
    </fieldset>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1em;
  max-width: 30em;
  margin: 0 auto;
}

input {
  padding: 0.5em;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1em;
}

button {
  margin-top: 1em;
}

.error {
  color: red;
  font-size: 0.9em;
}

.success {
  color: green;
  font-size: 0.9em;
}
</style>
