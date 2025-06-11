<template>
  <div class="mental-health-widget">
    <!-- Toggle Button (non-floating) -->
    <button 
      v-if="!isOpen"
      class="widget-toggle"
      @click="toggleWidget"
      aria-label="Open mental health widget"
    >
      <span class="toggle-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
        <path d="M4 20C4 16.6863 7.13401 14 11 14H13C16.866 14 20 16.6863 20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M19 10H20C21.1046 10 22 10.8954 22 12V14C22 15.1046 21.1046 16 20 16H19" stroke="currentColor" stroke-width="2"/>
      </svg>
      </span>
    </button>

    <!-- Widget Container -->
    <transition name="slide-up">
      <div v-if="isOpen" class="widget-container">
        <!-- Widget Header -->
        <div class="widget-header">
          <div class="widget-identity">
            <div class="widget-avatar">
              <img src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png" alt="Neura Support">
            </div>
            <div class="widget-info">
              <h3>Neura Support</h3>
            </div>
          </div>
          <div class="header-actions">
            <button @click="toggleWidget" class="action-btn close-btn" aria-label="Close widget">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Messages Container -->
        <div ref="messagesContainer" class="messages-container">
          <!-- Welcome Message -->
          <div class="message neura welcome-message">
            <div class="message-content">
              <p>Hi! I'm Neura, here for quick mental health support. What's on your mind?</p>
            </div>
          </div>

          <!-- Chat Messages -->
          <transition-group name="message-fade" tag="div" class="messages-list">
            <div 
              v-for="(msg, index) in messages" 
              :key="index" 
              :class="['message', msg.sender]"
            >
              <div class="message-content">
                <p>{{ msg.text }}</p>
              </div>
            </div>
          </transition-group>

          <!-- Typing Indicator -->
          <div v-if="isTyping" class="typing-indicator">
            <div class="typing-dots">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="input-area">
          <div class="input-wrapper">
            <input
              type="text"
              v-model="userInput"
              @keyup.enter="sendMessage"
              placeholder="Type your message..."
              aria-label="Type your message"
            />
            <button 
              @click="sendMessage" 
              class="send-btn"
              :disabled="!userInput.trim()"
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="input-footer">
            <small>Neura may produce inaccurate information. For deeper support, <a href="emergency/neura">visit the full assistant</a>.</small>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { auth } from '@/firebase';
import { signOut, getAuth, onAuthStateChanged } from 'firebase/auth';
import componentData from '@/assets/componentData.json';

export default {
  name: 'MentalHealthWidget',
  data() {
    return {
      isOpen: false,
      userInput: '',
      messages: [],
      isTyping: false,
      userName: 'Guest',
      userPhotoURL: '',
      isAuthenticated: false,
      authListener: null,
      language: 'english'
    };
  },
  created() {
    this.initAuth();
    this.loadMessages();
  },
  methods: {
    initAuth() {
      const firebaseAuth = getAuth();
      this.authListener = onAuthStateChanged(firebaseAuth, (user) => {
        this.isAuthenticated = !!user;
        this.userName = user?.displayName || 'Guest';
        this.userPhotoURL = user?.photoURL || '';
      });
    },

    async signOutUser() {
      try {
        await signOut(auth);
      } catch (error) {
        console.error('Sign out error:', error);
      }
    },

    getCurrentTime() {
      return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },

    loadMessages() {
      const saved = localStorage.getItem('neuraWidgetMessages');
      if (saved) {
        this.messages = JSON.parse(saved);
      }
      this.scrollToBottom();
    },

    saveMessages() {
      localStorage.setItem('neuraWidgetMessages', JSON.stringify(this.messages));
    },

    async sendMessage() {
      if (!this.userInput.trim()) return;

      const userMsg = {
        sender: 'user',
        text: this.userInput,
        time: this.getCurrentTime(),
      };
      this.messages.push(userMsg);
      this.saveMessages();

      this.isTyping = true;
      let inputText = this.userInput;
      this.userInput = '';
      this.scrollToBottom();

      try {
        // Check if the query is about a component or creator
        const componentResponse = this.checkComponentQuery(inputText);
        if (componentResponse) {
          this.messages.push({
            sender: 'neura',
            text: componentResponse,
            time: this.getCurrentTime(),
          });
          this.saveMessages();
          this.isTyping = false;
          this.scrollToBottom();
          return;
        }

        // Translate to English if necessary
        if (this.language === 'tagalog') {
          inputText = await this.translate(inputText, 'en');
        }

        const chatHistory = this.messages.slice(-5).map((msg) => ({
          role: msg.sender === 'user' ? 'USER' : 'CHATBOT',
          message: msg.text,
        }));

        const preambles = {
          english: `You are Neura, a quick-support AI for mental health. Provide short, empathetic responses in English to help users with their immediate emotional needs. Focus on emotional safety and suggest visiting the full assistant for deeper support if needed.`,
          tagalog: `You are Neura, a quick-support AI for mental health. Provide short, empathetic responses in English. This message will be translated into Tagalog for the user. Keep the response simple and culturally respectful.`,
        };

        const response = await fetch('https://api.cohere.ai/v1/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 3NcMTsheq5hJ7yvpxEN6Ls2h2deAy5KmGUydhAl4`,
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            model: 'command-r-plus',
            message: inputText,
            chat_history: chatHistory,
            temperature: 0.8,
            max_tokens: 100,
            preamble: preambles[this.language],
          }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        let cleanText = data.text.replace(/[\*\#]/g, '').trim();

        // Translate response to Tagalog if needed
        if (this.language === 'tagalog') {
          cleanText = await this.translate(cleanText, 'tl');
        }

        this.messages.push({
          sender: 'neura',
          text: cleanText,
          time: this.getCurrentTime(),
        });
        this.saveMessages();
      } catch (error) {
        console.error('Message sending error:', error);
        this.messages.push({
          sender: 'neura',
          text: "I'm having trouble right now. Try again or visit the full assistant for more help.",
          time: this.getCurrentTime(),
        });
        this.saveMessages();
      }

      this.isTyping = false;
      this.scrollToBottom();
    },

    checkComponentQuery(query) {
      const lowerQuery = query.toLowerCase();

      // Check for creator-related queries
      if (lowerQuery.includes('creator') || lowerQuery.includes('created') || lowerQuery.includes('who made') || lowerQuery.includes('who create')) {
        const creator = {
          name: 'codewithryry',
          role: 'Creator & Developer',
          description: 'The founder of LiftUp and creator of the platform’s core systems. Focused on accessible, tech-driven mental health tools that empower users worldwide.'
        };
        return `LiftUp was created by ${creator.name} (${creator.role}): ${creator.description}`;
      }

      // Check for component-related queries
      for (const [fileName, data] of Object.entries(componentData)) {
        const componentName = data.name.toLowerCase();
        if (lowerQuery.includes(componentName) || lowerQuery.includes(fileName.toLowerCase())) {
          return `The ${data.name} page is about: ${data.description}`;
        }
      }
      return null;
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) container.scrollTop = container.scrollHeight;
      });
    },

    toggleWidget() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.scrollToBottom();
      }
    },

    goToFullAssistant() {
      this.$router.push('/emergency/neura');
      this.isOpen = false;
    },

    async translate(text, targetLang) {
      // Add your translation logic here (Google Translate API or other)
      return text;
    }
  },

  beforeDestroy() {
    if (this.authListener) {
      this.authListener();
    }
  }
};
</script>

