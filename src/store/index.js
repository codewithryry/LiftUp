import { createStore } from 'vuex'
import auth from '@/services/auth'
import {
  fetchForumPosts,
  fetchUserPosts,
  fetchPostById,
  createForumPost,
  updateForumPost,
  deleteForumPost,
  addComment,
  deleteComment,
  fetchUserStats
} from '@/services/forum'
import {
  fetchResources,
  fetchSavedResources,
  toggleSavedResource,
  fetchSelfCareTips,
  saveSelfCareActivity,
  fetchActivityHistory
} from '@/services/resources'

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    forumPosts: [],
    userPosts: [],
    currentPost: null,
    resources: [],
    savedResources: [],
    selfCareTips: [],
    activityHistory: [],
    userStats: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    CLEAR_AUTH(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
    SET_FORUM_POSTS(state, posts) {
      state.forumPosts = posts
    },
    SET_USER_POSTS(state, posts) {
      state.userPosts = posts
    },
    SET_CURRENT_POST(state, post) {
      state.currentPost = post
    },
    ADD_FORUM_POST(state, post) {
      state.forumPosts.unshift(post)
    },
    UPDATE_FORUM_POST(state, updatedPost) {
      const index = state.forumPosts.findIndex(p => p.id === updatedPost.id)
      if (index !== -1) {
        state.forumPosts.splice(index, 1, updatedPost)
      }
    },
    REMOVE_FORUM_POST(state, postId) {
      state.forumPosts = state.forumPosts.filter(post => post.id !== postId)
    },
    SET_RESOURCES(state, resources) {
      state.resources = resources
    },
    SET_SAVED_RESOURCES(state, resources) {
      state.savedResources = resources
    },
    TOGGLE_SAVED_RESOURCE(state, resourceId) {
      const index = state.savedResources.findIndex(r => r.id === resourceId)
      if (index === -1) {
        const resource = state.resources.find(r => r.id === resourceId)
        if (resource) {
          state.savedResources.push(resource)
        }
      } else {
        state.savedResources.splice(index, 1)
      }
    },
    SET_SELF_CARE_TIPS(state, tips) {
      state.selfCareTips = tips
    },
    SET_ACTIVITY_HISTORY(state, activities) {
      state.activityHistory = activities
    },
    ADD_ACTIVITY(state, activity) {
      state.activityHistory.push(activity)
    },
    SET_USER_STATS(state, stats) {
      state.userStats = stats
    }
  },
  actions: {
    async register({ commit }, userData) {
      try {
        const { user, token } = await auth.register(userData)
        commit('SET_USER', user)
        commit('SET_TOKEN', token)
        return user
      } catch (error) {
        throw error
      }
    },
    async login({ commit }, credentials) {
      try {
        const { user, token } = await auth.login(credentials)
        commit('SET_USER', user)
        commit('SET_TOKEN', token)
        return user
      } catch (error) {
        throw error
      }
    },
    logout({ commit }) {
      auth.logout()
      commit('CLEAR_AUTH')
    },
    async updateProfile({ commit }, userData) {
      try {
        const user = await auth.updateProfile(userData)
        commit('SET_USER', user)
        return user
      } catch (error) {
        throw error
      }
    },
    async fetchForumPosts({ commit }, filter) {
      try {
        const posts = await fetchForumPosts(filter)
        commit('SET_FORUM_POSTS', posts)
        return posts
      } catch (error) {
        throw error
      }
    },
    async fetchUserPosts({ commit }) {
      try {
        const posts = await fetchUserPosts()
        commit('SET_USER_POSTS', posts)
        return posts
      } catch (error) {
        throw error
      }
    },
    async fetchPostById({ commit }, postId) {
      try {
        const post = await fetchPostById(postId)
        commit('SET_CURRENT_POST', post)
        return post
      } catch (error) {
        throw error
      }
    },
    async createForumPost({ commit }, postData) {
      try {
        const post = await createForumPost(postData)
        commit('ADD_FORUM_POST', post)
        return post
      } catch (error) {
        throw error
      }
    },
    async updateForumPost({ commit }, { postId, postData }) {
      try {
        const updatedPost = await updateForumPost({ postId, postData })
        commit('UPDATE_FORUM_POST', updatedPost)
        return updatedPost
      } catch (error) {
        throw error
      }
    },
    async deleteForumPost({ commit }, postId) {
      try {
        await deleteForumPost(postId)
        commit('REMOVE_FORUM_POST', postId)
      } catch (error) {
        throw error
      }
    },
    async addComment({ commit }, { postId, content, isAnonymous }) {
      try {
        const comment = await addComment({ postId, content, isAnonymous })
        const post = await fetchPostById(postId)
        commit('SET_CURRENT_POST', post)
        return comment
      } catch (error) {
        throw error
      }
    },
    async deleteComment({ commit }, { postId, commentId }) {
      try {
        await deleteComment({ postId, commentId })
        const post = await fetchPostById(postId)
        commit('SET_CURRENT_POST', post)
      } catch (error) {
        throw error
      }
    },
    async fetchResources({ commit }) {
      try {
        const resources = await fetchResources()
        commit('SET_RESOURCES', resources)
        return resources
      } catch (error) {
        throw error
      }
    },
    async fetchSavedResources({ commit }) {
      try {
        const resources = await fetchSavedResources()
        commit('SET_SAVED_RESOURCES', resources)
        return resources
      } catch (error) {
        throw error
      }
    },
    async toggleSavedResource({ commit }, resourceId) {
      try {
        await toggleSavedResource(resourceId)
        commit('TOGGLE_SAVED_RESOURCE', resourceId)
      } catch (error) {
        throw error
      }
    },
    async fetchSelfCareTips({ commit }) {
      try {
        const tips = await fetchSelfCareTips()
        commit('SET_SELF_CARE_TIPS', tips)
        return tips
      } catch (error) {
        throw error
      }
    },
    async saveSelfCareActivity({ commit }, activityData) {
      try {
        const activity = await saveSelfCareActivity(activityData)
        commit('ADD_ACTIVITY', activity)
        return activity
      } catch (error) {
        throw error
      }
    },
    async fetchActivityHistory({ commit }) {
      try {
        const activities = await fetchActivityHistory()
        commit('SET_ACTIVITY_HISTORY', activities)
        return activities
      } catch (error) {
        throw error
      }
    },
    async fetchUserStats({ commit }) {
      try {
        const stats = await fetchUserStats()
        commit('SET_USER_STATS', stats)
        return stats
      } catch (error) {
        throw error
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user,
    forumPosts: state => state.forumPosts,
    userPosts: state => state.userPosts,
    currentPost: state => state.currentPost,
    resources: state => state.resources,
    savedResources: state => state.savedResources,
    selfCareTips: state => state.selfCareTips,
    activityHistory: state => state.activityHistory,
    userStats: state => state.userStats
  }
})