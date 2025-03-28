<template>
  <div class="profile-container">
    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
    </div>

    <div v-else class="profile-content-wrapper">
      <div class="profile-header">
        <div class="avatar-container" @click="triggerFileInput">
          <input 
            type="file" 
            ref="fileInput" 
            @change="handleFileChange" 
            accept="image/*"
            style="display: none"
          >
          <img :src="userPhotoUrl" alt="Profile" class="avatar">
          <div class="upload-overlay">
            <i class="fas fa-camera"></i>
          </div>
        </div>
        <div class="user-info">
          <h1>{{ user.displayName || user.name || user.username }}</h1>
          <p class="user-email">{{ user.email }}</p>
          <p class="join-date">Member since {{ formattedJoinDate }}</p>
          <button v-if="user.avatar && !isUsingProviderPhoto" @click="removePhoto" class="btn-remove-photo">
            <i class="fas fa-trash-alt"></i> Remove Photo
          </button>
        </div>
      </div>
      
      <div class="profile-body">
        <div class="profile-sidebar">
          <div class="sidebar-section">
            <h3>About</h3>
            <p v-if="user.bio" class="bio-text">{{ user.bio }}</p>
            <p v-else class="empty-bio">No bio yet</p>
            <button @click="editBio" class="btn-edit">
              <i class="fas fa-edit"></i> Edit Bio
            </button>
          </div>
          
          <div class="sidebar-section stats-section">
            <h3>Stats</h3>
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-comment-alt"></i>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ userStats.postCount || 0 }}</span>
                <span class="stat-label">Forum Posts</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-comments"></i>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ userStats.commentCount || 0 }}</span>
                <span class="stat-label">Comments</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-bookmark"></i>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ userStats.savedResources || 0 }}</span>
                <span class="stat-label">Saved Resources</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="profile-main">
          <div class="tabs">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="{ active: activeTab === tab.id }"
              class="tab-button"
            >
              <i :class="tab.icon"></i>
              {{ tab.label }}
            </button>
          </div>
          
          <div class="tab-content">
            <div v-if="activeTab === 'posts'" class="posts-tab">
              <h2><i class="fas fa-comment-alt"></i> Your Forum Posts</h2>
              <div v-if="userPosts.length > 0">
                <PostList :posts="userPosts" :show-actions="true" @post-deleted="fetchUserPosts"/>
              </div>
              <div v-else class="empty-state">
                <p>You haven't created any posts yet.</p>
                <router-link to="/forum/new" class="btn-primary">
                  <i class="fas fa-plus"></i> Create Your First Post
                </router-link>
              </div>
            </div>
            
            <div v-else-if="activeTab === 'saved'" class="saved-tab">
              <h2><i class="fas fa-bookmark"></i> Saved Resources</h2>
              <div v-if="savedResources.length > 0" class="resources-grid">
                <ResourceCard 
                  v-for="resource in savedResources" 
                  :key="resource.id"
                  :resource="resource"
                  :is-saved="true"
                  @save-resource="toggleSavedResource"
                />
              </div>
              <div v-else class="empty-state">
                <p>You haven't saved any resources yet.</p>
                <router-link to="/resources" class="btn-primary">
                  <i class="fas fa-search"></i> Browse Resources
                </router-link>
              </div>
            </div>
            
            <div v-else class="activity-tab">
              <h2><i class="fas fa-chart-line"></i> Your Activity</h2>
              <ActivityTracker :show-extended="true"/>
            </div>
          </div>
        </div>
      </div>
      
      <BioEditModal 
        v-if="showBioEdit" 
        :current-bio="user.bio"
        @close="showBioEdit = false"
        @bio-updated="handleBioUpdated"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getAuth } from 'firebase/auth'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import PostList from '@/components/forum/PostList.vue'
import ResourceCard from '@/components/resources/ResourceCard.vue'
import ActivityTracker from '@/components/selfcare/ActivityTracker.vue'
import BioEditModal from '@/components/profile/BioEditModal.vue'

