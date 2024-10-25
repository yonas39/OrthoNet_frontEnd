<script setup lang="ts">
import { ref } from "vue";

const author = ref("");
const emit = defineEmits(["getPostsByAuthor"]);
</script>

<template>
  <form @submit.prevent="emit('getPostsByAuthor', author)" class="pure-form">
    <fieldset>
      <legend>Search by Author</legend>
      <input id="author" type="text" v-model="author" placeholder="Username" />
      <button type="submit" class="search-button">Search</button>
    </fieldset>
  </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 0.5em;
  padding: 1em;
  align-items: center;
}
.search-button {
  background-color: #f5c5c7;
  font-size: bold;
  border: none;
  border-radius: 4px;
  color: rgb(0, 0, 0);
  cursor: pointer;
  font-size: 1em;
  padding: 0.5em;
}
.search-button:hover {
  background-color: #f69d9c;
}
</style>
