<template>
  <div class="neura-chat-container">
    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'sidebar-collapsed': isSidebarCollapsed, 'mobile-sidebar': isMobile, 'sidebar-visible': isMobile && !isSidebarCollapsed }">
      <div class="sidebar-header">
  <button class="new-chat-btn" @click="startNewChat">
    <i class="fas fa-plus"></i>
    <span v-if="!isSidebarCollapsed">New Chat</span>
  </button>
  <button class="collapse-btn" @click="toggleSidebar" v-if="!isMobile">
    <i :class="isSidebarCollapsed ? 'fas fa-outdent' : 'fas fa-indent'"></i>
  </button>
</div>
      
      <div class="chat-history">
        <h3 v-if="!isSidebarCollapsed">Recent Chats</h3>
        <div class="mock-chats">
          <div class="history-item" v-for="(chat, index) in recentChats" :key="index" 
               @click="selectChat(index)" :class="{ 'active': activeChatIndex === index }">
            <i class="fas" :class="isSidebarCollapsed ? 'fa-comment-alt' : 'fa-comment-dots'"></i>
            <div class="history-content" v-if="!isSidebarCollapsed">
              <span class="history-preview">{{ chat.preview }}</span>
              <span class="history-time">{{ chat.time }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="sidebar-footer" v-if="!isSidebarCollapsed">
        <div class="user-profile" @click="showProfileMenu = !showProfileMenu">
          <img :src="userPhotoURL" alt="User" v-if="userPhotoURL">
          <div class="avatar-placeholder" v-else>
            {{ userName.charAt(0).toUpperCase() }}
          </div>
          <div class="user-info">
            <span class="username">{{ userName }}</span>
            <span class="user-status">Connected</span>
          </div>
          <i class="fas fa-cog profile-settings"></i>
        </div>
      </div>
    </div>

    <!-- Mobile Sidebar Overlay -->
    <div class="sidebar-overlay" 
         v-if="isMobile && !isSidebarCollapsed" 
         @click="toggleSidebar"
         @touchmove.prevent></div>

    <!-- Main Chat Area -->
    <div class="main-content">
      <!-- Chat Header -->
      <header class="chat-header">
        <button class="menu-btn" @click="toggleSidebar">
          <i class="fas fa-bars"></i>
        </button>
        <div class="chat-title">
          <div class="avatar-container">
            <img src="https://cdn-icons-png.flaticon.com/512/4712/4712139.png" alt="Neura AI" class="chat-logo">
            <span class="status-indicator" :class="{ 'typing': isTyping }"></span>
          </div>
          <div class="title-text">
            <h1>Neura AI</h1>
            <p class="chat-subtitle">
              <template v-if="isTyping">Typing...</template>
              <template v-else>Online</template>
            </p>
          </div>
        </div>
        <div class="header-actions">
          <button class="header-btn" @click="toggleInfo">
            <i class="fas fa-info-circle"></i>
          </button>
          <button class="back-btn" @click="$router.go(-1)">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </header>

      <!-- Chat Messages -->
      <div class="chat-messages" ref="messagesContainer">
        
        <div 
          v-for="(message, index) in messages" 
          :key="index" 
          class="message"
          :class="message.sender"
        >
          <div class="message-avatar" v-if="message.sender === 'neura'">
            <img src="https://cdn-icons-png.flaticon.com/512/4712/4712139.png" alt="Neura">
          </div>
          <div class="message-content">
            <p style="white-space: pre-line">{{ message.text }}</p>
            <span class="message-time">{{ message.time }}</span>
          </div>
        </div>
        
        <div class="typing-indicator" v-if="isTyping">
          <div class="typing-content">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="chat-input-container">
        <div class="quick-replies" v-if="showQuickReplies && !isTyping">
          <button 
            v-for="(reply, index) in quickReplies" 
            :key="index" 
            @click="sendSuggestion(reply)"
            class="quick-reply-btn"
          >
            {{ reply }}
          </button>
        </div>
        
        <form @submit.prevent="sendMessage">
          <button type="button" class="input-btn voice-btn">
            <i class="fas fa-microphone"></i>
          </button>
          <input
            v-model="userInput"
            type="text"
            placeholder="Message Neura..."
            class="chat-input"
            :disabled="isTyping"
            ref="chatInput"
          />
          <button type="button" class="input-btn emoji-btn" @click="toggleEmojiPicker">
            <i class="far fa-smile"></i>
          </button>
          <button type="submit" class="send-btn" :disabled="!userInput || isTyping">
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
        
        <div class="disclaimer">
          <p><i class="fas fa-info-circle"></i> Neura provides supportive listening but is not a substitute for professional care.</p>
        </div>
      </div>
    </div>

    <!-- Emoji Picker -->
    <EmojiPicker
      v-if="showEmojiPicker"
      class="emoji-picker"
      @emoji-click="addEmoji"
      @click-outside="closeEmojiPicker"
    />

    <!-- Info Modal -->
    <div class="modal-overlay" v-if="showInfoModal" @click="showInfoModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>About Neura AI</h3>
          <button class="modal-close" @click="showInfoModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <p>Neura AI is your mental health companion designed to provide supportive listening and guidance.</p>
          <p class="important-note"><i class="fas fa-exclamation-triangle"></i> Neura is not a substitute for professional medical advice or treatment.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.neura-chat-container {
  --primary: #6C5CE7;
  --primary-light: #A29BFE;
  --primary-dark: #5649C0;
  --secondary: #00CEC9;
  --accent: #FD79A8;
  --danger: #FF7675;
  --success: #00B894;
  --text: #2D3436;
  --text-light: #636E72;
  --bg: #F5F6FA;
  --card-bg: #FFFFFF;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  --shadow-hover: 0 14px 28px rgba(0, 0, 0, 0.12), 0 10px 10px rgba(0, 0, 0, 0.10);
  --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  
  display: flex;
  height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  overflow: hidden;
}

/* Improved Sidebar Styles */
.sidebar {
  width: 280px;
  background-color: var(--card-bg);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  z-index: 100;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  will-change: transform;
  position: relative;
}

.sidebar-collapsed {
  width: 70px;
  overflow: hidden;
}

.mobile-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  transform: translateX(-100%);
  touch-action: none;
}