export default {
  components: {
    PostList,
    ResourceCard,
    ActivityTracker,
    BioEditModal
  },
  data() {
    return {
      activeTab: 'posts',
      tabs: [
        { id: 'posts', label: 'Posts', icon: 'fas fa-comment-alt' },
        { id: 'saved', label: 'Saved', icon: 'fas fa-bookmark' },
        { id: 'activity', label: 'Activity', icon: 'fas fa-chart-line' }
      ],
      userPosts: [],
      userStats: {
        postCount: 0,
        commentCount: 0,
        savedResources: 0
      },
      savedResources: [],
      loading: true,
      showBioEdit: false,
      selectedFile: null,
      defaultAvatarUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      isUsingProviderPhoto: false
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    userPhotoUrl() {
      const auth = getAuth()
      const user = auth.currentUser
      
      // Check for provider photos first
      if (user?.providerData?.length) {
        const googleProvider = user.providerData.find(
          provider => provider.providerId === 'google.com'
        )
        if (googleProvider?.photoURL) {
          this.isUsingProviderPhoto = true
          return googleProvider.photoURL.replace(/=s\d+(-c)?$/, '=s400-c')
        }
        
        // Check for other providers (Facebook, etc.)
        const providerWithPhoto = user.providerData.find(
          provider => provider.photoURL
        )
        if (providerWithPhoto?.photoURL) {
          this.isUsingProviderPhoto = true
          return providerWithPhoto.photoURL
        }
      }
      
      // Check for Firebase auth photo
      if (user?.photoURL) {
        this.isUsingProviderPhoto = true
        return user.photoURL
      }
      
      // Fallback to stored avatar or default
      this.isUsingProviderPhoto = false
      return this.user?.avatar || this.defaultAvatarUrl
    },
    user() {
      const auth = getAuth()
      const firebaseUser = auth.currentUser
      
      return {
        ...this.currentUser,
        displayName: firebaseUser?.displayName || this.currentUser?.name,
        email: firebaseUser?.email || this.currentUser?.email,
        avatar: this.currentUser?.avatar,
        bio: this.currentUser?.bio || '',
        username: this.currentUser?.username || 'User',
        joinDate: this.currentUser?.joinDate || new Date().toISOString()
      }
    },
    formattedJoinDate() {
      if (!this.user.joinDate) return 'Recently'
      return new Date(this.user.joinDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  },
  async created() {
    await this.fetchCurrentUser()
    await this.fetchUserData()
  },
  methods: {
    ...mapActions(['fetchCurrentUser']),
    async fetchUserData() {
      this.loading = true
      try {
        await Promise.all([
          this.fetchUserPosts(),
          this.fetchUserStats(),
          this.fetchSavedResources()
        ])
      } catch (error) {
        console.error('Error fetching user data:', error)
        this.$toast.error('Failed to load profile data')
      } finally {
        this.loading = false
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    handleFileChange(e) {
      const file = e.target.files[0]
      if (file && file.type.match('image.*')) {
        this.selectedFile = file
        this.uploadPhoto()
      } else {
        this.$toast.error('Please select a valid image file')
      }
    },
    async uploadPhoto() {
      if (!this.selectedFile) return
      
      try {
        const storage = getStorage()
        const userId = this.currentUser.uid
        const fileExt = this.selectedFile.name.split('.').pop()
        const filePath = `profilePhotos/${userId}/avatar.${fileExt}`
        const fileRef = storageRef(storage, filePath)
        
        // Show loading state
        this.loading = true
        
        // Upload the file
        await uploadBytes(fileRef, this.selectedFile)
        
        // Get download URL
        const downloadURL = await getDownloadURL(fileRef)
        
        // Update user profile in Firestore
        const userRef = doc(db, 'users', userId)
        await updateDoc(userRef, {
          avatar: downloadURL
        })
        
        // Update local state
        this.$store.commit('UPDATE_USER_PROFILE', { avatar: downloadURL })
        
        this.$toast.success('Profile photo updated successfully!')
      } catch (error) {
        console.error('Error uploading photo:', error)
        this.$toast.error('Failed to update profile photo')
      } finally {
        this.loading = false
        this.selectedFile = null
      }
    },
    async removePhoto() {
      try {
        if (!this.user.avatar) return
        
        this.loading = true
        
        // Delete from Firebase Storage if it's a Firebase URL
        if (this.user.avatar.includes('firebasestorage.googleapis.com')) {
          const storage = getStorage()
          const fileRef = storageRef(storage, this.user.avatar)
          await deleteObject(fileRef)
        }
        
        // Update user profile in Firestore
        const userId = this.currentUser.uid
        const userRef = doc(db, 'users', userId)
        await updateDoc(userRef, {
          avatar: null
        })
        
        // Update local state
        this.$store.commit('UPDATE_USER_PROFILE', { avatar: null })
        
        this.$toast.success('Profile photo removed')
      } catch (error) {
        console.error('Error removing photo:', error)
        this.$toast.error('Failed to remove profile photo')
      } finally {
        this.loading = false
      }
    },
    editBio() {
      this.showBioEdit = true
    },
    handleBioUpdated(newBio) {
      this.$store.dispatch('updateUserProfile', { bio: newBio })
      this.showBioEdit = false
      this.$toast.success('Bio updated successfully!')
    },
    async fetchUserPosts() {
      try {
        // Implement your actual post fetching logic here
        // This is mock data for demonstration
        this.userPosts = [
          {
            id: '1',
            title: 'Getting started with Vue 3',
            content: 'I recently started learning Vue 3 and wanted to share my experience...',
            createdAt: new Date().toISOString(),
            commentCount: 5,
            likes: 12,
            author: {
              name: this.user.displayName,
              username: this.user.username,
              avatar: this.userPhotoUrl
            }
          }
        ]
        this.userStats.postCount = this.userPosts.length
      } catch (error) {
        console.error('Error fetching posts:', error)
        this.$toast.error('Failed to load your posts')
      }
    },
    async fetchUserStats() {
      try {
        // Implement your actual stats fetching logic here
        // This is mock data for demonstration
        this.userStats = {
          postCount: this.userPosts.length,
          commentCount: 15,
          savedResources: 3
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    },
    async fetchSavedResources() {
      try {
        // Implement your actual saved resources fetching logic here
        // This is mock data for demonstration
        this.savedResources = [
          {
            id: '1',
            title: 'Vue 3 Composition API Guide',
            description: 'A comprehensive guide to the new Composition API in Vue 3',
            url: 'https://vuejs.org/guide/extras/composition-api-faq.html',
            type: 'article',
            tags: ['vue', 'composition-api', 'javascript'],
            createdAt: new Date().toISOString()
          }
        ]
      } catch (error) {
        console.error('Error fetching saved resources:', error)
        this.$toast.error('Failed to load saved resources')
      }
    },
    toggleSavedResource(resourceId) {
      const index = this.savedResources.findIndex(r => r.id === resourceId)
      if (index !== -1) {
        this.savedResources.splice(index, 1)
        this.userStats.savedResources -= 1
        this.$toast.success('Resource removed from saved items')
      }
    }
  }
}
</script>

<style scoped>
.profile-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 0;
  position: relative;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #42b983;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.profile-content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

@media (min-width: 768px) {
  .profile-header {
    flex-direction: row;
    text-align: left;
    padding: 30px;
  }
}

.avatar-container {
  position: relative;
  width: 120px;
  height: 120px;
  margin-right: 0;
  margin-bottom: 20px;
  cursor: pointer;
}

@media (min-width: 768px) {
  .avatar-container {
    margin-right: 30px;
    margin-bottom: 0;
  }
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
}

.upload-overlay {
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar-container:hover .upload-overlay {
  opacity: 1;
}

.user-info {
  flex: 1;
}

.user-info h1 {
  color: #2c3e50;
  margin: 0 0 5px;
  font-size: 28px;
  font-weight: 600;
}

.user-info .user-email {
  color: #7f8c8d;
  margin: 0 0 5px;
  font-size: 16px;
}

.user-info .join-date {
  color: #95a5a6;
  font-size: 14px;
  margin: 0 0 10px;
}

.btn-remove-photo {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.btn-remove-photo:hover {
  background-color: rgba(220, 53, 69, 0.1);
}

.btn-remove-photo i {
  margin-right: 5px;
}

.profile-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (min-width: 992px) {
  .profile-body {
    flex-direction: row;
  }
}

.profile-sidebar {
  width: 100%;
}

@media (min-width: 992px) {
  .profile-sidebar {
    width: 300px;
    flex-shrink: 0;
  }
}

.sidebar-section {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.sidebar-section h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  font-size: 18px;
  font-weight: 600;
}

.sidebar-section .bio-text {
  color: #2c3e50;
  line-height: 1.6;
  margin-bottom: 15px;
}

.sidebar-section .empty-bio {
  color: #95a5a6;
  font-style: italic;
  margin-bottom: 15px;
}

.sidebar-section .btn-edit {
  width: 100%;
  padding: 10px;
  background: #ecf0f1;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.sidebar-section .btn-edit:hover {
  background: #dfe6e9;
  border-color: #ccc;
}

.stats-section .stat-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.stats-section .stat-item:last-child {
  border-bottom: none;
}

.stats-section .stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(66, 185, 131, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: #42b983;
}

.stats-section .stat-info {
  flex: 1;
}

.stats-section .stat-value {
  display: block;
  font-weight: 600;
  color: #2c3e50;
  font-size: 16px;
}

.stats-section .stat-label {
  display: block;
  color: #95a5a6;
  font-size: 14px;
}

.profile-main {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.tabs {
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.tabs::-webkit-scrollbar {
  display: none;
}

.tab-button {
  padding: 12px 20px;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-weight: 500;
  color: #95a5a6;
  transition: all 0.3s;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-button.active {
  color: #42b983;
  border-bottom-color: #42b983;
}

.tab-button:hover:not(.active) {
  color: #2c3e50;
}

.tab-content h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 22px;
}

.posts-tab, .saved-tab, .activity-tab {
  min-height: 300px;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
}

.empty-state p {
  color: #95a5a6;
  margin-bottom: 20px;
  font-size: 16px;
}

.empty-state .btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary:hover {
  background: #369f6b;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .profile-header {
    padding: 20px 15px;
  }

  .profile-body {
    gap: 15px;
  }

  .sidebar-section, .profile-main {
    padding: 15px;
  }

  .resources-grid {
    grid-template-columns: 1fr;
  }
}
</style>