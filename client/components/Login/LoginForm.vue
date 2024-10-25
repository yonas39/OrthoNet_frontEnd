<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const { loginUser, updateSession } = useUserStore();

async function login() {
  await loginUser(username.value, password.value);
  void updateSession();
  void router.push({ name: "Home" });
}
</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="login">
    <h3>Login</h3>
    <fieldset class="login-container">
      <div>
        <!-- <label for="aligned-name">Username</label> -->
        <input v-model.trim="username" type="text" id="aligned-name" placeholder="Username" required />
        <!-- <label for="aligned-password">Password</label> -->
        <input type="password" v-model.trim="password" id="aligned-password" placeholder="Password" required />
        <button type="submit" class="login-button">Login</button>

        <div class="branding">
          <h1>OrthoNet</h1>
          <p>Designed for Orthodex<br />by Orthodex</p>
        </div>
      </div>
      <!-- <div class="pure-control-group">
        <label for="aligned-name">Username</label>
        <input v-model.trim="username" type="text" id="aligned-name" placeholder="Username" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-password">Password</label>
        <input type="password" v-model.trim="password" id="aligned-password" placeholder="Password" required />
      </div>
      <div class="pure-controls">
        <button type="submit" class="pure-button pure-button-primary">Submit</button>
      </div> -->
    </fieldset>
  </form>
</template>

<!-- <style scoped>
h3 {
  display: flex;
  justify-content: center;
}
</style> -->

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #f7b7b7;
  font-family: "Georgia", serif;
}

.login-header {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.login-header input {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #e8e8e8;
}

.login-button {
  background-color: #ff8b8b;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.branding {
  text-align: center;
  margin-bottom: 50px;
}

.branding h1 {
  font-size: 48px;
  font-weight: bold;
}

.branding p {
  font-style: italic;
  font-size: 18px;
}
</style>