.mobile-sidebar.sidebar-visible {
  transform: translateX(0);
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.2);
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 150;
  backdrop-filter: blur(2px);
  touch-action: none;
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  min-height: 60px;
}

.back-btn {
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}

.back-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.new-chat-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: 8px;
  background-color: var(--primary);
  color: white;
  border: none;
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;
  overflow: hidden;
  flex: 1;
}

.collapse-btn {
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 0.9rem;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
}

.collapse-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* Chat History Styles */
.chat-history {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}

.chat-history h3 {
  font-size: 0.85rem;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.history-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition);
  margin-bottom: 4px;
}

.history-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.history-item.active {
  background-color: rgba(108, 92, 231, 0.1);
  position: relative;
}

.history-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: var(--primary);
  border-radius: 0 3px 3px 0;
}

.history-item i {
  color: var(--primary);
  font-size: 1rem;
  flex-shrink: 0;
}

.history-content {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.history-preview {
  font-size: 0.85rem;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-time {
  font-size: 0.7rem;
  color: var(--text-light);
  margin-top: 2px;
}

/* Collapsed state styles */
.sidebar-collapsed .history-item {
  justify-content: center;
  padding: 12px 0;
}

.sidebar-collapsed .history-item i {
  font-size: 1.1rem;
}

.sidebar-collapsed .history-item.active {
  position: relative;
}

.sidebar-collapsed .history-item.active::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  background-color: var(--primary);
  border-radius: 3px 0 0 3px;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: var(--transition);
}

.user-profile:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.user-profile img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.user-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.username {
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-status {
  font-size: 0.7rem;
  color: var(--text-light);
}

.profile-settings {
  color: var(--text-light);
  font-size: 0.9rem;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  background-color: var(--bg);
}

.chat-header {
  background: var(--card-bg);
  color: var(--text);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
  flex-shrink: 0;
}

.menu-btn {
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
}

.menu-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.chat-title {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.avatar-container {
  position: relative;
  flex-shrink: 0;
}

.chat-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: var(--success);
  border-radius: 50%;
  border: 2px solid var(--card-bg);
}

.status-indicator.typing {
  background-color: var(--secondary);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

.title-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.title-text h1 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-subtitle {
  font-size: 0.8rem;
  color: var(--text-light);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.header-btn, .back-btn {
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
}

.header-btn:hover, .back-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* Chat Messages */
.chat-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: var(--bg);
  background-image: radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.03) 1px, transparent 0);
  background-size: 20px 20px;
}

.welcome-message {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.welcome-content {
  background-color: var(--card-bg);
  border-radius: 16px;
  padding: 24px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: var(--shadow);
}

.welcome-content h2 {
  color: var(--primary);
  margin-bottom: 12px;
  font-size: 1.5rem;
}

.welcome-content p {
  color: var(--text-light);
  margin-bottom: 20px;
  font-size: 1rem;
}

.quick-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 24px;
  background-color: var(--primary-light);
  color: white;
  border: none;
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.9rem;
}

.action-btn:hover {
  background-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

.action-btn i {
  font-size: 0.9rem;
}

.message {
  display: flex;
  max-width: 85%;
  gap: 12px;
}

.message.neura {
  align-self: flex-start;
}

.message.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: auto;
  box-shadow: var(--shadow);
}

.message-avatar img {
  width: 24px;
  height: 24px;
}

.message-content {
  padding: 14px 18px;
  border-radius: 18px;
  position: relative;
  line-height: 1.5;
  font-size: 0.95rem;
  word-break: break-word;
  box-shadow: var(--shadow);
}

.message.neura .message-content {
  background-color: var(--card-bg);
  color: var(--text);
  border-bottom-left-radius: 4px;
}

.message.user .message-content {
  background-color: var(--primary);
  color: white;
  border-bottom-right-radius: 4px;
}

.message-time {
  display: block;
  font-size: 0.7rem;
  opacity: 0.7;
  margin-top: 4px;
}

.message.user .message-time {
  text-align: right;
  color: rgba(255, 255, 255, 0.7);
}

/* Typing Indicator */
.typing-indicator {
  align-self: flex-start;
  background-color: var(--card-bg);
  border-radius: 18px;
  padding: 12px 16px;
  box-shadow: var(--shadow);
  margin-bottom: 8px;
}

.typing-content {
  display: flex;
  align-items: center;
  height: 20px;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: var(--text-light);
  border-radius: 50%;
  margin: 0 2px;
  animation: bounce 1.4s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-5px);
  }
}

