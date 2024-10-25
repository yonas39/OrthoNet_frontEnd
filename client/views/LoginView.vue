<script setup lang="ts">
import LoginForm from "@/components/Login/LoginForm.vue";
import RegisterForm from "@/components/Login/RegisterForm.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
</script>

<template class="layout">
  <main class="column">
    <h1>Please login or register!</h1>
    <LoginForm />
    <RegisterForm />
  </main>
</template>
