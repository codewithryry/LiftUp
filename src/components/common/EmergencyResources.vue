<template>
  <div class="emergency-container">
    <!-- Hero Section with Background Image -->
    <section class="emergency-hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">Emergency Support</h1>
        <p class="hero-subtitle">Immediate help from trained professionals when you need it most</p>
        
        <div class="hero-actions">
          <button class="hero-btn primary" @click="scrollToSection('hotlines')">
            <i class="fas fa-phone-alt"></i> Crisis Hotlines
          </button>
          <button class="hero-btn secondary" @click="scrollToSection('resources')">
            <i class="fas fa-map-marker-alt"></i> Local Resources
          </button>
        </div>
      </div>
    </section>

    <!-- Hotlines Section -->
    <section id="hotlines" class="emergency-section" ref="hotlines">
      <div class="section-header">
        <h2><i class="fas fa-phone-alt"></i> 24/7 Crisis Hotlines</h2>
        <p>Confidential support from trained professionals anytime, anywhere</p>
      </div>
      
      <div class="card-grid">
        <div 
          v-for="(hotline, index) in crisisHotlines" 
          :key="index" 
          class="resource-card"
          :style="{ '--delay': index * 0.1 + 's' }"
        >
          <div class="card-icon">
            <img :src="hotline.icon || 'https://cdn-icons-png.flaticon.com/512/3059/3059518.png'" alt="Hotline icon">
          </div>
          <h3>{{ hotline.name }}</h3>
          <p>{{ hotline.description }}</p>
          <a 
            :href="`tel:${hotline.number}`" 
            class="call-btn"
            @click="trackCall(hotline.name)"
          >
            <i class="fas fa-phone"></i> {{ formatPhoneNumber(hotline.number) }}
          </a>
        </div>
      </div>
    </section>

    <!-- Local Resources Section -->
    <section id="resources" class="emergency-section" ref="resources">
      <div class="section-header">
        <h2><i class="fas fa-map-marker-alt"></i> Local Support Resources</h2>
        <p>Find help and services in your immediate area</p>
      </div>
      
      <div class="card-grid">
        <div 
          v-for="(resource, index) in localResources" 
          :key="index + 'local'" 
          class="resource-card"
          :style="{ '--delay': index * 0.1 + 's' }"
        >
          <div class="card-icon">
            <img :src="resource.icon || 'https://cdn-icons-png.flaticon.com/512/1570/1570887.png'" alt="Resource icon">
          </div>
          <h3>{{ resource.name }}</h3>
          <p>{{ resource.description }}</p>
          <a 
            :href="resource.link" 
            target="_blank" 
            class="resource-link"
            @click="trackResourceClick(resource.name)"
          >
            Visit Website <i class="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- Immediate Actions -->
    <section class="emergency-actions">
      <div class="action-grid">
        <div class="action-card chat-action">
          <img src="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Online chat" class="action-bg">
          <div class="action-content">
            <div class="action-icon">
              <i class="fas fa-comment-medical"></i>
            </div>
            <h3>Online Crisis Chat</h3>
            <p>Connect with a trained counselor via text message</p>
            <button class="action-btn" @click="startCrisisChat">
              Start Chat <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
        
        <div class="action-card therapist-action">
          <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Therapist" class="action-bg">
          <div class="action-content">
            <div class="action-icon">
              <i class="fas fa-user-md"></i>
            </div>
            <h3>Therapist Finder</h3>
            <p>Locate mental health professionals near you</p>
            <button class="action-btn" @click="findTherapist">
              Find Help <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Emergency Footer -->
    <footer class="emergency-footer">
      <div class="footer-content">
        <div class="footer-message">
          <p>You are not alone. Help is available.</p>
        </div>
        <div class="footer-links">
          <a href="#" @click.prevent="scrollToTop">Back to Top</a>
          <router-link to="/self-care">Self-Care Resources</router-link>
          <router-link to="/forum">Community Support</router-link>
        </div>
        <div class="footer-cta">
          <p>Need immediate assistance?</p>
          <a href="tel:988" class="footer-call-btn">
            <i class="fas fa-phone"></i> Call 988 Lifeline
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      crisisHotlines: [
        {
          name: "Suicide Prevention Lifeline",
          description: "Free, confidential support for people in distress",
          number: "988",
          icon: "https://cdn-icons-png.flaticon.com/512/103/103228.png"
        },
        {
          name: "Domestic Violence Hotline",
          description: "Support for domestic abuse situations",
          number: "18007997233",
          icon: "https://cdn-icons-png.flaticon.com/512/2452/2452566.png"
        },
        {
          name: "Veterans Crisis Line",
          description: "Support for veterans and their families",
          number: "18002738255",
          icon: "https://cdn-icons-png.flaticon.com/512/1532/1532670.png"
        }
      ],
      localResources: [
        {
          name: "Local Mental Health Centers",
          description: "Find treatment facilities in your area",
          link: "https://findtreatment.samhsa.gov",
          icon: "https://cdn-icons-png.flaticon.com/512/2965/2965879.png"
        },
        {
          name: "Emergency Services",
          description: "Local emergency contacts and services",
          link: "https://www.usa.gov/local-governments",
          icon: "https://cdn-icons-png.flaticon.com/512/2786/2786391.png"
        },
        {
          name: "Teen Help Resources",
          description: "Support specifically for teens",
          link: "https://www.youth.gov",
          icon: "https://cdn-icons-png.flaticon.com/512/1864/1864593.png"
        }
      ]
    }
  },
  methods: {
    scrollToSection(refName) {
      this.$refs[refName].scrollIntoView({ behavior: 'smooth' });
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    formatPhoneNumber(number) {
      // Format phone number for display
      return number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    },
    trackCall(hotlineName) {
      console.log(`Call initiated to: ${hotlineName}`);
      // Analytics tracking would go here
    },
    trackResourceClick(resourceName) {
      console.log(`Resource accessed: ${resourceName}`);
      // Analytics tracking would go here
    },
    startCrisisChat() {
      // Implementation for crisis chat
      console.log("Starting crisis chat");
    },
    findTherapist() {
      // Implementation for therapist finder
      console.log("Finding therapist");
    }
  }
}
</script>

