<template>
  <div class="neura-chat-container">
    <!-- Main Chat Area -->
    <div class="main-content">
      <!-- Chat Header -->
      <header class="chat-header">
        <div class="header-left">
          <button class="header-btn back-btn" @click="goBack" title="Back">
            <i class="fas fa-arrow-left"></i>
          </button>
          <div class="chat-title">
            <div class="avatar-container">
              <img :src="currentModel.avatar" alt="AI Avatar" class="chat-logo">
              <span class="status-indicator" :class="{ 'typing': isTyping }"></span>
            </div>
            <div class="title-text">
              <h1>{{ currentModel.name }}</h1>
              <p class="chat-subtitle">
                <template v-if="isTyping">Typing...</template>
                <template v-else>{{ currentModel.tagline }}</template>
              </p>
            </div>
          </div>
        </div>
        <div class="header-actions">
          <button class="header-btn" @click="toggleSettings" title="Settings">
            <i class="fas fa-cog"></i>
          </button>
          <button class="header-btn" @click="toggleInfo" title="Info">
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
          <div class="message-avatar" v-if="message.sender === selectedModel">
            <img :src="currentModel.avatar" alt="AI Avatar">
          </div>
          <div class="message-content">
            <p style="white-space: pre-line">{{ message.text }}</p>
            <span class="message-time">{{ message.time }}</span>
            <div class="message-actions" v-if="message.sender === selectedModel">
              <button 
                class="action-btn" 
                :class="{ 'active': message.liked }" 
                disabled
                title="Like"
              >
                <i class="fas fa-thumbs-up"></i>
              </button>
              <button 
                class="action-btn" 
                :class="{ 'active': message.disliked }" 
                disabled
                title="Dislike"
              >
                <i class="fas fa-thumbs-down"></i>
              </button>
              <button 
                class="action-btn" 
                @click="redoMessage(index)"
                title="Redo"
              >
                <i class="fas fa-redo"></i>
              </button>
              <button 
                class="action-btn" 
                @click="copyMessage(message.text)"
                title="Copy"
              >
                <i class="fas fa-copy"></i>
              </button>
              <button 
                class="action-btn menu-btn" 
                disabled
                title="More options"
              >
                <i class="fas fa-ellipsis-v"></i>
              </button>
            </div>
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
          <button type="button" class="input-btn voice-btn" @click="showVoiceWIP" title="Voice Input">
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
            @keyup.enter="sendMessage"
          />
          <button type="button" class="input-btn emoji-btn" @click="toggleEmojiPicker" title="Emoji">
            <i class="far fa-smile"></i>
          </button>
          <button type="button" class="input-btn switch-btn" @click="switchModel" title="Switch Model">
            <i class="fas fa-sync-alt"></i>
          </button>
          <button type="submit" class="send-btn" :disabled="!userInput || isTyping" title="Send">
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
                <img :src="currentModel.avatar" alt="AI Avatar" class="chat-logo">
              </div>
              <h3>About {{ currentModel.name }}</h3>
              <button class="modal-close" @click="showInfoModal = false" title="Close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="feature-item">
                <i class="fas fa-heart"></i>
                <p>{{ currentModel.description }}</p>
              </div>
              <div class="feature-item">
                <i class="fas fa-comments"></i>
                <p>Mood: {{ currentModel.mood }}</p>
              </div>
              <div class="feature-item">
                <i class="fas fa-shield-alt"></i>
                <p>Safe and private conversations</p>
              </div>
            </div>
            <div class="modal-footer">
              <button class="modal-action-btn primary" @click="showInfoModal = false">Got it</button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Voice WIP Modal -->
      <transition name="modal-fade">
        <div class="modal-overlay" v-if="showVoiceModal" @click="showVoiceModal = false">
          <div class="modal-content voice-modal" @click.stop>
            <div class="modal-header">
              <!-- <div class="modal-icon voice-icon">
                <i class="fas fa-microphone"></i>
              </div>
              <h3>Voice Input</h3>
              <button class="modal-close" @click="showVoiceModal = false" title="Close">
                <i class="fas fa-times"></i>
              </button> -->
            </div>
            <div class="modal-body">
              <!-- <div class="voice-wave">
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
              </div> -->
              <p class="voice-instruction">Voice input is coming soon!</p>
              <p class="voice-note">For now, let's keep chatting with text.</p>
            </div>
            <div class="modal-footer">
              <button class="modal-action-btn primary" @click="showVoiceModal = false">Continue with text</button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Settings Modal -->
      <transition name="modal-fade">
        <div class="modal-overlay" v-if="showSettingsModal" @click="showSettingsModal = false">
          <div class="modal-content" @click.stop>
            <div class="modal-header">
              <div class="modal-icon">
                <i class="fas fa-cog"></i>
              </div>
              <h3>Settings</h3>
              <button class="modal-close" @click="showSettingsModal = false" title="Close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="feature-item">
                <i class="fas fa-robot"></i>
                <div class="feature-item-content">
                  <p>Select AI Model</p>
                  <select v-model="selectedModel" @change="changeModel" class="model-dropdown">
                    <option v-for="model in aiModels" :key="model.id" :value="model.id">
                      {{ model.name }} - {{ model.mood }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="feature-item">
                <i class="fas fa-comment-alt"></i>
                <div class="feature-item-content">
                  <p>Response Style</p>
                  <select v-model="responseStyle" class="response-style-dropdown">
                    <option value="short">Short (1-2 sentences)</option>
                    <option value="balanced">Balanced (3-5 sentences)</option>
                    <option value="detailed">Detailed (5+ sentences)</option>
                  </select>
                </div>
              </div>
              <!-- <div class="feature-item">
                <i class="fas fa-trash-alt"></i>
                <div class="feature-item-content">
                  <p>Clear Chat History</p>
                  <button class="modal-action-btn" @click="clearHistory">Clear</button>
                </div>
              </div> -->
              <!-- <div class="feature-item">
                <i class="fas fa-history"></i>
                <div class="feature-item-content">
                  <p>View Chat History</p>
                  <button class="modal-action-btn" @click="toggleChatHistory">View</button>
                </div>
              </div> -->
            </div>
            <div class="modal-footer">
              <button class="modal-action-btn primary" @click="saveSettings">Save Settings</button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Chat History Modal -->
      <transition name="modal-fade">
        <div class="modal-overlay" v-if="showChatHistoryModal" @click="showChatHistoryModal = false">
          <div class="modal-content" @click.stop>
            <div class="modal-header">
              <div class="modal-icon">
                <i class="fas fa-history"></i>
              </div>
              <h3>Chat History</h3>
              <button class="modal-close" @click="showChatHistoryModal = false" title="Close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <div v-if="messages.length > 0" class="history-messages">
                <div 
                  v-for="(message, index) in messages" 
                  :key="index" 
                  class="message"
                  :class="message.sender"
                >
                  <div class="message-content">
                    <p style="white-space: pre-line">{{ message.text }}</p>
                    <span class="message-time">{{ message.time }}</span>
                  </div>
                </div>
              </div>
              <p v-else>No chat history available.</p>
            </div>
            <div class="modal-footer">
              <button class="modal-action-btn primary" @click="showChatHistoryModal = false">Close</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>


<script>
import { auth } from '@/firebase';
import { signOut, getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  components: {},
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
      showEmojiPicker: false,
      showInfoModal: false,
      showChatHistoryModal: false,
      showVoiceModal: false,
      showSettingsModal: false,
      userName: 'Guest',
      userPhotoURL: '',
      isAuthenticated: false,
      authListener: null,
      selectedModel: 'neura',
      responseStyle: 'balanced',
      aiModels: [
        {
          id: 'neura',
          name: 'Neura AI',
          mood: 'Balanced',
          avatar: 'https://cdn-icons-png.flaticon.com/512/4712/4712139.png',
          tagline: 'Here for you!',
          description: 'Your all-around mental health companion for balanced support',
          preamble: `You are Neura, a compassionate and supportive AI designed for mental health assistance.
          Always communicate in a warm, empathetic, and friendly tone. 
          Use Tagalog or Taglish by default unless the user speaks purely in English. 
          Offer comfort, encouragement, and gentle guidance. Keep responses natural and conversational, 
          with clear punctuation and easy-to-understand phrasing. When addressing complex issues, summarize key points briefly. 
          Your focus is emotional well-being, validation, and friendly dialogue.`
        },
        {
          id: 'serena',
          name: 'Serena',
          mood: 'Calm',
          avatar: 'https://cdn-icons-png.flaticon.com/512/4712/4712034.png',
          tagline: "Let's find your peace",
          description: 'Specializes in relaxation, mindfulness, and stress reduction',
          preamble: `You are Serena, a soothing AI that promotes mindfulness and emotional calm. 
          Your voice is soft, gentle, and unhurried. Use calming language and provide tools like breathing techniques, 
          short meditations, and mindful reflections. Speak as if guiding the user through a moment of stillness. 
          Prioritize serenity, presence, and relaxation. Avoid long paragraphs; let silence and simplicity speak.
          Help the user de-escalate stress and feel grounded in the moment.`
        },
        {
          id: 'vitalis',
          name: 'Vitalis',
          mood: 'Energetic',
          avatar: 'https://cdn-icons-png.flaticon.com/512/4712/4712134.png',
          tagline: "Let's get motivated!",
          description: 'Your energetic coach for motivation and positive action',
          preamble: `You are Vitalis, an energetic, positive, and action-focused AI. 
          Your tone is enthusiastic, confident, and supportive — like a personal coach cheering the user on. 
          Help users set goals, stay motivated, and overcome mental barriers. 
          Use short, punchy sentences with the occasional emoji (💪, 🌟) to energize them. 
          Celebrate even small progress, and always highlight actionable steps. 
          You aim to uplift, empower, and get people moving forward with clarity and momentum.`
        },
        {
          id: 'sage',
          name: 'Sage',
          mood: 'Wise',
          avatar: 'https://cdn-icons-png.flaticon.com/512/4712/4712079.png',
          tagline: 'Reflect and grow',
          description: 'Provides thoughtful insights and philosophical perspectives',
          preamble: `You are Sage, a wise and reflective AI who helps users explore their thoughts and emotions deeply. 
          Use a calm, thoughtful tone. Ask meaningful questions, use analogies, and help users connect the dots in their own experiences. 
          Your goal is not to give answers, but to guide introspection and personal growth. 
          Favor clarity over complexity. Occasionally use gentle challenges to shift perspective. 
          Speak like a kind mentor or therapist encouraging inner discovery and growth.`
        },
        {
          id: 'lingua',
          name: 'Lingua',
          mood: 'Multilingual',
          avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          tagline: 'Talk to me in any language!',
          description: 'Your friendly multilingual AI for conversations in English, Tagalog, Spanish, and more.',
          preamble: `You are Lingua, a multilingual AI trained to recognize and respond in the exact language the user uses in each message. 
          You support English, Tagalog, Spanish, Japanese, and other major languages. 
          Always detect the language of the user's current message and respond only in that language. 
          Do not mix languages unless the user does. 
          If the user switches language, switch accordingly. Never ask what a word means — instead, respond in the same language and tone used by the user. 
          Be empathetic, helpful, and natural in your replies.`
        }
      ]
    };
  },
  computed: {
    currentModel() {
      return this.aiModels.find(model => model.id === this.selectedModel) || this.aiModels[0];
    }
  },
  created() {
    this.initAuth();
    this.loadMessages();
    this.loadResponseStyle();
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
        this.showSettingsModal = false;
      } catch (error) {
        console.error("Sign out error:", error);
      }
    },
    getCurrentTime() {
      return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    loadMessages() {
      const storageKey = `neuraChatMessages_${this.selectedModel}`;
      const savedMessages = localStorage.getItem(storageKey);
      if (savedMessages) {
        this.messages = JSON.parse(savedMessages).map(msg => ({
          ...msg,
          liked: msg.liked || false,
          disliked: msg.disliked || false,
          showMenu: msg.showMenu || false
        }));
      } else {
        this.messages = [{
          sender: this.selectedModel,
          text: `Hey there! I'm ${this.currentModel.name}, your friendly companion. What's on your mind today?`,
          time: this.getCurrentTime(),
          liked: false,
          disliked: false,
          showMenu: false
        }];
      }
      this.scrollToBottom();
    },
    saveMessages() {
      const storageKey = `neuraChatMessages_${this.selectedModel}`;
      localStorage.setItem(storageKey, JSON.stringify(this.messages));
    },
    loadResponseStyle() {
      const storageKey = `neuraResponseStyle_${this.selectedModel}`;
      const savedStyle = localStorage.getItem(storageKey);
      if (savedStyle) {
        this.responseStyle = savedStyle;
      } else {
        this.responseStyle = 'balanced';
      }
    },
    saveSettings() {
      const storageKey = `neuraResponseStyle_${this.selectedModel}`;
      localStorage.setItem(storageKey, this.responseStyle);
      this.showSettingsModal = false;
    },
    clearHistory() {
      const storageKey = `neuraChatMessages_${this.selectedModel}`;
      localStorage.removeItem(storageKey);
      this.startNewChat();
      this.showSettingsModal = false;
    },
    toggleSettings() {
      this.showSettingsModal = !this.showSettingsModal;
    },
    toggleChatHistory() {
      this.showChatHistoryModal = !this.showChatHistoryModal;
      this.showSettingsModal = false;
    },
    switchModel() {
      const currentIndex = this.aiModels.findIndex(model => model.id === this.selectedModel);
      const nextIndex = (currentIndex + 1) % this.aiModels.length;
      this.selectedModel = this.aiModels[nextIndex].id;
      this.changeModel();
    },
    startNewChat() {
      this.messages = [{
        sender: this.selectedModel,
        text: `Hey there! I'm ${this.currentModel.name}, your friendly companion. What's on your mind today?`,
        time: this.getCurrentTime(),
        liked: false,
        disliked: false,
        showMenu: false
      }];
      this.showQuickReplies = true;
      this.saveMessages();
      this.scrollToBottom();
    },
    changeModel() {
      this.saveMessages();
      this.loadResponseStyle();
      this.loadMessages();
      this.startNewChat();
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
        liked: false,
        disliked: false,
        showMenu: false
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

        let styleInstruction = '';
        if (this.responseStyle === 'short') {
          styleInstruction = 'Keep responses short (1-2 sentences).';
        } else if (this.responseStyle === 'balanced') {
          styleInstruction = 'Vary response length naturally (3-5 sentences).';
        } else if (this.responseStyle === 'detailed') {
          styleInstruction = 'Provide detailed responses (5+ sentences) with in-depth explanations.';
        }

        const enhancedPrompt = `${this.currentModel.preamble}
          ${styleInstruction}
          Respond conversationally, matching the user's tone and message length when appropriate.
          Always end with proper punctuation. For complex topics, provide a brief summary.
          Keep the focus on mental health and emotional support.`;

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
            temperature: 0.7,
            max_tokens: this.responseStyle === 'detailed' ? 500 : 300,
            preamble: enhancedPrompt,
            connectors: [{ "id": "web-search" }]
          }),
        });

        if (!response.ok) {
          throw new Error(`Cohere API error: ${response.status}`);
        }

        const data = await response.json();
        let cleanText = data.text || '';

        // Natural response formatting
        cleanText = cleanText
          .replace(/[*#_>`~]/g, '')        // Remove markdown
          .replace(/\n{3,}/g, '\n\n')      // Reduce excessive newlines
          .trim();

        // Add punctuation only if completely missing at end
        const lastChar = cleanText.charAt(cleanText.length - 1);
        if (!['.', '!', '?', '"', "'", ':'].includes(lastChar)) {
          cleanText += '.';
        }

        this.messages.push({
          sender: this.selectedModel,
          text: cleanText,
          time: this.getCurrentTime(),
          liked: false,
          disliked: false,
          showMenu: false
        });
        this.saveMessages();

      } catch (error) {
        console.error("Error:", error);
        this.messages.push({
          sender: this.selectedModel,
          text: "I'm having trouble processing that. Could you try rephrasing?",
          time: this.getCurrentTime(),
          liked: false,
          disliked: false,
          showMenu: false
        });
        this.saveMessages();
      }

      this.isTyping = false;
      this.scrollToBottom();
      this.showQuickReplies = false;
    },
    toggleLike(index) {
      // Disabled functionality
    },
    toggleDislike(index) {
      // Disabled functionality
    },
    async redoMessage(index) {
      const message = this.messages[index];
      if (message.sender !== this.selectedModel) return;

      const userMessageIndex = index - 1;
      if (userMessageIndex < 0 || this.messages[userMessageIndex].sender !== 'user') return;

      this.messages.splice(index, 1);
      this.userInput = this.messages[userMessageIndex].text;
      this.sendMessage();
    },
    copyMessage(text) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Message copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy message.');
      });
    },
    toggleMessageMenu(index) {
      // Disabled functionality
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
    toggleInfo() {
      this.showInfoModal = !this.showInfoModal;
    },
    showVoiceWIP() {
      this.showVoiceModal = true;
    },
    hideEmojiPicker() {
      this.showEmojiPicker = false;
    },
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
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

<style scoped>
/* Modern Chat UI Styles */
.neura-chat-container {
  --primary: #6C5CE7; /* Pleasant purple */
  --primary-light: #A29BFE; /* Lighter purple */
  --primary-dark: #5649CC; /* Darker purple */
  --text: #2D3436; /* Dark gray for text */
  --text-light: #636E72; /* Light gray for secondary text */
  --bg: #F5F6FA; /* Light background */
  --card-bg: #FFFFFF; /* White for cards */
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --transition: all 0.2s ease;

  display: flex;
  height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: var(--bg);
}

/* Main Layout */
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
  box-shadow: var(--shadow);
  z-index: 10;
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
}

