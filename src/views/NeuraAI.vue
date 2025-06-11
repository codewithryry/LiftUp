<template>
  <div class="neura-chat-container">
    <!-- Main Chat Area -->
    <div class="main-content">
      <!-- Chat Header -->
      <header class="chat-header">
        <div class="header-left">
          <button class="header-btn back-btn" @click="goBack">
            <i class="fas fa-arrow-left"></i>
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
                <template v-else>Here for you!</template>
              </p>
            </div>
          </div>
        </div>
        <div class="header-actions">
          <button class="header-btn" @click="toggleInfo">
            <i class="fas fa-info-circle"></i>
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

      <!-- Chat Input Area -->
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
        <form @submit.prevent="sendMessage" class="input-form">
          <button type="button" class="input-btn voice-btn" @click="showVoiceWIP">
            <i class="fas fa-microphone"></i>
          </button>
          <input
            v-model="userInput"
            type="text"
            placeholder="Chat with Neura..."
            class="chat-input"
            :disabled="isTyping"
            ref="chatInput"
            @focus="hideEmojiPicker"
          />
          <button type="button" class="input-btn emoji-btn" @click="toggleEmojiPicker">
            <i class="far fa-smile"></i>
          </button>
          <button type="submit" class="send-btn" :disabled="!userInput || isTyping">
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
        <div class="disclaimer">
          <p><i class="fas fa-info-circle"></i> Neura is your friend but not a substitute for professional care.</p>
        </div>
      </div>

      <!-- Info Modal -->
      <transition name="modal-fade">
        <div class="modal-overlay" v-if="showInfoModal" @click="showInfoModal = false">
          <div class="modal-content" @click.stop>
            <div class="modal-header">
              <div class="modal-icon">
                <img src="https://cdn-icons-png.flaticon.com/512/4712/4712139.png" alt="Neura AI" class="chat-logo">
              </div>
              <h3>About Neura AI</h3>
              <button class="modal-close" @click="showInfoModal = false">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="feature-item">
                <i class="fas fa-heart"></i>
                <p>Your friendly mental health companion</p>
              </div>
              <div class="feature-item">
                <i class="fas fa-comments"></i>
                <p>Always here to listen and chat</p>
              </div>
              <div class="feature-item">
                <i class="fas fa-shield-alt"></i>
                <p>Safe and private conversations</p>
              </div>
              <div class="disclaimer-note">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Neura is not a substitute for professional medical advice.</p>
              </div>
            </div>
            <div class="modal-footer">
              <button class="modal-action-btn" @click="showInfoModal = false">
                Got it
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Voice WIP Modal -->
      <transition name="modal-fade">
        <div class="modal-overlay" v-if="showVoiceModal" @click="showVoiceModal = false">
          <div class="modal-content voice-modal" @click.stop>
            <div class="modal-header">
              <div class="modal-icon voice-icon">
                <i class="fas fa-microphone"></i>
              </div>
              <h3>Voice Input</h3>
              <button class="modal-close" @click="showVoiceModal = false">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="voice-wave">
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
              </div>
              <p class="voice-instruction">Voice input is coming soon!</p>
              <p class="voice-note">For now, let's keep chatting with text.</p>
            </div>
            <div class="modal-footer">
              <button class="modal-action-btn primary" @click="showVoiceModal = false">
                Continue with text
              </button>
            </div>
          </div>
        </div>
      </transition>
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
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.15);
  --transition: all 0.3s ease;

  display: flex;
  height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: hidden;
  background-color: var(--bg);
}

/* Modal transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Modern Modal Styles */
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
  padding: 16px;
}

.modal-content {
  background-color: var(--card-bg);
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
  animation: modalSlideUp 0.4s ease;
}

.voice-modal {
  max-width: 380px;
}

@keyframes modalSlideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  padding: 20px;
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.modal-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: var(--primary);
  font-size: 1.2rem;
}

.voice-icon {
  background-color: rgba(0, 206, 201, 0.1);
  color: var(--secondary);
}

.modal-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--text);
  flex: 1;
}

.modal-close {
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px;
  transition: var(--transition);
}

.modal-close:hover {
  color: var(--text);
}

.modal-body {
  padding: 20px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}

.feature-item i {
  color: var(--primary);
  font-size: 1.1rem;
  margin-top: 2px;
}

.feature-item p {
  margin: 0;
  color: var(--text);
  font-size: 0.95rem;
  line-height: 1.5;
}

.disclaimer-note {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 20px;
  padding: 12px;
  background-color: rgba(255, 118, 117, 0.08);
  border-radius: 8px;
}