<style scoped>
.emergency-container {
  --primary: #7C3AED;
  --primary-light: #8B5CF6;
  --primary-dark: #6D28D9;
  --secondary: #3B82F6;
  --secondary-dark: #2563EB;
  --accent: #10B981;
  --accent-dark: #059669;
  --danger: #EF4444;
  --danger-dark: #DC2626;
  --text: #1F2937;
  --text-light: #6B7280;
  --bg: #F9FAFB;
  --card-bg: #FFFFFF;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  color: var(--text);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Hero Section */
.emergency-hero {
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 24px;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), 
              url('https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center 30%;
  margin-bottom: 80px;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 40px 0;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.hero-btn {
  padding: 16px 32px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: var(--transition);
  cursor: pointer;
  border: none;
}

.hero-btn i {
  font-size: 1.1rem;
}

.hero-btn.primary {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
}

.hero-btn.primary:hover {
  background: var(--primary-light);
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(124, 58, 237, 0.5);
}

.hero-btn.secondary {
  background: rgba(255, 255, 255, 0.9);
  color: var(--primary);
  border: 2px solid white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.hero-btn.secondary:hover {
  background: white;
  color: var(--primary-dark);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* Sections */
.emergency-section {
  padding: 0 24px;
  margin-bottom: 100px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.section-header h2 i {
  color: var(--primary);
}

.section-header p {
  font-size: 1.25rem;
  color: var(--text-light);
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
}

/* Card Grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.resource-card {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow);
  transition: var(--transition);
  border-top: 4px solid var(--primary);
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s var(--delay) forwards;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.resource-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
}

.resource-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.card-icon {
  width: 60px;
  height: 60px;
  background: rgba(124, 58, 237, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.card-icon img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.resource-card h3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text);
}

.resource-card p {
  color: var(--text-light);
  margin-bottom: 28px;
  line-height: 1.6;
  flex-grow: 1;
}

.call-btn, .resource-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition);
  align-self: flex-start;
  font-size: 0.95rem;
}

.call-btn {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
}

.call-btn:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4);
}

.resource-link {
  background: rgba(59, 130, 246, 0.1);
  color: var(--secondary);
}

.resource-link:hover {
  background: rgba(59, 130, 246, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
}

/* Action Section */
.emergency-actions {
  padding: 0 24px;
  margin: 100px 0;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.action-card {
  border-radius: 20px;
  color: white;
  position: relative;
  overflow: hidden;
  transition: var(--transition);
  min-height: 300px;
  display: flex;
  align-items: flex-end;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.action-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  transition: transform 0.5s ease;
}

.action-card:hover .action-bg {
  transform: scale(1.05);
}

.action-content {
  position: relative;
  z-index: 3;
  padding: 40px;
  width: 100%;
  background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, transparent 100%);
}

.action-icon {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: white;
}

.action-card h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.action-card p {
  margin-bottom: 28px;
  line-height: 1.6;
  opacity: 0.9;
}

.action-btn {
  background: white;
  border: none;
  padding: 14px 28px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: var(--transition);
  cursor: pointer;
}

.action-btn:hover {
  transform: translateX(10px);
}

.chat-action .action-btn {
  color: var(--secondary);
}

.therapist-action .action-btn {
  color: var(--accent);
}

/* Footer */
.emergency-footer {
  padding: 80px 24px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  margin-top: 60px;
  text-align: center;
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
}

.footer-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.footer-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  filter: brightness(0) invert(1);
}

.footer-message p {
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.4;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.footer-links a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
  font-size: 1.1rem;
  opacity: 0.8;
}

.footer-links a:hover {
  opacity: 1;
  text-decoration: underline;
}

.footer-cta {
  margin-top: 40px;
}

.footer-cta p {
  font-size: 1.2rem;
  margin-bottom: 16px;
  opacity: 0.9;
}

.footer-call-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: white;
  color: var(--primary);
  border-radius: 50px;
  font-weight: 700;
  text-decoration: none;
  transition: var(--transition);
  font-size: 1.2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.footer-call-btn:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
}

/* Responsive */
@media (max-width: 992px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .section-header h2 {
    font-size: 2.2rem;
  }
}

@media (max-width: 768px) {
  .emergency-hero {
    min-height: 400px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
  }
  
  .hero-actions {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    gap: 12px;
  }
  
  .hero-btn {
    width: 100%;
    justify-content: center;
  }
  
  .section-header h2 {
    font-size: 1.8rem;
  }
  
  .card-grid {
    grid-template-columns: 1fr;
  }
  
  .action-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-links {
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .emergency-hero {
    min-height: 350px;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .section-header h2 {
    font-size: 1.6rem;
  }
  
  .resource-card, .action-card {
    padding: 24px;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 15px;
  }
  
  .footer-message p {
    font-size: 1.3rem;
  }
}
</style>