<style scoped>
.mental-health-widget {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.widget-toggle {
  position: fixed; /* use fixed for consistent positioning */
  bottom: 16px;
  right: 16px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #7C3AED, #5B21B6);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 0;
}

/* Hover effect */
.widget-toggle:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}

/* Icon (SVG) inside the button */
.widget-toggle svg {
  width: 28px;
  height: 28px;
  stroke: white;
  stroke-width: 2;
  transition: transform 0.3s ease;
}

/* Small screens */
@media (max-width: 480px) {
  .widget-toggle {
    width: 50px;
    height: 50px;
  }

  .widget-toggle svg {
    width: 22px;
    height: 22px;
  }
}

/* Large screens */
@media (min-width: 768px) {
  .widget-toggle {
    width: 65px;
    height: 65px;
  }

  .widget-toggle svg {
    width: 30px;
    height: 30px;
  }
}

@media (min-width: 1200px) {
  .widget-toggle {
    width: 70px;
    height: 70px;
  }

  .widget-toggle svg {
    width: 32px;
    height: 32px;
  }
}


/* Widget Container */
.widget-container {
  width: 320px;
  height: 500px;
  max-height: 70vh;
  background: #f0f4ff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
/* Header */
.widget-header {
  padding: 12px;
  background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.widget-identity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.widget-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.widget-avatar img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.widget-info h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.header-actions {
  display: flex;
  gap: 6px;
  align-items: center;
}

.action-btn {
  background: transparent;
  border: none;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.close-btn {
  margin-left: 4px;
}

/* Messages Container */
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  background: #f0f4ff;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
}

.messages-container::-webkit-scrollbar {
  width: 5px;
}

.messages-container::-webkit-scrollbar-track {
  background: transparent;
}

.messages-container::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 16px;
  position: relative;
  animation: fadeIn 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.message.user {
  align-self: flex-end;
  background: white;
  color: rgb(0, 0, 0);
  border-bottom-right-radius: 4px;
}

.message.neura {
  align-self: flex-start;
  background: white;
  color: #333;
  border: 1px solid #e0e4ff;
  border-bottom-left-radius: 4px;
}

.message.welcome-message {
  align-self: flex-start;
  background: white;
  color: #333;
  border: 1px solid #e0e4ff;
  border-bottom-left-radius: 4px;
  animation: slideIn 0.4s ease;
}

.message-content p {
  margin: 0;
  line-height: 1.4;
  font-size: 13px;
}

.message.neura .message-time,
.message.welcome-message .message-time {
  color: rgba(0, 0, 0, 0.5);
}

/* Typing Indicator */
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: white;
  border-radius: 16px;
  align-self: flex-start;
  margin-top: 6px;
  font-size: 11px;
  color: #666;
  border: 1px solid #e0e4ff;
}

.typing-dots {
  display: flex;
  gap: 3px;
}

.dot {
  width: 5px;
  height: 5px;
  background: #999;
  border-radius: 50%;
  animation: bounce 1.2s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: -0.24s;
}

.dot:nth-child(2) {
  animation-delay: -0.12s;
}

/* Input Area */
.input-area {
  padding: 10px 12px;
  border-top: 1px solid #e0e4ff;
  background: white;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #e0e4ff;
  border-radius: 20px;
  font-size: 13px;
  outline: none;
  transition: border 0.2s;
  background: #f8faff;
}

input:focus {
  border-color: #000000;
  background: white;
}

.input-footer {
  text-align: center;
  color: #888;
  font-size: 10px;
  padding: 0 6px;
}

.input-footer a {
  color: #000000;
  text-decoration: none;
}

.input-footer a:hover {
  text-decoration: underline;
}

.send-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #7C3AED;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.send-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.send-btn:not(:disabled):hover {
  background: #009875;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { 
    opacity: 0;
    transform: translateY(10px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-4px); }
}

/* Transitions */
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter, .slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.message-fade-enter-active, .message-fade-leave-active {
  transition: all 0.3s ease;
}
.message-fade-enter, .message-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>