.disclaimer-note i {
  color: var(--danger);
  font-size: 1.1rem;
  margin-top: 2px;
}

.disclaimer-note p {
  margin: 0;
  color: var(--text);
  font-size: 0.85rem;
  line-height: 1.5;
}

.modal-footer {
  padding: 16px 20px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.modal-action-btn {
  padding: 10px 20px;
  border-radius: 8px;
  background-color: var(--bg);
  border: none;
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.modal-action-btn.primary {
  background-color: var(--primary);
  color: white;
}

.modal-action-btn:hover {
  opacity: 0.9;
}

/* Voice Modal Specific Styles */
.voice-wave {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 60px;
  margin: 20px 0;
}

.wave-bar {
  width: 6px;
  height: 30px;
  background-color: var(--secondary);
  border-radius: 3px;
  animation: waveAnimation 1.4s infinite ease-in-out;
}

.wave-bar:nth-child(1) { animation-delay: 0s; height: 20px; }
.wave-bar:nth-child(2) { animation-delay: 0.2s; height: 40px; }
.wave-bar:nth-child(3) { animation-delay: 0.4s; height: 60px; }
.wave-bar:nth-child(4) { animation-delay: 0.6s; height: 40px; }
.wave-bar:nth-child(5) { animation-delay: 0.8s; height: 20px; }

@keyframes waveAnimation {
  0%, 100% { height: 20px; }
  50% { height: 60px; }
}

.voice-instruction {
  text-align: center;
  font-size: 1rem;
  color: var(--text);
  margin: 20px 0 10px;
  font-weight: 500;
}

.voice-note {
  text-align: center;
  font-size: 0.85rem;
  color: var(--text-light);
  margin: 0;
}

/* Main Content */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Chat Header */
.chat-header {
  background: var(--card-bg);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  z-index: 10;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.back-btn {
  background: none;
  border: none;
  color: var(--text);
  font-size: 1.1rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: var(--transition);
}

.back-btn:hover {
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
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
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
  color: var(--text);
}

.chat-subtitle {
  font-size: 0.8rem;
  color: var(--text-light);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.header-btn {
  background: none;
  border: none;
  color: var(--text);
  font-size: 1.1rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: var(--transition);
}

.header-btn:hover {
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
}

.message {
  display: flex;
  max-width: 80%;
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--card-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: auto;
  box-shadow: var(--shadow);
}

.message-avatar img {
  width: 20px;
  height: 20px;
}

.message-content {
  padding: 12px 16px;
  border-radius: 16px;
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
  border-radius: 16px;
  padding: 10px 14px;
  box-shadow: var(--shadow);
}

.typing-content {
  display: flex;
  align-items: center;
}

.dot {
  width: 6px;
  height: 6px;
  background-color: var(--text-light);
  border-radius: 50%;
  margin: 0 2px;
  animation: bounce 1.4s infinite ease-in-out;
}

.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-4px); }
}

/* Chat Input */
.chat-input-container {
  padding: 16px;
  background-color: var(--card-bg);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
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
  border-radius: 16px;
  background-color: var(--bg);
  border: 1px solid var(--primary-light);
  color: var(--text);
  font-size: 0.85rem;
  cursor: pointer;
  transition: var(--transition);
}

.quick-reply-btn:hover {
  background-color: var(--primary-light);
  color: white;
}

form {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--bg);
  border-radius: 24px;
  padding: 8px;
}

.input-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: none;
  border: none;
  color: var(--text);
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
}

.input-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.chat-input {
  flex: 1;
  padding: 10px 12px;
  border: none;
  font-size: 0.95rem;
  outline: none;
  background: transparent;
  color: var(--text);
}

.chat-input::placeholder {
  color: var(--text-light);
}

.send-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
  border: none;
  cursor: pointer;
  transition: var(--transition);
}

.send-btn:hover {
  background-color: var(--primary-dark);
}

.send-btn:disabled {
  background-color: var(--text-light);
  cursor: not-allowed;
}

.disclaimer {
  font-size: 0.7rem;
  color: var(--text-light);
  text-align: center;
  margin-top: 12px;
}

.disclaimer i {
  margin-right: 5px;
  color: var(--primary);
}

/* Emoji Picker */
.emoji-picker-container {
  position: absolute;
  bottom: 80px;
  right: 16px;
  z-index: 100;
  max-height: 300px;
  border-radius: 12px;
  box-shadow: var(--shadow-hover);
  background: var(--card-bg);
}

