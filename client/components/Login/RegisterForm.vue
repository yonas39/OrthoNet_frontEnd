<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const { createUser, loginUser, updateSession } = useUserStore();

async function register() {
  await createUser(username.value, password.value);
  await loginUser(username.value, password.value);
  void updateSession();
  void router.push({ name: "Home" });
}
</script>

<template class="all">
  <form class="register-container" @submit.prevent="register">
    <div class="register-form">
      <h2>Create an OrthoNet account</h2>
      <fieldset>
        <div>
          <input v-model.trim="username" type="text" placeholder="Username" required />
        </div>
        <div>
          <input type="password" v-model.trim="password" placeholder="Password" required />
        </div>
        <div>
          <button type="submit" class="signup-button">Register</button>
        </div>
      </fieldset>
    </div>
  </form>
</template>

<style scoped>
template .all {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7b7b7;
  font-family: "Georgia", serif;
}
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
  background-color: #f7b7b7;
  font-family: "Georgia", serif;
}

.register-form {
  background-color: #f4c6c6;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.register-form h2 {
  margin-bottom: 20px;
  text-align: center;
  font-weight: normal;
}

.register-form input {
  /* width: 95%; */
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  background-color: #e8e8e8;
  align-items: center;
}

.signup-button {
  /* width: 100%; */
  padding: 10px;
  background-color: #ff8b8b;
  border: none;
  border-radius: 5px;
  color: #e8e8e8;
  font-weight: bold;
  cursor: pointer;
  align-items: center;
}
</style>
