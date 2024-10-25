<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

let username = ref("");
let currentPassword = ref("");
let newPassword = ref("");

const { updateUserUsername, updateUserPassword, updateSession } = useUserStore();

async function updateUsername() {
  await updateUserUsername(username.value);
  await updateSession();
  username.value = "";
}

async function updatePassword() {
  await updateUserPassword(currentPassword.value, newPassword.value);
  await updateSession();
  currentPassword.value = newPassword.value = "";
}
</script>

<template>
  <div class="form-container">
    <h2>Update User Details</h2>
    <form @submit.prevent="updateUsername" class="pure-form">
      <fieldset>
        <legend>Change Your Username</legend>
        <input type="text" placeholder="New Username" v-model="username" required />
        <button type="submit" class="pure-button pure-button-primary">Update Username</button>
      </fieldset>
    </form>

    <form @submit.prevent="updatePassword" class="pure-form">
      <fieldset>
        <legend>Change Your Password</legend>
        <input type="password" placeholder="Old Password" v-model="currentPassword" required />
        <input type="password" placeholder="New Password" v-model="newPassword" required />
        <button type="submit" class="pure-button pure-button-primary">Update Password</button>
      </fieldset>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 2em;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #eeb4b4;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #040000; /* Updated text color */
  margin-bottom: 1em;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

fieldset {
  border: none;
  padding: 0;
}

legend {
  font-size: 1.2em;
  color: #040000; /* Updated text color */
  margin-bottom: 1em;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  width: 100%;
  padding: 10px;
  margin: 0.25em 0;
  background-color: #f98282; /* Light pink background */
  color: #040000; /* Updated text color */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}

button:hover {
  background-color: #ff7f7f; /* Slightly darker pink for hover effect */
}
</style>
