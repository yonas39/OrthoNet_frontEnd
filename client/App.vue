<script setup lang="ts">
import router from "@/router";
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { toast } = storeToRefs(useToastStore());

const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();

async function logout() {
  await logoutUser();
  void router.push({ name: "Home" });
}

// Make sure to update the session before mounting the app in case the user is already logged in
onBeforeMount(async () => {
  try {
    await userStore.updateSession();
  } catch {
    // User is not logged in
  }
});
</script>

<template>
  <header class="layout">
    <nav>
      <div class="title">
        <!-- <img src="@/assets/images/logo.svg" /> -->
        <img class="profile-icon" src="https://borkena.com/wp-content/uploads/2023/03/Ethiopian-Church.jpg" alt="Profile Image" />
        <RouterLink :to="{ name: 'Home' }">
          <!-- <h1>Social Media App</h1> -->
          <h1>OrthoNet</h1>
          <!-- <Branding /> -->
        </RouterLink>
      </div>
      <ul>
        <li>
          <RouterLink :to="{ name: 'Home' }" :class="{ underline: currentRouteName == 'Home' }"> <button>HOME</button> </RouterLink>
        </li>
        <!-- <li v-if="isLoggedIn"> -->
        <!-- <li> -->
        <!-- <RouterLink :to="{ name: 'PrayerMate' }" :class="{ underline: currentRouteName == 'PrayerMate' }"> PrayerMate </RouterLink> -->
        <!-- <button @click="logout">Logout</button>
        </li> -->
        <li v-if="isLoggedIn">
          <!-- <RouterLink :to="{ name: 'Settings' }" :class="{ underline: currentRouteName == 'Settings' }"> Setting </RouterLink> -->
          <button @click="logout">Logout</button>
        </li>
        <li v-else>
          <RouterLink :to="{ name: 'Login' }" :class="{ underline: currentRouteName == 'Login' }"> Login </RouterLink>
        </li>
      </ul>
    </nav>
    <article v-if="toast !== null" class="toast" :class="toast.style">
      <p>{{ toast.message }}</p>
    </article>
  </header>
  <RouterView />
</template>

<style scoped>
@import "./assets/toast.css";

nav {
  padding: 1em 2em;
  /* background-color: lightgray; */
  background-color: #fda49d; /* Light pink background */
  display: flex;
  align-items: center;
}

h1 {
  /* Add a nice and fancy looking font-family
   */
  font-family: didot;

  font-size: 2em;
  margin: 0;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

/* img {
  height: 2em;
} */
.profile-icon {
  width: 1.5em;
  height: 1.5em;
  /* border-radius: 50%; */
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

a {
  font-size: large;
  color: black;
  text-decoration: none;
}

ul {
  list-style-type: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1em;
}

.underline {
  text-decoration: underline;
}
</style>
