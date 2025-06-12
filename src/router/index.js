import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import { auth } from '@/firebase';
import EmergencyResources from '@/components/common/EmergencyResources.vue';

const routes = [
  // Same routes as provided, with added meta.background and hideAllNavigation
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'LiftUp - Mental Health Support',
      requiresAuth: false,
      showFooter: true,
      showNavbar: true,
      background: '#f1f5f9',
    },
  },
  {
    path: '/resources',
    name: 'Resources',
    component: () => import('@/views/Resources.vue'),
    meta: {
      title: 'Mental Wellness Resources - LiftUp',
      requiresAuth: false,
       showFooter: false,
      showNavbar: true,
      background: '#f1f5f9',
    },
  },
  {
    path: '/forum',
    name: 'Forum',
    component: () => import('@/views/Forum.vue'),
    meta: {
      title: 'Anonymous Forum - LiftUp',
      requiresAuth: false,
      showFooter: false,
      showNavbar: true,
      background: '#f1f5f9',
    },
  },
  {
    path: '/self-care',
    name: 'SelfCare',
    component: () => import('@/views/SelfCare.vue'),
    meta: {
      title: 'Self-Care Tips - LiftUp',
      requiresAuth: false,
       showFooter: false,
      showNavbar: true,
      background: '#f1f5f9',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {
      title: 'About LiftUp',
      requiresAuth: false,
       showFooter: false,
      showNavbar: true,
      background: '#f1f5f9',
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      title: 'Your Profile - LiftUp',
      requiresAuth: true,
      showFooter: false,
      showNavbar: true,
      background: '#f1f5f9',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/auth/Login.vue'),
    meta: {
      title: 'Login - LiftUp',
      requiresGuest: true,
      showFooter: false,
      showNavbar: false,
      background: '#ffffff',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/auth/Register.vue'),
    meta: {
      title: 'Register - LiftUp',
      requiresGuest: true,
      showFooter: false,
      showNavbar: false,
      background: '#ffffff',
    },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/components/auth/ForgotPassword.vue'),
    meta: {
      title: 'Forgot Password - LiftUp',
      requiresGuest: true,
      showFooter: false,
      showNavbar: false,
      background: '#ffffff',
    },
  },
  {
    path: '/emergency',
    name: 'Emergency',
    component: EmergencyResources,
    meta: {
      title: 'Emergency Resources - LiftUp',
      requiresAuth: false,
       showFooter: false,
      showNavbar: true,
      background: '#f1f5f9',
    },
  },
  {
    path: '/emergency/neura',
    name: 'NeuraAI',
    component: () => import('@/views/NeuraAI.vue'),
    meta: {
      title: 'NeuraAI',
      requiresAuth: false,
      showFooter: false,
      showNavbar: false,
      hideAllNavigation: true,
      background: 'linear-gradient(135deg, #d3e0ea, #f1f5f9)',
    },
  },
  {
    path: '/emergency/findtherapist',
    name: 'FindTherapist',
    component: () => import('@/views/Thefinder.vue'),
    meta: {
      title: 'Find a Therapist - LiftUp',
      requiresAuth: false,
      showFooter: false,
      showNavbar: true,
      background: '#f1f5f9',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/',
    meta: {
      showFooter: true,
      showNavbar: true,
      background: '#f1f5f9',
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  store.commit('SET_LOADING', true);

  document.title = to.meta.title || 'LiftUp - Mental Health Support';

  await new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      resolve();
      unsubscribe();
    });
  });

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);
  const currentUser = auth.currentUser;
  const isAuthenticated = currentUser !== null;

  if (isAuthenticated) {
    store.commit('SET_USER', {
      uid: currentUser.uid,
      email: currentUser.email,
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
    });
    store.commit('SET_TOKEN', await currentUser.getIdToken());
  } else {
    store.commit('CLEAR_AUTH');
  }

  if (requiresAuth && !isAuthenticated) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  } else if (requiresGuest && isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

router.afterEach(() => {
  setTimeout(() => {
    store.commit('SET_LOADING', false);
  }, 300);
});

export default router;