.emoji-close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: var(--text);
  font-size: 1rem;
  cursor: pointer;
  padding: 4px;
  z-index: 101;
}

.emoji-close-btn:hover {
  color: var(--primary);
}

.emoji-picker {
  max-height: 300px;
  overflow-y: auto;
  border-radius: 12px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .chat-header {
    padding: 10px 12px;
  }

  .message {
    max-width: 85%;
  }

  .chat-input-container {
    padding: 12px;
  }

  .emoji-picker-container {
    width: calc(100% - 32px);
    left: 16px;
    right: 16px;
  }
}
</style>

<script>
import { auth } from '@/firebase';
import { signOut, getAuth, onAuthStateChanged } from 'firebase/auth';
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';

export default {
  components: {
    EmojiPicker
  },
  data() {
    return {
      userInput: '',
      messages: [],
      isTyping: false,
      showQuickReplies: true,
      quickReplies: [
        "I'm feeling a bit down",
        "Can we chat about something fun?",
        "I need a mood boost",
        "What's a good way to relax?"
      ],
      showMenu: false,
      showEmojiPicker: false,
      showProfileMenu: false,
      showInfoModal: false,
      showChatHistoryModal: false,
      showVoiceModal: false,
      userName: 'Guest',
      userPhotoURL: '',
      isAuthenticated: false,
      authListener: null
    };
  },
  created() {
    this.initAuth();
    this.loadMessages();
  },
  methods: {
    initAuth() {
      const auth = getAuth();
      this.authListener = onAuthStateChanged(auth, (user) => {
        this.isAuthenticated = !!user;
        this.userName = user?.displayName || 'Guest';
        this.userPhotoURL = user?.photoURL || '';
      });
    },
    async signOutUser() {
      try {
        await signOut(auth);
        this.showProfileMenu = false;
        this.showMenu = false;
      } catch (error) {
        console.error("Sign out error:", error);
      }
    },
    getCurrentTime() {
      return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    loadMessages() {
      const savedMessages = localStorage.getItem('neuraChatMessages');
      if (savedMessages) {
        this.messages = JSON.parse(savedMessages);
      } else {
        this.messages = [{
          sender: 'neura',
          text: "Hey there! I'm Neura, your friendly companion. What's on your mind today?",
          time: this.getCurrentTime()
        }];
      }
      this.scrollToBottom();
    },
    saveMessages() {
      localStorage.setItem('neuraChatMessages', JSON.stringify(this.messages));
    },
    startNewChat() {
      this.messages = [{
        sender: 'neura',
        text: "Hey there! I'm Neura, your friendly companion. What's on your mind today?",
        time: this.getCurrentTime()
      }];
      this.showQuickReplies = true;
      this.saveMessages();
      this.scrollToBottom();
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
      this.saveMessages();

      this.isTyping = true;
      const userInput = this.userInput;
      this.userInput = '';
      this.scrollToBottom();

      try {
        const chatHistory = this.messages.slice(-10).map((msg) => ({
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
            model: 'command-r-plus',
            message: userInput,
            chat_history: chatHistory,
            temperature: 0.8,
            max_tokens: 200,
            preamble: `You are Neura, a warm and friendly AI companion. Respond with empathy, a touch of humor, and a conversational tone, like a close friend. Keep responses concise, engaging, and supportive. If the user seems distressed, gently suggest professional help while staying caring.`,
          }),
        });

        if (!response.ok) {
          throw new Error(`Cohere API error: ${response.status}`);
        }

        const data = await response.json();
        const cleanText = data.text.replace(/[\*\#]/g, '').trim();
        this.messages.push({
          sender: 'neura',
          text: cleanText,
          time: this.getCurrentTime(),
        });
        this.saveMessages();
      } catch (error) {
        console.error("Error:", error);
        this.messages.push({
          sender: 'neura',
          text: "Oops, I'm having a little hiccup. Let's try that again, okay?",
          time: this.getCurrentTime(),
        });
        this.saveMessages();
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
    toggleMenu() {
      this.showMenu = !this.showMenu;
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
      this.userInput += emoji.i;
      this.$nextTick(() => {
        this.$refs.chatInput?.focus();
      });
    },
    toggleInfo() {
      this.showInfoModal = !this.showInfoModal;
    },
    showVoiceWIP() {
      this.showVoiceModal = true;
    },
    goBack() {
      this.saveMessages();
      this.$router.push('/emergency');
    }
  },
  beforeDestroy() {
    if (this.authListener) this.authListener();
  }
};
</script>