.chat-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar-container {
  position: relative;
  width: 40px;
  height: 40px;
}

.chat-logo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--primary-light);
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background-color: #00B894;
  border-radius: 50%;
  border: 2px solid var(--card-bg);
}

.status-indicator.typing {
  background-color: #FDCB6E;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
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
  margin: 4px 0 0 0;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.header-btn {
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1.1rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
}

/* Chat Messages */
.chat-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  display: flex;
  max-width: 85%;
  gap: 12px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
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
  background-color: var(--card-bg);
  flex-shrink: 0;
  margin-top: auto;
  overflow: hidden;
}

.message-content {
  padding: 12px 16px;
  border-radius: 18px;
  line-height: 1.5;
  font-size: 0.95rem;
  word-break: break-word;
  box-shadow: var(--shadow);
}

.message.neura .message-content {
  background: var(--card-bg);
  color: var(--text);
  border-bottom-left-radius: 4px;
}

.message.user .message-content {
  background: var(--primary);
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
  color: rgba(255, 255, 255, 0.8);
}

.message-actions {
  display: flex;
  gap: 6px;
  margin-top: 8px;
  opacity: 0.7;
}

.action-btn {
  background: none;
  border: none;
  color: inherit;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 4px;
}

/* Typing Indicator */
.typing-indicator {
  align-self: flex-start;
  background: var(--card-bg);
  border-radius: 18px;
  padding: 12px 16px;
  box-shadow: var(--shadow);
  width: fit-content;
}

