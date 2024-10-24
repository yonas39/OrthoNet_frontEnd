<script setup lang="ts">
import { useUserStore } from "@/stores/user"; // Import the store
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";

// Access the username directly from the user store
const userStore = useUserStore();
const emit = defineEmits(["refreshGroups"]);

// Form data for group creation
const form = ref({
  title: "",
  topic: "",
  startTime: "",
  endTime: "",
  NumParticipants: 0,
  loading: false,
  errorMessage: "",
  successMessage: "",
});

// Function to create a group and store it in MongoDB via the backend
const createGroup = async () => {
  if (!validateForm()) return;

  form.value.loading = true;
  form.value.errorMessage = "";
  form.value.successMessage = "";
  form.value.startTime = new Date(form.value.startTime).toISOString();
  form.value.endTime = new Date(form.value.endTime).toISOString();

  try {
    // Send request to backend API to create the prayer group
    await fetchy("/api/prayer-group", "POST", {
      body: {
        title: form.value.title,
        topic: form.value.topic,
        leader: userStore.currentUsername, // Access username directly
        startTime: form.value.startTime,
        endTime: form.value.endTime,
        NumParticipants: form.value.NumParticipants,
      },
    });

    form.value.successMessage = "Prayer group created successfully!";
    emit("refreshGroups"); // Trigger a refresh if needed
    clearForm(); // Reset form after successful submission
  } catch (error) {
    form.value.errorMessage = "Failed to create the group. Please try again.";
    console.error("Error creating group:", error);
  } finally {
    form.value.loading = false;
  }
};

// Validate that all required fields are filled
const validateForm = () => {
  if (!form.value.title || !form.value.topic || !form.value.startTime || !form.value.endTime || form.value.NumParticipants <= 0) {
    form.value.errorMessage = "All fields are required, and participants must be at least 1.";
    return false;
  }
  return true;
};

// Clear the form after successful submission
const clearForm = () => {
  form.value.title = "";
  form.value.topic = "";
  form.value.startTime = "";
  form.value.endTime = "";
  form.value.NumParticipants = 0;
};
</script>

<template>
  <form @submit.prevent="createGroup" class="pure-form">
    <fieldset>
      <h1>Create Prayer Group</h1>
      <legend>Create Prayer Group</legend>

      <input v-model="form.title" placeholder="Group Title" required />
      <input v-model="form.topic" placeholder="Group Topic" required />
      <input v-model="form.startTime" type="datetime-local" placeholder="Start Time" required />
      <input v-model="form.endTime" type="datetime-local" placeholder="End Time" required />
      <input v-model.number="form.NumParticipants" type="number" placeholder="Number of Participants" min="1" required />

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

.error {
  color: red;
}

.success {
  color: green;
}
</style>

<!-- <script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { currentUsername } = storeToRefs(useUserStore());
const emit = defineEmits(["refreshGroups"]);

const form = ref({
  title: "",
  topic: "",
  startTime: "",
  endTime: "",
  NumParticipants: 0,
  loading: false,
  errorMessage: "",
  successMessage: "",
});

const createGroup = async () => {
  if (!validateForm()) return;

  form.value.loading = true;
  form.value.errorMessage = "";
  form.value.successMessage = "";
  form.value.startTime = new Date(form.value.startTime).toISOString();
  form.value.endTime = new Date(form.value.endTime).toISOString();

  try {
    await fetchy("/api/prayer-group", "POST", {
      body: {
        title: form.value.title,
        topic: form.value.topic,
        leader: currentUsername.value,
      },
    });

    form.value.successMessage = "Prayer group created successfully!";
    emit("refreshGroups");
    clearForm();
  } catch (error) {
    form.value.errorMessage = "Failed to create the group. Please try again.";
    console.error("Error creating group:", error);
  } finally {
    form.value.loading = false;
  }
};

const validateForm = () => {
  if (!form.value.title || !form.value.topic) {
    form.value.errorMessage = "Both title and topic are required.";
    return false;
  }
  return true;
};

const clearForm = () => {
  form.value.title = "";
  form.value.topic = "";
  form.value.startTime = "";
  form.value.endTime = "";
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
</style> -->
