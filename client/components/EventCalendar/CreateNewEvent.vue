<!-- <script lang="ts">
import { fetchy } from "@/utils/fetchy";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const newEvent = ref({
      title: "",
      description: "",
      location: "",
      startDate: "",
      endDate: "",
    });

    const createNewEvent = async () => {
      try {
        await fetchy("/api/events", "POST", { body: newEvent.value });
        router.push("/events");
      } catch (error) {
        console.error("Failed to create event:", error);
      }
    };

    return { newEvent, createNewEvent };
  },
});
</script>

<template>
  <div>
    <h1>Create New Event</h1>
    <form @submit.prevent="createNewEvent">
      <div>
        <label for="title">Title</label>
        <input id="title" v-model="newEvent.title" type="text" />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea id="description" v-model="newEvent.description"></textarea>
      </div>
      <div>
        <label for="location">Location</label>
        <input id="location" v-model="newEvent.location" type="text" />
      </div>
      <div>
        <label for="startDate">Start Date</label>
        <input id="startDate" v-model="newEvent.startDate" type="date" />
      </div>
      <div>
        <label for="endDate">End Date</label>
        <input id="endDate" v-model="newEvent.endDate" type="date" />
      </div>
      <button type="submit">Create Event</button>
    </form>
  </div>
</template>

<style scoped>

</style> -->

<script lang="ts">
import { fetchy } from "@/utils/fetchy";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const newEvent = ref({
      title: "",
      description: "",
      location: "",
      startDate: "",
      endDate: "",
    });

    const createNewEvent = async () => {
      try {
        await fetchy("/api/events", "POST", { body: newEvent.value });
        router.push("/events");
      } catch (error) {
        console.error("Failed to create event:", error);
      }
    };

    return { newEvent, createNewEvent };
  },
});
</script>

<template>
  <div class="form-container">
    <h1>Create New Event</h1>
    <form @submit.prevent="createNewEvent">
      <div class="form-group">
        <label for="title">Title</label>
        <input id="title" v-model="newEvent.title" type="text" required />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="newEvent.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="location">Location</label>
        <input id="location" v-model="newEvent.location" type="text" required />
      </div>
      <div class="form-group">
        <label for="startDate">Start Date</label>
        <input id="startDate" v-model="newEvent.startDate" type="date" required />
      </div>
      <div class="form-group">
        <label for="endDate">End Date</label>
        <input id="endDate" v-model="newEvent.endDate" type="date" required />
      </div>
      <button type="submit" class="submit-button">Create Event</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1em;
  max-width: 50%;

  margin: 3em auto;

  padding: 20px;
  background-color: #f6cece;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 1em;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  margin-top: 1em;
}

label {
  font-size: 1em;
  color: #666;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

input:focus,
textarea:focus {
  border-color: #007bff;
  outline: none;
}

.submit-button {
  width: 100%;
  padding: 10px;
  margin: 1em 0;
  background-color: #ff9898;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}

.submit-button:hover {
  background-color: #f67979;
}
</style>