.typing-content {
  display: flex;
  align-items: center;
  gap: 4px;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: var(--primary);
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
}

.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-4px); }
}

/* Chat Input Area */
.chat-input-container {
  padding: 16px;
  background-color: var(--card-bg);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
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
  padding: 8px 16px;
  border-radius: 20px;
  background-color: var(--bg);
  border: 1px solid var(--primary-light);
  color: var(--text);
  font-size: 0.85rem;
  cursor: pointer;
}

.input-form {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--bg);
  border-radius: 24px;
  padding: 8px 12px;
  box-shadow: var(--shadow);
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

.input-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1rem;
  cursor: pointer;
}

.send-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
  border: none;
  cursor: pointer;
}

.send-btn:disabled {
  opacity: 0.6;
}

.disclaimer {
  font-size: 0.75rem;
  color: var(--text-light);
  text-align: center;
  margin-top: 12px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
  animation: fadeIn 0.4s ease;
}

.modal-content {
  background: linear-gradient(180deg, var(--card-bg) 80%, #F8FAFF);
  border-radius: 20px;
  width: 100%;
  max-width: 480px;
  overflow: hidden;
  box-shadow: var(--shadow-hover);
  animation: slideUp 0.4s ease;
}

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  padding: 24px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  background: rgba(91, 79, 196, 0.05);
}

