import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import { auth } from '@/firebase'
import EmergencyResources from '@/components/common/EmergencyResources.vue'
import Loading from '@/components/common/Loading.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { 
      title: 'LiftUp - Mental Health Support',
      requiresAuth: false,
      showFooter: true,
      showNavbar: true
    }
  },
  {
    path: '/resources',
    name: 'Resources',
    component: () => import('@/views/Resources.vue'),
    meta: { 
      title: 'Mental Wellness Resources - LiftUp',
      requiresAuth: false,
      showFooter: true,
      showNavbar: true
    }
  },
  {
    path: '/forum',
    name: 'Forum',
    component: () => import('@/views/Forum.vue'),
    meta: { 
      title: 'Anonymous Forum - LiftUp',
      requiresAuth: false,
      showFooter: false,
      showNavbar: true
    }
  },
  {
    path: '/self-care',
    name: 'SelfCare',
    component: () => import('@/views/SelfCare.vue'),
    meta: { 
      title: 'Self-Care Tips - LiftUp',
      requiresAuth: false,
      showFooter: true,
      showNavbar: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: { 
      title: 'About LiftUp',
      requiresAuth: false,
      showFooter: true,
      showNavbar: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: { 
      title: 'Your Profile - LiftUp',
      requiresAuth: true,
      showFooter: true,
      showNavbar: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/auth/Login.vue'),
    meta: { 
      title: 'Login - LiftUp',
      requiresGuest: true,
      showFooter: false,
      showNavbar: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/auth/Register.vue'),
    meta: { 
      title: 'Register - LiftUp',
      requiresGuest: true,
      showFooter: false,
      showNavbar: false
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/components/auth/ForgotPassword.vue'),
    meta: { 
      title: 'Forgot Password - LiftUp',
      requiresGuest: true,
      showFooter: false,
      showNavbar: false
    }
  },
  {
    path: '/emergency',
    name: 'Emergency',
    component: EmergencyResources,
    meta: { 
      title: 'Emergency Resources - LiftUp',
      requiresAuth: false,
      showFooter: true,
      showNavbar: true
    }
  },
  {
    path: '/emergency/neura',
    name: 'NeuraAI', // Unique name
    component: () => import('@/views/NeuraAI.vue'),
    meta: {
      title: 'NeuraAI',
      requiresAuth: false,
      showFooter: false,
      showNavbar: false
    }
  },
  {
    path: '/emergency/findtherapist',
    name: 'FindTherapist', // Unique name
    component: () => import('@/views/Thefinder.vue'),
    meta: {
      title: 'Finder Therapist',
      requiresAuth: false,
      showFooter: false,
      showNavbar: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/',
    meta: { 
      showFooter: true,
      showNavbar: true
    }
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

// Loading state management
let isLoading = false
let loadingInstance = null

router.beforeEach(async (to, from, next) => {
  if (!isLoading) {
    isLoading = true
    const app = document.getElementById('app')
    loadingInstance = document.createElement('div')
    loadingInstance.id = 'router-loading'
    app.appendChild(loadingInstance)
    const { createApp } = await import('vue')
    createApp(Loading).mount('#router-loading')
  }

  document.title = to.meta.title || 'LiftUp - Mental Health Support'

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

router.afterEach(() => {
  if (isLoading && loadingInstance) {
    setTimeout(() => {
      const loadingElement = document.getElementById('router-loading')
      if (loadingElement) {
        loadingElement.remove()
      }
      isLoading = false
      loadingInstance = null
    }, 300)
  }
})

export default router