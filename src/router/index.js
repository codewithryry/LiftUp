import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import { auth } from '@/firebase'
import EmergencyResources from '@/components/common/EmergencyResources.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    meta: { 
      title: 'LiftUp - Mental Health Support',
      requiresAuth: false 
    }
  },
  {
    path: '/resources',
    name: 'Resources',
    component: () => import(/* webpackChunkName: "forum" */ '@/views/Resources.vue'),
    meta: { 
      title: 'Mental Wellness Resources - LiftUp',
      requiresAuth: true 
    }
  },
  {
    path: '/forum',
    name: 'Forum',
    component: () => import(/* webpackChunkName: "forum" */ '@/views/Forum.vue'),
    meta: { 
      title: 'Anonymous Forum - LiftUp',
      requiresAuth: true 
    }
  },
  {
    path: '/self-care',
    name: 'SelfCare',
    component: () => import(/* webpackChunkName: "selfcare" */ '@/views/SelfCare.vue'),
    meta: { 
      title: 'Self-Care Tips - LiftUp',
      requiresAuth: false 
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    meta: { 
      title: 'About LiftUp',
      requiresAuth: false 
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile.vue'),
    meta: { 
      title: 'Your Profile - LiftUp',
      requiresAuth: true 
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "auth" */ '@/components/auth/Login.vue'),
    meta: { 
      title: 'Login - LiftUp',
      requiresGuest: true 
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "auth" */ '@/components/auth/Register.vue'),
    meta: { 
      title: 'Register - LiftUp',
      requiresGuest: true 
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import(/* webpackChunkName: "auth" */ '@/components/auth/ForgotPassword.vue'),
    meta: { 
      title: 'Forgot Password - LiftUp',
      requiresGuest: true 
    }
  },
  {
    path: '/emergency',
    name: 'Emergency',
    component: EmergencyResources,
    meta: { 
      title: 'Emergency Resources - LiftUp',
      requiresAuth: false 
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Update page title
router.beforeEach((to) => {
  document.title = to.meta.title || 'LiftUp - Mental Health Support'
})

// Auth guard with Firebase integration
router.beforeEach(async (to, from, next) => {
  // Wait for Firebase to initialize
  await new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      resolve()
      unsubscribe()
    })
  })

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
  
  const currentUser = auth.currentUser
  const isAuthenticated = currentUser !== null

  // Update store with current auth state
  if (isAuthenticated) {
    store.commit('SET_USER', {
      uid: currentUser.uid,
      email: currentUser.email,
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL
    })
    store.commit('SET_TOKEN', await currentUser.getIdToken())
  } else {
    store.commit('CLEAR_AUTH')
  }

  if (requiresAuth && !isAuthenticated) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (requiresGuest && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router