.modal-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(91, 79, 196, 0.1);
  color: var(--primary);
  font-size: 1.3rem;
  flex-shrink: 0;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.3rem;
  color: var(--text);
  padding-left: 20px;
  flex: 1;
  font-weight: 600;
}

.modal-close {
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1.3rem;
  cursor: pointer;
  padding: 8px;
  transition: var(--transition);
}

.modal-close:hover {
  color: var(--primary);
  background: rgba(91, 79, 196, 0.1);
}

.modal-body {
  padding: 24px;
  max-height: 65vh;
  overflow-y: auto;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 24px;
}

.feature-item i {
  color: var(--primary);
  font-size: 1.2rem;
  margin-top: 4px;
  flex-shrink: 0;
}

.feature-item-content {
  flex: 1;
}

.feature-item p {
  margin: 0 0 10px 0;
  color: var(--text);
  font-size: 1rem;
  line-height: 1.6;
  font-weight: 500;
}

.model-dropdown,
.response-style-dropdown {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 14px;
  font-size: 0.95rem;
  color: var(--text);
  background-color: var(--bg);
  cursor: pointer;
  transition: var(--transition);
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 18px;
}

.model-dropdown:hover,
.response-style-dropdown:hover {
  border-color: var(--primary);
}

.model-dropdown:focus,
.response-style-dropdown:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(91, 79, 196, 0.2);
}

