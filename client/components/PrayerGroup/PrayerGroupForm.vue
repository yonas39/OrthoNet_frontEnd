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
  <form @submit.prevent="createGroup" class="form-container">
    <fieldset>
      <h2>Create Prayer Group</h2>
      <legend>Create Prayer Group</legend>

      <input v-model="form.title" placeholder="Group Title" required />
      <input v-model="form.topic" placeholder="Group Topic" required />
      <input v-model="form.startTime" type="datetime-local" placeholder="Start Time" required />
      <input v-model="form.endTime" type="datetime-local" placeholder="End Time" required />
      <input v-model.number="form.NumParticipants" type="number" placeholder="Number of Participants" min="1" required />

      <button type="submit" class="submit-button" :disabled="form.loading">
        {{ form.loading ? "Creating..." : "Create Group" }}
      </button>

      <p v-if="form.errorMessage" class="error">{{ form.errorMessage }}</p>
      <p v-if="form.successMessage" class="success">{{ form.successMessage }}</p>
    </fieldset>
  </form>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1em;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

fieldset {
  border: none;
  padding: 0;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 1em;
}

legend {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 1em;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #ff9898;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.submit-button:hover:not(:disabled) {
  background-color: #ff7171;
}

.error {
  color: red;
  text-align: center;
}

.success {
  color: green;
  text-align: center;
}
</style>
