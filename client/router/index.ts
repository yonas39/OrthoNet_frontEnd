import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores/user";
import EventsComponent from "../components/EventCalendar/EventsComponent.vue";

import PrayerSessionManager from "../components/PrayerGroup/PrayerSessionManager.vue";
import FollowComponent from "../components/Following/FollowComponet.vue";
import FriendComponent from "../components/Friends/FriendComponent.vue";
import PilgrimageTourComponent from "../components/PilgrimageTour/PilgrimageTourComponent.vue";
import PrayerMate from "../components/PrayerGroup/PrayerMate.vue"; // Import PrayerMate view
import Questions from "../components/Quiz/Questions.json";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import SettingView from "../views/SettingView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/prayer-session",
      name: "PrayerSessionManager",
      component: PrayerSessionManager,
    },
    {
      path: "/questions",
      name: "Questions",
      component: Questions,
    },
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/setting",
      name: "Settings",
      component: SettingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiresAuth: false },
      beforeEnter: (to, from) => {
        const { isLoggedIn } = storeToRefs(useUserStore());
        if (isLoggedIn.value) {
          return { name: "Settings" };
        }
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
    {
      path: "/prayermate",
      name: "PrayerMate",
      component: PrayerMate,
      // meta: { requiresAuth: true }, // Optional: require login to access PrayerMate
      meta: { requiresAuth: false }, // Optional: require login to access PrayerMate
    },
    {
      path: "/friends",
      name: "Friends",
      component: FriendComponent,
      meta: { requiresAuth: true },
    },

    {
      path: "/follow",
      name: "Follow",
      component: FollowComponent,
    },
    {
      path: "/pilgrimage",
      name: "PilgrimageTourComponent",
      component: PilgrimageTourComponent,
    },
    {
      path: "/events",
      name: "Events",
      component: EventsComponent,
    },
  ],
});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from) => {
  const { isLoggedIn } = storeToRefs(useUserStore());

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: "Login" };
  }
});

export default router;
