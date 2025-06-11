```vue
<template>
  <div class="profile-container">
    <!-- Non-functional Feature Disclaimer -->
    <div class="disclaimer">
      <p><strong>Note:</strong> Delete account, profile photo changes, and bio editing are not currently functional.</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner" aria-label="Loading profile"></div>
    </div>

    <!-- Profile Content -->
    <div v-else class="profile-content-wrapper">
      <!-- Profile Header -->
      <header class="profile-header">
        <div class="avatar-container">
          <img 
            :src="userPhotoUrl" 
            :alt="`Profile picture of ${user.displayName || user.username}`" 
            class="avatar"
            @error="handleImageError"
            @click="showPhotoModal = true"
          >
          <span class="upload-overlay">
            <i class="fas fa-camera" aria-hidden="true"></i>
            <span class="visually-hidden">Change profile photo</span>
          </span>
        </div>
        
        <div class="user-info">
          <h1>{{ user.displayName || user.name || user.username }}</h1>
          <p class="user-email">{{ user.email }}</p>
          <p class="join-date">Member since {{ formattedJoinDate }}</p>
          <button 
            v-if="user.avatar && !isUsingProviderPhoto" 
            @click="showPhotoModal = true" 
            class="btn-remove-photo"
            aria-label="Remove profile photo"
          >
            <i class="fas fa-trash-alt" aria-hidden="true"></i> Remove Photo
          </button>
        </div>
      </header>
      
      <!-- Profile Body -->
      <div class="profile-body">
        <!-- Sidebar -->
        <aside class="profile-sidebar">
          <section class="sidebar-section">
            <h2>About</h2>
            <p v-if="user.bio" class="bio-text">{{ user.bio }}</p>
            <p v-else class="empty-bio">No bio yet</p>
            <button @click="editBio" class="btn-edit">
              <i class="fas fa-edit" aria-hidden="true"></i> Edit Bio
            </button>
          </section>
          
          <section class="sidebar-section stats-section">
            <h2>Stats</h2>
            <div class="stat-item">
              <div class="stat-icon" aria-hidden="true">
                <i class="fas fa-comment-alt"></i>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ userStats.postCount || 0 }}</span>
                <span class="stat-label">Forum Posts</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon" aria-hidden="true">
                <i class="fas fa-comments"></i>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ userStats.commentCount || 0 }}</span>
                <span class="stat-label">Comments</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon" aria-hidden="true">
                <i class="fas fa-bookmark"></i>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ userStats.savedResources || 0 }}</span>
                <span class="stat-label">Saved Resources</span>
              </div>
            </div>
          </section>

          <!-- Account Management Section -->
          <section class="sidebar-section account-section">
            <h2>Account</h2>
            <button 
              @click="showDeleteAccountModal = true"
              class="btn-delete-account"
              aria-label="Delete account"
            >
              <i class="fas fa-exclamation-triangle" aria-hidden="true"></i> Delete Account
            </button>
          </section>
        </aside>
        
        <!-- Main Content -->
        <main class="profile-main">
          <div class="tabs" role="tablist">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="{ active: activeTab === tab.id }"
              class="tab-button"
              :aria-selected="activeTab === tab.id"
              :aria-controls="`tab-${tab.id}`"
              role="tab"
            >
              <i :class="tab.icon" aria-hidden="true"></i>
              {{ tab.label }}
            </button>
          </div>
          
          <div class="tab-content">
            <!-- Posts Tab -->
            <section 
              v-if="activeTab === 'posts'" 
              id="tab-posts"
              role="tabpanel"
              aria-labelledby="posts-tab"
            >
              <h2><i class="fas fa-comment-alt" aria-hidden="true"></i> Your Forum Posts</h2>
              <div v-if="userPosts.length > 0">
                <PostList 
                  :posts="userPosts" 
                  :show-actions="true" 
                />
              </div>
              <div v-else class="empty-state">
                <p>You haven't created any posts yet.</p>
                <router-link to="/forum/new" class="btn-primary">
                  <i class="fas fa-plus" aria-hidden="true"></i> Create Your First Post
                </router-link>
              </div>
            </section>
            
            <!-- Saved Resources Tab -->
            <section 
              v-else-if="activeTab === 'saved'" 
              id="tab-saved"
              role="tabpanel"
              aria-labelledby="saved-tab"
            >
              <h2><i class="fas fa-bookmark" aria-hidden="true"></i> Saved Resources</h2>
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
                  <i class="fas fa-search" aria-hidden="true"></i> Browse Resources
                </router-link>
              </div>
            </section>
            
            <!-- Activity Tab -->
            <section 
              v-else-if="activeTab === 'activity'"
              id="tab-activity"
              role="tabpanel"
              aria-labelledby="activity-tab"
            >
              <h2><i class="fas fa-chart-line" aria-hidden="true"></i> Your Activity</h2>
              <ActivityTracker :show-extended="true"/>
            </section>

            <!-- Sessions Tab -->
            <section 
              v-else-if="activeTab === 'sessions'"
              id="tab-sessions"
              role="tabpanel"
              aria-labelledby="sessions-tab"
            >
              <h2><i class="fas fa-laptop" aria-hidden="true"></i> Active Sessions</h2>
              <p class="mock-data-note"><strong>Note:</strong> This is mock session data for demonstration purposes only.</p>
              <div class="sessions-list">
                <div v-for="session in activeSessions" :key="session.id" class="session-item">
                  <div class="session-icon">
                    <i :class="getDeviceIcon(session.device)" aria-hidden="true"></i>
                  </div>
                  <div class="session-info">
                    <h3>{{ session.device }}</h3>
                    <p>
                      <span class="session-location">{{ session.location }}</span>
                      <span class="session-ip">({{ session.ip }})</span>
                    </p>
                    <p class="session-time">Last active: {{ formatSessionTime(session.lastActive) }}</p>
                  </div>
                  <div class="session-actions">
                    <button 
                      v-if="!session.isCurrent" 
                      @click="revokeSession(session.id)"
                      class="btn-revoke"
                      aria-label="Revoke session"
                    >
                      <i class="fas fa-times" aria-hidden="true"></i> Revoke
                    </button>
                    <span v-else class="current-session-label">Current session</span>
                  </div>
                </div>
              </div>
              <div class="session-actions-global">
                <button 
                  @click="revokeAllSessions"
                  class="btn-revoke-all"
                  aria-label="Revoke all other sessions"
                >
                  <i class="fas fa-user-lock" aria-hidden="true"></i> Revoke All Other Sessions
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>

    <!-- Profile Photo Modal -->
    <div v-if="showPhotoModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Change Profile Photo</h2>
          <button @click="showPhotoModal = false" class="modal-close" aria-label="Close modal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="photo-upload">
            <input 
              type="file" 
              ref="fileInput" 
              @change="handleFileChange" 
              accept="image/*"
              class="visually-hidden"
              id="avatar-upload"
            >
            <label for="avatar-upload" class="btn-upload">
              <i class="fas fa-upload" aria-hidden="true"></i> Upload New Photo
            </label>
            <p class="upload-instructions">Select an image (JPEG/PNG, max 2MB)</p>
          </div>
          <button 
            v-if="user.avatar && !isUsingProviderPhoto" 
            @click="removePhoto" 
            class="btn-remove-photo"
            aria-label="Remove profile photo"
          >
            <i class="fas fa-trash-alt" aria-hidden="true"></i> Remove Current Photo
          </button>
        </div>
        <div class="modal-footer">
          <button 
            @click="showPhotoModal = false" 
            class="btn-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Account Modal -->
    <div v-if="showDeleteAccountModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Delete Your Account</h2>
          <button @click="showDeleteAccountModal = false" class="modal-close" aria-label="Close modal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete your account? This action cannot be undone.</p>
          <p>All your data, including posts, comments, and saved resources will be permanently deleted.</p>
          <p class="demo-note"><strong>Demo:</strong> Account deletion is not functional in this demo.</p>
          
          <div class="delete-confirmation">
            <label for="delete-confirm-input">
              Type "DELETE" to confirm:
            </label>
            <input 
              id="delete-confirm-input"
              v-model="deleteConfirmationText"
              type="text"
              placeholder="DELETE"
              disabled
            >
          </div>
        </div>
        <div class="modal-footer">
          <button 
            @click="showDeleteAccountModal = false" 
            class="btn-cancel"
          >
            Cancel
          </button>
          <button 
            class="btn-confirm-delete"
            disabled
            title="Account deletion is disabled in demo mode"
            aria-label="Permanently Delete Account (disabled)"
          >
            <i class="fas fa-exclamation-triangle" aria-hidden="true"></i> Permanently Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>

       <Overallchatbot />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getAuth, signOut } from 'firebase/auth'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import PostList from '@/components/forum/PostList.vue'
import ResourceCard from '@/components/resources/ResourceCard.vue'
import ActivityTracker from '@/components/selfcare/ActivityTracker.vue'
import BioEditModal from '@/components/profile/BioEditModal.vue'
import Overallchatbot from '@/components/MentalHealthWidget.vue';

export default {
  components: {
    PostList,
    ResourceCard,
    ActivityTracker,
    BioEditModal,
    Overallchatbot
  },
  data() {
    return {
      activeTab: 'posts',
      tabs: [
        { id: 'posts', label: 'Posts', icon: 'fas fa-comment-alt' },
        { id: 'saved', label: 'Saved', icon: 'fas fa-bookmark' },
        { id: 'activity', label: 'Activity', icon: 'fas fa-chart-line' },
        { id: 'sessions', label: 'Sessions', icon: 'fas fa-laptop' }
      ],
      userPosts: [],
      userStats: {
        postCount: 0,
        commentCount: 0,
        savedResources: 0
      },
      savedResources: [],
      activeSessions: [],
      loading: true,
      showBioEdit: false,
      showDeleteAccountModal: false,
      showPhotoModal: false,
      deleteConfirmationText: '',
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
      
      if (user?.providerData?.length) {
        const googleProvider = user.providerData.find(
          provider => provider.providerId === 'google.com'
        )
        if (googleProvider?.photoURL) {
          this.isUsingProviderPhoto = true
          return googleProvider.photoURL.replace(/=s\d+(-c)?$/, '=s400-c')
        }
        
        const providerWithPhoto = user.providerData.find(
          provider => provider.photoURL
        )
        if (providerWithPhoto?.photoURL) {
          this.isUsingProviderPhoto = true
          return providerWithPhoto.photoURL
        }
      }
      
      if (user?.photoURL) {
        this.isUsingProviderPhoto = true
        return user.photoURL
      }
      
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
    await this.fetchActiveSessions()
  },
  methods: {
    ...mapActions(['fetchCurrentUser', 'updateUserProfile']),
    async fetchUserData() {
      this.loading = true;
      try {
        await Promise.all([
          this.fetchUserPosts(),
          this.fetchUserStats(),
          this.fetchSavedResources()
        ]);
      } catch (error) {
        console.error('Error fetching user data:', error);
        this.$toast.error('Failed to load profile data. Please try again later.');
        this.userPosts = this.userPosts || [];
        this.userStats = this.userStats || {
          postCount: 0,
          commentCount: 0,
          savedResources: 0
        };
        this.savedResources = this.savedResources || [];
      } finally {
        this.loading = false;
      }
    },
    async fetchActiveSessions() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) return;
        
        // Get the current session ID
        const currentSessionId = await user.getIdTokenResult()
          .then((idTokenResult) => idTokenResult.claims.session_id);
        
        // Mock data for demonstration
        this.activeSessions = [
          {
            id: currentSessionId || 'current-session',
            device: this.getDeviceInfo(),
            location: 'New York, US',
            ip: '192.168.1.100',
            lastActive: new Date().toISOString(),
            isCurrent: true
          },
          {
            id: 'other-session-1',
            device: 'MacBook Pro',
            location: 'San Francisco, US',
            ip: '192.168.1.101',
            lastActive: new Date(Date.now() - 3600000).toISOString(),
            isCurrent: false
          }
        ];
      } catch (error) {
        console.error('Error fetching active sessions:', error);
        this.$toast.error('Failed to load active sessions');
      }
    },
    getDeviceInfo() {
      const userAgent = navigator.userAgent;
      if (userAgent.match(/Android/i)) return 'Android Device';
      if (userAgent.match(/iPhone|iPad|iPod/i)) return 'iOS Device';
      if (userAgent.match(/Windows/i)) return 'Windows PC';
      if (userAgent.match(/Mac/i)) return 'Mac';
      return 'Unknown Device';
    },
    getDeviceIcon(device) {
      if (device.includes('Windows')) return 'fab fa-windows';
      if (device.includes('Mac')) return 'fab fa-apple';
      if (device.includes('iPhone') || device.includes('iPad') || device.includes('iOS')) return 'fas fa-mobile-alt';
      if (device.includes('Android')) return 'fab fa-android';
      return 'fas fa-laptop';
    },
    formatSessionTime(timestamp) {
      const now = new Date();
      const sessionTime = new Date(timestamp);
      const diffInMinutes = Math.floor((now - sessionTime) / 60000);
      
      if (diffInMinutes < 1) return 'Just now';
      if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    },
    async revokeSession(sessionId) {
      try {
        this.activeSessions = this.activeSessions.filter(s => s.id !== sessionId);
        this.$toast.success('Session revoked successfully');
      } catch (error) {
        console.error('Error revoking session:', error);
        this.$toast.error('Failed to revoke session');
      }
    },
    async revokeAllSessions() {
      try {
        const auth = getAuth();
        await signOut(auth);
        this.$router.push('/login');
        this.$toast.success('All other sessions have been revoked. Please log in again.');
      } catch (error) {
        console.error('Error revoking all sessions:', error);
        this.$toast.error('Failed to revoke sessions');
      }
    },
    async deleteAccount() {
      this.$toast.info('Account deletion is a demo feature and not currently implemented.');
      this.showDeleteAccountModal = false;
      this.deleteConfirmationText = '';
    },
    handleFileChange(e) {
      const file = e.target.files[0];
      if (file && file.type.match('image.*')) {
        if (file.size > 2 * 1024 * 1024) {
          this.$toast.error('Image must be less than 2MB');
          return;
        }
        
        this.selectedFile = file;
        this.uploadPhoto();
      } else {
        this.$toast.error('Please select a valid image file (JPEG, PNG)');
      }
    },
    async uploadPhoto() {
      if (!this.selectedFile) return;
      
      try {
        this.$toast.info('Profile photo upload is a demo feature and not currently implemented.');
      } finally {
        this.loading = false;
        this.selectedFile = null;
        if (this.$refs.fileInput) {
          this.$refs.fileInput.value = '';
        }
        this.showPhotoModal = false;
      }
    },
    async removePhoto() {
      try {
        this.$toast.info('Profile photo removal is a demo feature and not currently implemented.');
      } finally {
        this.loading = false;
        this.showPhotoModal = false;
      }
    },
    editBio() {
      this.showBioEdit = true;
    },
    async handleBioUpdated(newBio) {
      try {
        this.$toast.info('Bio editing is a demo feature and not currently implemented.');
        this.showBioEdit = false;
      } catch (error) {
        console.error('Error updating bio:', error);
        this.$toast.error('Failed to update bio');
      }
    },
    async fetchUserPosts() {
      try {
        this.userPosts = [
          {
            id: '1',
            title: 'Welcome to the Demo Forum!',
            content: 'This is a mock post for demonstration purposes.',
            createdAt: new Date().toISOString(),
            commentCount: 0,
            likes: 0,
            author: {
              name: this.user?.displayName || this.user?.name || this.user?.username || 'Demo User',
              username: this.user?.username || 'demo-user',
              avatar: this.userPhotoUrl || '/default-avatar.jpg'
            }
          }
        ];
        this.userStats.postCount = this.userPosts.length;
      } catch (error) {
        console.error('Error fetching posts:', error);
        this.$toast.error('Failed to load your posts');
      }
    },
    async fetchUserStats() {
      try {
        this.userStats = {
          postCount: this.userPosts.length,
          commentCount: 15,
          savedResources: this.savedResources.length
        };
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    },
    async fetchSavedResources() {
      try {
        this.savedResources = [
          {
            id: 'mh2',
            title: 'Mindfulness Meditation for Beginners',
            description: '10-minute daily meditation practices to reduce stress',
            url: 'https://www.mindful.org/meditation/mindfulness-getting-started/',
            type: 'audio-guide',
            tags: ['meditation', 'mindfulness', 'stress-relief'],
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
          }
        ];
        this.userStats.savedResources = this.savedResources.length;
      } catch (error) {
        console.error('Error fetching saved resources:', error);
        this.$toast.error('Failed to load saved resources');
      }
    },
    toggleSavedResource(resourceId) {
      const index = this.savedResources.findIndex(r => r.id === resourceId);
      if (index !== -1) {
        this.savedResources.splice(index, 1);
        this.userStats.savedResources -= 1;
        this.$toast.success('Resource removed from saved items');
      }
    },
    handleImageError() {
      this.$store.commit('UPDATE_USER_PROFILE', { avatar: null });
    }
  }
}
</script>

<style scoped>
.disclaimer {
  background: #fff3cd;
  color: #856404;
  padding: 15px;
  margin: 20px;
  border-radius: 5px;
  border: 1px solid #ffeeba;
  text-align: center;
}

.mock-data-note, .demo-note {
  background: #e9ecef;
  color: #495057;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-size: 14px;
}

.photo-upload {
  margin-bottom: 20px;
  text-align: center;
}

.btn-upload {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-upload:hover {
  background: #369f6b;
}

.upload-instructions {
  color: #7f8c8d;
  font-size: 14px;
  margin-top: 10px;
}

.account-section {
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.btn-delete-account {
  width: 100%;
  padding: 10px;
  background: #fff0f0;
  border: 1px solid #ffcccc;
  border-radius: 5px;
  color: #dc3545;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-delete-account:hover {
  background: #ffe0e0;
  border-color: #ff9999;
}

/* Sessions List */
.sessions-list {
  margin-top: 20px;
}

.session-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 15px;
  background: white;
  transition: all 0.2s ease;
}

.session-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.session-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f0f8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: #42b983;
  font-size: 20px;
}

.session-info {
  flex: 1;
}

.session-info h3 {
  margin: 0 0 5px;
  color: #2c3e50;
  font-size: 16px;
}

.session-info p {
  margin: 0;
  color: #7f8c8d;
  font-size: 14px;
}

.session-location {
  font-weight: 500;
}

.session-ip {
  color: #95a5a6;
  font-size: 12px;
}

.session-time {
  margin-top: 5px !important;
  font-size: 13px;
  color: #95a5a6;
}

.session-actions {
  margin-left: 15px;
}

.btn-revoke {
  padding: 8px 12px;
  background: #fff0f0;
  border: 1px solid #ffcccc;
  border-radius: 5px;
  color: #dc3545;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 5px;
}

.btn-revoke:hover {
  background: #ffe0e0;
}

.current-session-label {
  color: #42b983;
  font-size: 13px;
  font-weight: 500;
}

.session-actions-global {
  margin-top: 30px;
  text-align: center;
}

.btn-revoke-all {
  padding: 10px 20px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-revoke-all:hover {
  background: #e9ecef;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 20px;
}

.modal-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #95a5a6;
  padding: 5px;
}

.modal-close:hover {
  color: #2c3e50;
}

.modal-body {
  padding: 20px;
}

.modal-body p {
  margin-bottom: 15px;
  color: #2c3e50;
  line-height: 1.5;
}

.delete-confirmation {
  margin-top: 20px;
}

.delete-confirmation label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 500;
}

.delete-confirmation input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.delete-confirmation input:disabled {
  background: #f8f9fa;
  cursor: not-allowed;
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-cancel {
  padding: 10px 20px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #2c3e50;
  cursor: pointer;
}

.btn-cancel:hover {
  background: #e9ecef;
}

.btn-confirm-delete {
  padding: 10px 20px;
  background: #dc3545;
  border: 1px solid #dc3545;
  border-radius: 5px;
  color: white;
  cursor: not-allowed;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-confirm-delete:disabled {
  background: #ff9999;
  border-color: #ff9999;
  cursor: not-allowed;
  opacity: 0.7;
}

.btn-confirm-delete:hover:not(:disabled) {
  background: #c82333;
  border-color: #bd2130;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

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
  display: flex;
  align-items: center;
  gap: 5px;
}

.btn-remove-photo:hover {
  background-color: rgba(220, 53, 69, 0.1);
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

.sidebar-section h2 {
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