.modal-footer {
  padding: 20px 24px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  gap: 16px;
}

.modal-action-btn {
  padding: 12px 24px;
  border-radius: 10px;
  background-color: var(--bg);
  border: 1px solid var(--primary-light);
  color: var(--text);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.modal-action-btn.primary {
  background-color: var(--primary);
  color: white;
  border: none;
}

.modal-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.modal-action-btn.primary:hover {
  background-color: var(--primary-dark);
}

/* Voice Modal Specific Styles */
.voice-modal {
  text-align: center;
}

.voice-icon {
  text-align: left;
  background-color: rgba(46, 212, 201, 0.1);
  color: var(--secondary);
  margin: 0 auto 20px;
}

.voice-wave {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 90px;
  margin: 24px 0;
}

.wave-bar {
  width: 10px;
  height: 50px;
  background-color: var(--secondary);
  border-radius: 5px;
  animation: waveAnimation 1.4s infinite ease-in-out;
}

.wave-bar:nth-child(1) { animation-delay: 0s; height: 35px; }
.wave-bar:nth-child(2) { animation-delay: 0.2s; height: 55px; }
.wave-bar:nth-child(3) { animation-delay: 0.4s; height: 75px; }
.wave-bar:nth-child(4) { animation-delay: 0.6s; height: 55px; }
.wave-bar:nth-child(5) { animation-delay: 0.8s; height: 35px; }

@keyframes waveAnimation {
  0%, 100% { height: 35px; }
  50% { height: 75px; }
}

.voice-instruction {
  font-size: 1.2rem;
  color: var(--text);
  margin: 24px 0 10px;
  font-weight: 600;
}

.voice-note {
  font-size: 0.95rem;
  color: var(--text-light);
  margin: 0;
}

/* Responsive Design */
@media (max-width: 480px) {
  .chat-header {
    padding: 12px;
  }
  
  .message {
    max-width: 90%;
  }
  
  .modal-content {
    max-width: 100%;
    border-radius: 16px 16px 0 0;
    position: fixed;
    bottom: 0;
  }
  
  .modal-overlay {
    align-items: flex-end;
    padding: 0;
  }
}
</style>