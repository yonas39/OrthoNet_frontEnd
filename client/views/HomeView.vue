<script setup lang="ts">
// import EventCalendar from "@/components/Calendar/EventCalendar.vue";
// import GroupsLeaders from "@/components/Groups/GroupsLeaders.vue";
// import Pilgrimage from "@/components/Pilgrimage/Pilgrimage.vue";
import EventsComponent from "@/components/EventCalendar/EventsComponent.vue";
import FollowComponet from "@/components/Following/FollowComponet.vue";
import FriendList from "@/components/Friends/FriendList.vue";
import PilgrimageTourComponent from "@/components/PilgrimageTour/PilgrimageTourComponent.vue";
import PostListComponent from "@/components/Post/PostListComponent.vue";
import PrayerMate from "@/components/PrayerGroup/PrayerMate.vue";
import Branding from "./Branding.vue";
import LoginView from "./LoginView.vue";
// import LoginForm from "../components/Login/LoginForm.vue";
import UpdateUserForm from "./SettingView.vue";
// import Tracker from "@/components/Tracker/Tracker.vue";
import BibleVerse from "./BibleVerse.vue";

import BibleQuiz from "@/components/Quiz/BibleQuiz.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());

// Track the currently selected component to render
const activeComponent = ref("PostListComponent");

const componentsMap: Record<string, any> = {
  PostListComponent,
  PrayerMate,
  FriendList,
  FollowComponet,
  PilgrimageTourComponent,
  EventsComponent,
  UpdateUserForm,
  // BibleVerse,
  BibleQuiz,
};
// Function to switch the active component
function setActiveComponent(name: string) {
  activeComponent.value = name;
}
</script>

<template>
  <div class="layout" v-if="isLoggedIn">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="profile">
        <!-- <img class="profile-icon">👤</img> -->
        <img class="profile-icon" src="https://t3.ftcdn.net/jpg/01/91/01/78/360_F_191017886_YIfoLtRxVw8PIeAMtR0i4ZDwAyKutVI2.jpg" alt="" />

        <h2>{{ currentUsername }}</h2>
      </div>
      <nav class="options">
        <ul>
          <li @click="setActiveComponent('PostListComponent')" :class="{ active: activeComponent === 'PostListComponent' }">Home</li>
          <li @click="setActiveComponent('PrayerMate')" :class="{ active: activeComponent === 'PrayerMate' }">PrayerMate</li>
          <li @click="setActiveComponent('BibleQuiz')" :class="{ active: activeComponent === 'BibleQuiz' }">Bible Quiz</li>
          <li @click="setActiveComponent('FollowComponet')" :class="{ active: activeComponent === 'FollowComponet' }">Followers</li>
          <li @click="setActiveComponent('FriendList')" :class="{ active: activeComponent === 'FriendList' }">Friends</li>
          <!-- <li @click="setActiveComponent('PilgrimageTourComponent')" :class="{ active: activeComponent === 'PilgrimageTourComponent' }">Pilgrimage</li> -->
          <!-- <li @click="setActiveComponent('BibleVerse')" :class="{ active: activeComponent === 'BibleVerse' }">Bible Verse</li> -->
          <!-- <li @click="setActiveComponent('Tracker')" :class="{ active: activeComponent === 'Tracker' }">Tracker</li> -->
          <li @click="setActiveComponent('EventsComponent')" :class="{ active: activeComponent === 'EventsComponent' }">Event Calendar</li>
          <!-- <li @click="setActiveComponent('GroupsLeaders')" :class="{ active: activeComponent === 'GroupsLeaders' }">Groups/ Leaders</li> -->
          <li @click="setActiveComponent('UpdateUserForm')" :class="{ active: activeComponent === 'UpdateUserForm' }">Settings</li>
        </ul>
      </nav>
    </aside>

    <!-- Main content -->
    <main class="main-content">
      <!-- Dynamically render the selected component -->
      <component :is="componentsMap[activeComponent]" />
    </main>

    <!-- Schedule section -->
    <aside class="schedule">
      <BibleVerse />
    </aside>
  </div>

  <div v-else class="logout-view">
    <Branding />

    <LoginView />

    <!-- <LoginForm />
    <RegisterForm /> -->
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100%;
  background-color: #f2b8b5; /* Light pink background */
}

/* Sidebar Styles */
.sidebar {
  width: 250px;
  background-color: #f5c5c7;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 2rem;
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-icon {
  margin-top: 1rem;
  width: 1.2em;
  height: 1.2em;
  border-radius: 50%;
  font-size: 3rem;
  /* margin-bottom: 0.5rem; */
}

nav ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
  text-align: center;
}

nav li {
  padding: 0.75rem 0;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

nav li.active {
  background-color: #8c5151;
  width: 100%;
  color: white;
}

/* Logout Button */
.logout-button {
  background-color: #f69d9c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-top: auto;
}

/* Main Content */
.main-content {
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  background-color: #e9d9d9; /* Light gray background */
}

/* Main Content */
/* .main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  background-color: #e9d9d9;
} */

/* Schedule Section */
.schedule {
  width: 300px;
  height: 100%;
  padding: 1rem;
  background-color: #f5c5c7;
  position: sticky;
  top: 0;
  right: 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.calendar-icon {
  font-size: 5rem;
  margin-top: 1rem;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f2b8b5;
}

.logout-view {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: row;
  justify-content: space-around; /* Changed from space-between to space-around */
  height: 100%;
  background-color: #f2b8b5;
}
.options {
  width: 250px;

  padding: 1rem;
  background-color: #f5c5c7;
  position: sticky;
  top: 0;
  right: 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