/* Chat Input */
.chat-input-container {
  padding: 16px;
  background-color: var(--card-bg);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  flex-shrink: 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.03);
}

.quick-replies {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 12px;
  margin-bottom: 12px;
  scrollbar-width: none;
}

.quick-replies::-webkit-scrollbar {
  display: none;
}

.quick-reply-btn {
  flex-shrink: 0;
  padding: 8px 12px;
  border-radius: 18px;
  background-color: var(--bg);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: var(--text);
  font-size: 0.85rem;
  cursor: pointer;
  transition: var(--transition);
}

.quick-reply-btn:hover {
  background-color: rgba(108, 92, 231, 0.1);
  border-color: var(--primary);
}

form {
  display: flex;
  align-items: center;
  gap: 8px;
}

.input-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.input-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.chat-input {
  flex: 1;
  padding: 12px 16px;
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 0.95rem;
  outline: none;
  transition: var(--transition);
  background-color: var(--bg);
  min-width: 0;
}

.chat-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.2);
}

.send-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
  border: none;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.send-btn:hover {
  background-color: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.send-btn:disabled {
  background-color: var(--text-light);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.disclaimer {
  font-size: 0.7rem;
  color: var(--text-light);
  text-align: center;
  margin-top: 12px;
  padding: 0 10px;
}

.disclaimer i {
  margin-right: 5px;
  color: var(--primary);
}

/* Emoji Picker */
.emoji-picker {
  position: absolute;
  bottom: 80px;
  right: 20px;
  z-index: 100;
  max-height: 300px;
  overflow-y: auto;
  border-radius: 12px;
  box-shadow: var(--shadow-hover);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--card-bg);
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  overflow: auto;
  box-shadow: var(--shadow-hover);
  animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.modal-header h3 {
  margin: 0;
  color: var(--text);
}

.modal-close {
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px;
}

.modal-body {
  padding: 24px 16px;
  color: var(--text);
  text-align: center;
}

.modal-icon {
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: 16px;
}

.important-note {
  background-color: rgba(255, 118, 117, 0.1);
  padding: 12px;
  border-radius: 8px;
  margin-top: 16px;
  color: var(--danger);
}

.important-note i {
  margin-right: 8px;
}

.modal-footer {
  padding: 16px;
  display: flex;
  justify-content: center;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.modal-action-btn {
  padding: 10px 24px;
  border-radius: 24px;
  background-color: var(--primary);
  color: white;
  border: none;
  cursor: pointer;
  transition: var(--transition);
}

.modal-action-btn:hover {
  background-color: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Responsive Improvements */
@media (max-width: 768px) {
  .sidebar {
    width: 85%;
    max-width: 300px;
  }
  
  .sidebar-collapsed {
    width: 0;
    overflow: hidden;
  }
  
  .chat-header {
    padding: 10px 12px;
  }
  
  .header-actions {
    gap: 4px;
  }
  
  .header-btn, .back-btn {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }
  
  .message {
    max-width: 90%;
  }
  
  .welcome-content {
    padding: 16px;
  }
  
  .quick-actions {
    flex-direction: column;
    gap: 8px;
  }
  
  .action-btn {
    justify-content: center;
    width: 100%;
  }
  
  .emoji-picker {
    width: calc(100% - 40px);
    right: 20px;
    left: 20px;
    max-width: 300px;
    margin: 0 auto;
  }
  
  .chat-input {
    padding: 10px 14px;
    font-size: 0.9rem;
  }
  
  .input-btn, .send-btn {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }
}

@media (min-width: 769px) {
  .menu-btn {
    display: none;
  }
  
  .sidebar-overlay {
    display: none;
  }
  
  .sidebar-collapsed .new-chat-btn span {
    display: none;
  }
  
  .sidebar-collapsed .new-chat-btn {
    padding: 10px;
    justify-content: center;
  }
}
</style>

<script>
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';

export default {
  components: {
    EmojiPicker
  },
  data() {
    return {
      userInput: '',
      messages: [{
        sender: 'neura',
        text: "Hello! I'm Neura, your mental health companion. How can I support you today?",
        time: this.getCurrentTime()
      }],
      isTyping: false,
      showQuickReplies: true,
      quickReplies: [
        "I'm feeling anxious",
        "How can I improve my mood?",
        "I need someone to talk to",
        "What are some coping strategies?"
      ],
      isSidebarCollapsed: false,
      showEmojiPicker: false,
      showProfileMenu: false,
      showInfoModal: false,
      userName: 'Guest',
      userPhotoURL: '',
      isAuthenticated: false,
      isMobile: false,
      recentChats: [
        { preview: "How to manage anxiety?", time: "10:30 AM" },
        { preview: "Feeling stressed today", time: "Yesterday" },
        { preview: "Sleep improvement tips", time: "Mar 28" }
      ],
      activeChatIndex: 0,
      authListener: null,
      touchStartX: 0
    };
  },
  created() {
    this.initAuth();
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  methods: {
    initAuth() {
      const auth = getAuth();
      this.authListener = onAuthStateChanged(auth, (user) => {
        if (user) {
          this.isAuthenticated = true;
          this.userName = user.displayName || 'User';
          this.userPhotoURL = user.photoURL || '';
        } else {
          this.isAuthenticated = false;
          this.userName = 'Guest';
          this.userPhotoURL = '';
        }
      });
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
      // On mobile, start with sidebar collapsed
      if (this.isMobile) {
        this.isSidebarCollapsed = true;
      }
    },
    async signOutUser() {
      try {
        await signOut(auth);
        this.showProfileMenu = false;
      } catch (error) {
        console.error("Sign out error:", error);
      }
    },
    getCurrentTime() {
      return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    startNewChat() {
      this.messages = [{
        sender: 'neura',
        text: "Hello! I'm Neura, your mental health companion. How can I support you today?",
        time: this.getCurrentTime()
      }];
      this.showQuickReplies = true;
      this.activeChatIndex = -1;
      
      if (this.isMobile) {
        this.isSidebarCollapsed = true;
      }
    },
    selectChat(index) {
      this.activeChatIndex = index;
      if (this.isMobile) {
        this.isSidebarCollapsed = true;
      }
      // In a real app, you would load the chat history here
      this.messages = [{
        sender: 'neura',
        text: "Continuing our previous conversation about " + this.recentChats[index].preview,
        time: this.getCurrentTime()
      }];
      this.showQuickReplies = false;
    },
    sendSuggestion(text) {
      this.userInput = text;
      this.sendMessage();
      this.showQuickReplies = false;
    },
    async sendMessage() {
      if (!this.userInput.trim()) return;

      const userMessage = {
        sender: 'user',
        text: this.userInput,
        time: this.getCurrentTime(),
      };
      this.messages.push(userMessage);

      this.isTyping = true;
      const userInput = this.userInput;
      this.userInput = '';
      this.scrollToBottom();

      try {
        const chatHistory = this.messages
          .filter((msg) => msg.sender !== 'user' || msg.text !== userInput)
          .map((msg) => ({
            role: msg.sender === 'user' ? 'USER' : 'CHATBOT',
            message: msg.text,
          }));

        const response = await fetch('https://api.cohere.ai/v1/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer McSP3ozqQ7HE2zCj274GgkQRumAFeArq1Bgl9rur',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            model: 'command',
            message: userInput,
            chat_history: chatHistory,
            temperature: 0.7,
            preamble: `You are Neura, a compassionate mental health assistant. 
                      Respond with empathy, support, and professional insight. 
                      If the user is in crisis, gently suggest contacting professional help.`,
          }),
        });

        if (!response.ok) {
          throw new Error(`Cohere API error: ${response.status}`);
        }

        const data = await response.json();
        this.messages.push({
          sender: 'neura',
          text: data.text,
          time: this.getCurrentTime(),
        });
      } catch (error) {
        console.error("Error:", error);
        this.messages.push({
          sender: 'neura',
          text: "I'm having trouble responding right now. Please try again in a moment.",
          time: this.getCurrentTime(),
        });
      }

      this.isTyping = false;
      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      this.showProfileMenu = false;
      this.showEmojiPicker = false;
    },
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
      if (this.showEmojiPicker) {
        this.$nextTick(() => {
          const picker = document.querySelector('.emoji-picker');
          if (picker) {
            picker.scrollTop = 0;
          }
          this.$refs.chatInput?.focus();
        });
      }
    },
    closeEmojiPicker() {
      this.showEmojiPicker = false;
    },
    addEmoji(emoji) {
      this.userInput += emoji.data;
      this.$nextTick(() => {
        this.$refs.chatInput?.focus();
      });
    },
    toggleInfo() {
      this.showInfoModal = !this.showInfoModal;
    },
    handleTouchStart(e) {
      this.touchStartX = e.changedTouches[0].screenX;
    },
    handleTouchEnd(e) {
      const touchEndX = e.changedTouches[0].screenX;
      if (this.touchStartX - touchEndX > 50 && !this.isSidebarCollapsed) {
        this.toggleSidebar();
      } else if (touchEndX - this.touchStartX > 50 && this.isSidebarCollapsed) {
        this.toggleSidebar();
      }
    }
  },
  mounted() {
    document.addEventListener('touchstart', this.handleTouchStart);
    document.addEventListener('touchend', this.handleTouchEnd);
  },
  beforeDestroy() {
    if (this.authListener) this.authListener();
    window.removeEventListener('resize', this.checkMobile);
    document.removeEventListener('touchstart', this.handleTouchStart);
    document.removeEventListener('touchend', this.handleTouchEnd);
  }
};
</script>