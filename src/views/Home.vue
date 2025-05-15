<template>
  <div class="home-page">
    <!-- Animated Background -->
    <div class="bg-animation">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
    </div>

    <!-- Floating Particles -->
    <div class="particles">
      <div v-for="(particle, index) in 30" :key="index" class="particle" :style="particleStyle(index)"></div>
    </div>

    <!-- Modern Hero Section -->
    <section class="modern-hero">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-content" data-aos="fade-right" data-aos-delay="100">

            <h1>
              <span class="gradient-text">Mental Health</span>
              <span>Support That Understands</span>
            </h1>
            <p class="subtitle">Join a compassionate community and access professional resources tailored to your mental wellness journey.</p>
            
            <div class="cta-group">
              <router-link to="/register" class="btn primary">
                <span>Get Started</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </router-link>
              <router-link to="/about" class="btn secondary">
                <span>How It Works</span>
              </router-link>
            </div>
            
            <!-- <div class="stats">
              <div class="stat-item">
                <div class="number">10K+</div>
                <div class="label">Community Members</div>
              </div>
              <div class="stat-item">
                <div class="number">24/7</div>
                <div class="label">Support Available</div>
              </div>
              <div class="stat-item">
                <div class="number">100%</div>
                <div class="label">Anonymous</div>
              </div>
            </div> -->
          </div>
          
          <div class="hero-visual" data-aos="fade-left" data-aos-delay="200">
            <div class="floating-cards">
              <div class="main-card" data-depth="0.2">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Supportive community">
                <div class="card-overlay">
                  <span>Community Connection</span>
                </div>
              </div>
              
              <div class="floating-card resources" data-depth="0.4">
                <div class="icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6.253V19.253C11.7058 19.253 11.4173 19.1715 11.1666 19.017C10.916 18.8625 10.7127 18.6409 10.58 18.377L7.92 13.377C7.72973 12.9844 7.65414 12.5433 7.70267 12.1079C7.7512 11.6725 7.92172 11.2619 8.192 10.923L12 6.253ZM12 6.253L15.808 10.923M12 6.253V19.253C12.2942 19.253 12.5827 19.1715 12.8334 19.017C13.084 18.8625 13.2873 18.6409 13.42 18.377L16.08 13.377C16.2703 12.9844 16.3459 12.5433 16.2973 12.1079C16.2488 11.6725 16.0783 11.2619 15.808 10.923M15.808 10.923L19 6.253" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="content">
                  <h4>Expert Resources</h4>
                  <p>Curated by professionals</p>
                </div>
              </div>
              
              <div class="floating-card community" data-depth="0.3">
                <div class="icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="content">
                  <h4>Support Groups</h4>
                  <p>Safe, moderated spaces</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <span class="section-label">OUR APPROACH</span>
          <h2>Holistic Mental Wellness Support</h2>
          <p class="subtitle">Comprehensive care for your mental health journey</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card" data-aos="fade-up" data-aos-delay="100">
            <div class="feature-visual">
              <div class="icon-circle">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="feature-image">
                <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Community support">
              </div>
            </div>
            <div class="feature-content">
              <h3>Community Support</h3>
              <p>Connect with others who truly understand in our safe, moderated forums designed for sharing and healing.</p>
              <div class="feature-stats">
                <div class="stat">
                  <div class="number">500+</div>
                  <div class="label">Daily Conversations</div>
                </div>
                <div class="stat">
                  <div class="number">50+</div>
                  <div class="label">Support Groups</div>
                </div>
              </div>
              <router-link to="/forum" class="feature-link">
                Join Community
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </router-link>
            </div>
          </div>
          
          <div class="feature-card" data-aos="fade-up" data-aos-delay="200">
            <div class="feature-visual">
              <div class="icon-circle">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 6.253V19.253C11.7058 19.253 11.4173 19.1715 11.1666 19.017C10.916 18.8625 10.7127 18.6409 10.58 18.377L7.92 13.377C7.72973 12.9844 7.65414 12.5433 7.70267 12.1079C7.7512 11.6725 7.92172 11.2619 8.192 10.923L12 6.253ZM12 6.253L15.808 10.923M12 6.253V19.253C12.2942 19.253 12.5827 19.1715 12.8334 19.017C13.084 18.8625 13.2873 18.6409 13.42 18.377L16.08 13.377C16.2703 12.9844 16.3459 12.5433 16.2973 12.1079C16.2488 11.6725 16.0783 11.2619 15.808 10.923M15.808 10.923L19 6.253" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="feature-image">
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Professional resources">
              </div>
            </div>
            <div class="feature-content">
              <h3>Expert Resources</h3>
              <p>Access carefully curated mental health resources from trusted professionals and organizations.</p>
              <div class="feature-stats">
                <div class="stat">
                  <div class="number">300+</div>
                  <div class="label">Articles</div>
                </div>
                <div class="stat">
                  <div class="number">200+</div>
                  <div class="label">Video Guides</div>
                </div>
              </div>
              <router-link to="/resources" class="feature-link">
                Explore Resources
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </router-link>
            </div>
          </div>
          
          <div class="feature-card" data-aos="fade-up" data-aos-delay="300">
            <div class="feature-visual">
              <div class="icon-circle">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M21 12.79C20.8429 14.4922 20.2039 16.1144 19.1583 17.4668C18.1127 18.8192 16.7035 19.8458 15.0957 20.4265C13.4879 21.0073 11.748 21.1181 10.0795 20.7461C8.41102 20.3741 6.88303 19.5345 5.67422 18.3258C4.46541 17.117 3.62587 15.589 3.25389 13.9205C2.88191 12.252 2.99274 10.5121 3.57348 8.9043C4.15423 7.29651 5.18082 5.88729 6.53321 4.8417C7.8856 3.79611 9.5078 3.1571 11.21 3C10.2134 4.34827 9.73375 6.00945 9.85854 7.68141C9.98333 9.35338 10.7039 10.9251 11.8893 12.1107C13.0749 13.2961 14.6466 14.0167 16.3186 14.1415C17.9906 13.7866 19.6517 13.7866 21 12.79Z" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="feature-image">
                <img src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Self-care tools">
              </div>
            </div>
            <div class="feature-content">
              <h3>Self-Care Tools</h3>
              <p>Track your mood, practice guided exercises, and develop healthy coping strategies.</p>
              <div class="feature-stats">
                <div class="stat">
                  <div class="number">15+</div>
                  <div class="label">Interactive Tools</div>
                </div>
                <div class="stat">
                  <div class="number">30+</div>
                  <div class="label">Guided Exercises</div>
                </div>
              </div>
              <router-link to="/tools" class="feature-link">
                Discover Tools
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NueraAI Glimpse Section -->
<section class="nuera-glimpse">
  <div class="container">
    <div class="glimpse-content" data-aos="fade-up">
      <div class="glimpse-text">
        <span class="section-label">AI COMPANION</span>
        <h2>Always Available Support</h2>
        <p>Meet NueraAI - your 24/7 mental health companion. Get immediate, judgment-free support whenever you need it, even outside community hours.</p>
        
        <div class="ai-features">
          <div class="ai-feature">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22 4L12 14.01l-3-3" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Instant conversations anytime</span>
          </div>
          <div class="ai-feature">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22 4L12 14.01l-3-3" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Evidence-based techniques</span>
          </div>
        </div>
        
        <router-link to="/about" class="btn outline">
          <span>Learn About NueraAI</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </router-link>
      </div>
      <div class="glimpse-visual">
        <div class="ai-bubble">
          <div class="bubble-content">
            <div class="bubble-text">Hi there! I'm NueraAI. How are you feeling today?</div>
            <div class="bubble-time">Just now</div>
          </div>
        </div>
        <div class="ai-bubble user">
          <div class="bubble-content">
            <div class="bubble-text">I've been feeling really anxious</div>
            <div class="bubble-time">Just now</div>
          </div>
        </div>
        <div class="ai-bubble">
          <div class="bubble-content">
            <div class="bubble-text">I'm here to listen. Would you like to try a quick grounding exercise?</div>
            <div class="bubble-time">Just now</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    <!-- Resources Section -->
    <section class="resources-section">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <span class="section-label">LEARN AND GROW</span>
          <h2>Mental Health Resources</h2>
          <p class="subtitle">Evidence-based information to support your journey</p>
        </div>
        
        <div class="resources-tabs">
          <div class="tabs-header" data-aos="fade-up">
            <button class="tab-btn active" data-tab="articles">Articles</button>
            <button class="tab-btn" data-tab="videos">Videos</button>
            <button class="tab-btn" data-tab="tools">Interactive Tools</button>
            <button class="tab-btn" data-tab="guides">Guides</button>
          </div>
          
          <div class="tabs-content">
            <div class="tab-pane active" data-tab="articles" data-aos="fade-up" data-aos-delay="100">
              <div class="resources-grid">
                <div class="resource-card">
                  <div class="resource-image">
                    <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Managing Anxiety">
                    <div class="category-badge">Anxiety</div>
                  </div>
                  <div class="resource-content">
                    <div class="meta">
                      <span class="reading-time">8 min read</span>
                      <span class="difficulty">Beginner</span>
                    </div>
                    <h3>10 Science-Backed Strategies for Managing Anxiety</h3>
                    <p>Learn effective techniques to reduce anxiety symptoms and regain control of your daily life.</p>
                    <div class="resource-footer">
                      <router-link to="/resources/anxiety-strategies" class="resource-link">
                        Read Article
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </router-link>
                      <div class="bookmark">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17L5 21V5Z" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="resource-card">
                  <div class="resource-image">
                    <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Depression Recovery">
                    <div class="category-badge">Depression</div>
                  </div>
                  <div class="resource-content">
                    <div class="meta">
                      <span class="reading-time">12 min read</span>
                      <span class="difficulty">Intermediate</span>
                    </div>
                    <h3>The Road to Depression Recovery: A Step-by-Step Guide</h3>
                    <p>Practical steps to help you navigate the journey from depression to recovery with professional insights.</p>
                    <div class="resource-footer">
                      <router-link to="/resources/depression-recovery" class="resource-link">
                        Read Article
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </router-link>
                      <div class="bookmark">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17L5 21V5Z" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="resource-card">
                  <div class="resource-image">
                    <img src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Mindfulness">
                    <div class="category-badge">Mindfulness</div>
                  </div>
                  <div class="resource-content">
                    <div class="meta">
                      <span class="reading-time">6 min read</span>
                      <span class="difficulty">Beginner</span>
                    </div>
                    <h3>Mindfulness Meditation for Beginners</h3>
                    <p>Discover how mindfulness can reduce stress and improve your mental wellbeing with simple exercises.</p>
                    <div class="resource-footer">
                      <router-link to="/resources/mindfulness" class="resource-link">
                        Read Article
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </router-link>
                      <div class="bookmark">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17L5 21V5Z" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="tab-pane" data-tab="videos">
  <div class="resources-grid">
    <div class="resource-card">
      <div class="resource-image">
        <div class="video-thumbnail">
          <img src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Mindfulness Meditation">
          <div class="play-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 8L16 12L10 16V8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="category-badge">Mindfulness</div>
      </div>
      <div class="resource-content">
        <div class="meta">
          <span class="duration">15 min</span>
          <span class="difficulty">Beginner</span>
        </div>
        <h3>5-Minute Mindfulness Meditation for Beginners</h3>
        <p>Quick and easy guided meditation to help reduce stress and increase present-moment awareness.</p>
        <div class="resource-footer">
          <router-link to="/videos/mindfulness" class="resource-link">
            Watch Video
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
          <div class="bookmark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17L5 21V5Z" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <div class="resource-card">
      <div class="resource-image">
        <div class="video-thumbnail">
          <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="CBT Techniques">
          <div class="play-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 8L16 12L10 16V8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="category-badge">CBT</div>
      </div>
      <div class="resource-content">
        <div class="meta">
          <span class="duration">22 min</span>
          <span class="difficulty">Intermediate</span>
        </div>
        <h3>Cognitive Behavioral Therapy: Changing Negative Thoughts</h3>
        <p>Learn practical CBT techniques to identify and challenge negative thought patterns.</p>
        <div class="resource-footer">
          <router-link to="/videos/cbt-techniques" class="resource-link">
            Watch Video
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
          <div class="bookmark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17L5 21V5Z" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <div class="resource-card">
      <div class="resource-image">
        <div class="video-thumbnail">
          <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Breathing Exercises">
          <div class="play-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 8L16 12L10 16V8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="category-badge">Anxiety</div>
      </div>
      <div class="resource-content">
        <div class="meta">
          <span class="duration">8 min</span>
          <span class="difficulty">Beginner</span>
        </div>
        <h3>4-7-8 Breathing Technique for Anxiety Relief</h3>
        <p>Dr. Andrew Weil's simple breathing method to quickly calm your nervous system.</p>
        <div class="resource-footer">
          <router-link to="/videos/breathing" class="resource-link">
            Watch Video
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
          <div class="bookmark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17L5 21V5Z" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="tab-pane" data-tab="tools">
  <div class="resources-grid">
    <div class="resource-card">
      <div class="resource-image">
        <img src="https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Mood Tracker">
        <div class="category-badge">Tracking</div>
      </div>
      <div class="resource-content">
        <div class="meta">
          <span class="duration">Interactive</span>
          <span class="difficulty">All Levels</span>
        </div>
        <h3>Mood & Symptom Tracker</h3>
        <p>Monitor your emotional patterns, identify triggers, and track progress over time with our visual tracker.</p>
        <div class="resource-footer">
          <router-link to="/tools/mood-tracker" class="resource-link">
            Try Tool
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
          <div class="bookmark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17L5 21V5Z" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <div class="resource-card">
      <div class="resource-image">
        <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Journal Prompts">
        <div class="category-badge">Journaling</div>
      </div>
      <div class="resource-content">
        <div class="meta">
          <span class="duration">Interactive</span>
          <span class="difficulty">All Levels</span>
        </div>
        <h3>Guided Mental Health Journal</h3>
        <p>Daily prompts and exercises to help process emotions, practice gratitude, and reflect on your mental health journey.</p>
        <div class="resource-footer">
          <router-link to="/tools/journal" class="resource-link">
            Try Tool
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
          <div class="bookmark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17L5 21V5Z" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <div class="resource-card">
      <div class="resource-image">
        <img src="https://images.unsplash.com/photo-1593810450967-f9c42742e326?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Anxiety Relief">
        <div class="category-badge">Anxiety</div>
      </div>
      <div class="resource-content">
        <div class="meta">
          <span class="duration">Interactive</span>
          <span class="difficulty">Beginner</span>
        </div>
        <h3>5-4-3-2-1 Grounding Exercise</h3>
        <p>Interactive tool to help manage anxiety attacks by focusing on your senses and surroundings.</p>
        <div class="resource-footer">
          <router-link to="/tools/grounding" class="resource-link">
            Try Tool
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
          <div class="bookmark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17L5 21V5Z" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="tab-pane" data-tab="guides">
  <div class="resources-grid">
    <div class="resource-card">
      <div class="resource-image">
        <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Anxiety Guide">
        <div class="category-badge">Anxiety</div>
      </div>
      <div class="resource-content">
        <div class="meta">
          <span class="reading-time">12 min read</span>
          <span class="difficulty">Beginner</span>
        </div>
        <h3>The Complete Guide to Managing Anxiety</h3>
        <p>Comprehensive guide covering symptoms, coping strategies, and when to seek professional help.</p>
        <div class="resource-footer">
          <router-link to="/guides/anxiety" class="resource-link">
            Read Guide
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
          <div class="bookmark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17L5 21V5Z" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <div class="resource-card">
      <div class="resource-image">
        <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Depression Guide">
        <div class="category-badge">Depression</div>
      </div>
      <div class="resource-content">
        <div class="meta">
          <span class="reading-time">18 min read</span>
          <span class="difficulty">Intermediate</span>
        </div>
        <h3>Navigating Depression: A Step-by-Step Recovery Guide</h3>
        <p>Evidence-based strategies for understanding and overcoming depressive episodes.</p>
        <div class="resource-footer">
          <router-link to="/guides/depression" class="resource-link">
            Read Guide
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
          <div class="bookmark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17L5 21V5Z" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <div class="resource-card">
      <div class="resource-image">
        <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Mental Health First Aid">
        <div class="category-badge">Education</div>
      </div>
      <div class="resource-content">
        <div class="meta">
          <span class="reading-time">25 min read</span>
          <span class="difficulty">All Levels</span>
        </div>
        <h3>Mental Health First Aid: Supporting Loved Ones</h3>
        <p>Learn how to recognize warning signs and provide appropriate support to those struggling.</p>
        <div class="resource-footer">
          <router-link to="/guides/first-aid" class="resource-link">
            Read Guide
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
          <div class="bookmark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17L5 21V5Z" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
          </div>
        </div>
        
        <div class="resources-cta" data-aos="fade-up">
          <router-link to="/resources" class="btn primary">
            <span>Browse All Resources</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <span class="section-label">COMMUNITY VOICES</span>
          <h2>Real Stories of Healing</h2>
          <p class="subtitle">Hear from people who've found support in our community</p>
        </div>
        
        <div class="testimonials-grid">
          <div class="testimonial-card" data-aos="fade-up" data-aos-delay="100">
            <div class="testimonial-header">
              <div class="avatar">
                <img src="https://randomuser.me/api/portraits/women/43.jpg" alt="Alex M.">
              </div>
              <div class="user-info">
                <h4>Alex M.</h4>
                <span>Anxiety Support</span>
              </div>
              <div class="quote-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 15H17C18.1046 15 19 14.1046 19 13V10C19 8.89543 18.1046 8 17 8H14C12.8954 8 12 8.89543 12 10V15C12 17.7614 14.2386 20 17 20H19M9 15H12C13.1046 15 14 14.1046 14 13V10C14 8.89543 13.1046 8 12 8H9C7.89543 8 7 8.89543 7 10V15C7 17.7614 9.23858 20 12 20H14" stroke="#4F46E5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div class="testimonial-content">
              <blockquote>
                "This community helped me through my darkest days. The support I received was life-changing and gave me hope when I needed it most."
              </blockquote>
              <div class="progress-container">
                <div class="progress-label">Anxiety Reduction</div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 70%"></div>
                  <span>70% improvement</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card" data-aos="fade-up" data-aos-delay="200">
            <div class="testimonial-header">
              <div class="avatar">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Jamie R.">
              </div>
              <div class="user-info">
                <h4>Jamie R.</h4>
                <span>Depression Support</span>
              </div>
              <div class="quote-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 15H17C18.1046 15 19 14.1046 19 13V10C19 8.89543 18.1046 8 17 8H14C12.8954 8 12 8.89543 12 10V15C12 17.7614 14.2386 20 17 20H19M9 15H12C13.1046 15 14 14.1046 14 13V10C14 8.89543 13.1046 8 12 8H9C7.89543 8 7 8.89543 7 10V15C7 17.7614 9.23858 20 12 20H14" stroke="#4F46E5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div class="testimonial-content">
              <blockquote>
                "The resources here helped me understand my depression and find professional help that actually worked for my situation."
              </blockquote>
              <div class="progress-container">
                <div class="progress-label">Mood Improvement</div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 65%"></div>
                  <span>65% improvement</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card" data-aos="fade-up" data-aos-delay="300">
            <div class="testimonial-header">
              <div class="avatar">
                <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Taylor S.">
              </div>
              <div class="user-info">
                <h4>Taylor S.</h4>
                <span>Bipolar Support</span>
              </div>
              <div class="quote-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 15H17C18.1046 15 19 14.1046 19 13V10C19 8.89543 18.1046 8 17 8H14C12.8954 8 12 8.89543 12 10V15C12 17.7614 14.2386 20 17 20H19M9 15H12C13.1046 15 14 14.1046 14 13V10C14 8.89543 13.1046 8 12 8H9C7.89543 8 7 8.89543 7 10V15C7 17.7614 9.23858 20 12 20H14" stroke="#4F46E5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div class="testimonial-content">
              <blockquote>
                "I finally found people who understand what I'm going through. The daily check-ins keep me grounded during difficult periods."
              </blockquote>
              <div class="progress-container">
                <div class="progress-label">Stability</div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 80%"></div>
                  <span>80% improvement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="testimonials-cta" data-aos="fade-up">
          <router-link to="/stories" class="btn outline">
            <span>Read More Success Stories</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Interactive Tools Showcase -->
    <section class="tools-showcase">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <span class="section-label">INTERACTIVE TOOLS</span>
          <h2>Enhance Your Mental Wellness</h2>
          <p class="subtitle">Practical tools to support your daily mental health</p>
        </div>
        
        <div class="tools-grid">
          <div class="tool-card" data-aos="fade-up" data-aos-delay="100">
            <div class="tool-visual">
              <div class="tool-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="tool-image">
                <img src="https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Mood Tracker">
              </div>
            </div>
            <div class="tool-content">
              <h3>Mood Tracker</h3>
              <p>Track your emotional patterns and identify triggers with our intuitive mood tracking tool.</p>
              <router-link to="/tools/mood-tracker" class="btn small outline">
                Try It Now
              </router-link>
            </div>
          </div>
          
          <div class="tool-card" data-aos="fade-up" data-aos-delay="200">
            <div class="tool-visual">
              <div class="tool-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3ZM12 15C8.13401 15 5 16.3431 5 18V21H19V18C19 16.3431 15.866 15 12 15Z" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="tool-image">
                <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Journal Prompts">
              </div>
            </div>
            <div class="tool-content">
              <h3>Journal Prompts</h3>
              <p>Get daily guided journal prompts to help process emotions and reflect on your mental health.</p>
              <router-link to="/tools/journal" class="btn small outline">
                Start Journaling
              </router-link>
            </div>
          </div>
          
          <div class="tool-card" data-aos="fade-up" data-aos-delay="300">
            <div class="tool-visual">
              <div class="tool-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" stroke="#4F46E5" stroke-width="2"/>
                  <path d="M16 12L12 8M16 12L12 16M16 12H8" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="tool-image">
                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Breathing Exercises">
              </div>
            </div>
            <div class="tool-content">
              <h3>Breathing Exercises</h3>
              <p>Interactive guided breathing exercises to help reduce stress and anxiety in the moment.</p>
              <router-link to="/tools/breathing" class="btn small outline">
                Breathe With Me
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card" data-aos="fade-up">
          <div class="cta-content">
            <h2 class="cta-title">You don't have to face it alone</h2>
            <p class="cta-text">Join our supportive community and take the first step toward better mental health today.</p>
            <div class="cta-buttons">
              <router-link to="/register" class="btn btn-primary btn-large">
                <span>Create Free Account</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </router-link>
              <router-link to="/about" class="btn btn-outline btn-large">
                <span>Learn How It Works</span>
              </router-link>
            </div>
<br>
<br>
<br>
            <div class="quote-content" data-aos="fade-up" data-aos-delay="100">
          <h2>Mental health needs a great deal of attention. It's the final taboo and it needs to be faced and dealt with.</h2>
          <p>— Adam Ant</p>
        </div>

          </div>
          <div class="cta-image">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Supportive community">
          </div>
        </div>
      </div>
    </section>
     
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'HomePage',
  data() {
    return {
      particles: Array(30).fill(0)
    };
  },
  methods: {
    particleStyle(index) {
      const size = Math.random() * 5 + 2;
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;
      const opacity = Math.random() * 0.5 + 0.1;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        top: `${top}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        opacity: opacity,
        backgroundColor: `rgba(79, 70, 229, ${opacity})`
      };
    },
    animateStats() {
      const statElements = document.querySelectorAll('[data-count]');
      
      statElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-count'));
        const suffix = element.textContent.includes('%') ? '%' : '';
        const duration = 2000; // Animation duration in ms
        const startTime = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const value = Math.floor(progress * target);
          
          element.textContent = value + suffix;
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        animate();
      });
    }
  },
  mounted() {
    // Initialize AOS for scroll animations
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 120
    });
    
    
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding pane
        const tabName = btn.getAttribute('data-tab');
        document.querySelector(`.tab-pane[data-tab="${tabName}"]`).classList.add('active');
      });
    });
    
    // Animate stats when they come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-item').forEach(item => {
      observer.observe(item);
    });
  }
}
</script>

<style lang="scss">


/* Color Variables */
$primary: #4F46E5;
$primary-light: #818CF8;
$primary-dark: #3730A3;
$dark: #1F2937;
$gray: #6B7280;
$gray-light: #F3F4F6;
$gray-lighter: #F9FAFB;
$white: #FFFFFF;

/* Base Styles */
.home-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: $dark;
  line-height: 1.6;
  overflow-x: hidden;
  position: relative;
}

/* NueraAI Glimpse Section */
.nuera-glimpse {
  padding: 80px 0;
  background: linear-gradient(to bottom, $white 0%, $gray-lighter 100%);
  
  .glimpse-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .glimpse-text {
    .section-label {
      display: inline-block;
      color: $primary;
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 1rem;
      padding: 6px 12px;
      background: rgba($primary, 0.1);
      border-radius: 50px;
    }
    
    h2 {
      font-size: clamp(1.75rem, 3vw, 2.25rem);
      font-weight: 700;
      line-height: 1.3;
      margin-bottom: 1.5rem;
      color: $dark;
    }
    
    p {
      color: $gray;
      margin-bottom: 2rem;
      line-height: 1.7;
      font-size: 1.125rem;
    }
    
    .ai-features {
      display: grid;
      gap: 12px;
      margin-bottom: 2rem;
      
      .ai-feature {
        display: flex;
        align-items: center;
        gap: 12px;
        
        svg {
          flex-shrink: 0;
          color: $primary;
        }
        
        span {
          color: $dark;
        }
      }
    }
  }

  
  .glimpse-visual {
    position: relative;
    background: $white;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    max-width: 400px;
    margin-left: auto;
    
    .ai-bubble {
      background: rgba($primary, 0.1);
      border-radius: 18px;
      padding: 12px 16px;
      margin-bottom: 12px;
      max-width: 80%;
      
      &.user {
        background: $primary;
        color: $white;
        margin-left: auto;
        
        .bubble-text {
          color: $white;
        }
        
        .bubble-time {
          color: rgba($white, 0.7);
        }
      }
      
      .bubble-content {
        .bubble-text {
          font-size: 0.9375rem;
          line-height: 1.5;
          color: $dark;
        }
        
        .bubble-time {
          font-size: 0.6875rem;
          color: $gray;
          text-align: right;
          margin-top: 4px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .nuera-glimpse {
    padding: 60px 0;
    
    .glimpse-content {
      grid-template-columns: 1fr;
      gap: 40px;
      
      .glimpse-visual {
        margin: 0 auto;
      }
    }
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
}


.video-thumbnail {
  position: relative;
  height: 180px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }
  
  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background: rgba($primary, 0.7);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    
    svg {
      margin-left: 3px; // Center the play icon
    }
  }
  
  &:hover {
    img {
      transform: scale(1.05);
    }
    
    .play-button {
      background: rgba($primary, 0.9);
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
}

.meta {
  .duration {
    position: relative;
    padding-left: 20px;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M12 6V12L16 14' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-size: contain;
    }
  }
}
/* Background Animation */
.bg-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  
  .bg-circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.1;
    
    &.circle-1 {
      width: 600px;
      height: 600px;
      background: $primary;
      top: -300px;
      left: -300px;
      animation: float 15s ease-in-out infinite;
    }
    
    &.circle-2 {
      width: 400px;
      height: 400px;
      background: $primary-light;
      bottom: -200px;
      right: -100px;
      animation: float 12s ease-in-out infinite reverse;
    }
    
    &.circle-3 {
      width: 300px;
      height: 300px;
      background: $primary-dark;
      top: 50%;
      right: 10%;
      animation: float 18s ease-in-out infinite;
    }
  }
}

/* Floating Particles */
.particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  
  .particle {
    position: absolute;
    border-radius: 50%;
    background: rgba($primary, 0.2);
    animation: float-particle linear infinite;
    
    @keyframes float-particle {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        transform: translateY(-100vh) translateX(20px);
        opacity: 0;
      }
    }
  }
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, 20px);
  }
}

/* Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  gap: 8px;
  border: 2px solid transparent;
  
  &.primary {
    background: $primary;
    color: $white;
    
    &:hover {
      background: $primary-dark;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba($primary, 0.3);
    }
  }
  
  &.secondary {
    background: $white;
    color: $primary;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    
    &:hover {
      background: $gray-lighter;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
  
  &.outline {
    background: transparent;
    color: $primary;
    border-color: $primary;
    
    &:hover {
      background: rgba($primary, 0.1);
      transform: translateY(-2px);
    }
  }
  
  &.large {
    padding: 16px 32px;
    font-size: 1.1rem;
  }
  
  &.small {
    padding: 8px 16px;
    font-size: 0.875rem;
  }
}

/* Section Header */
.section-header {
  text-align: left;

  margin: 0 auto 60px;
  
  .section-label {
    display: inline-block;
    color: $primary;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-align: left;
    text-transform: uppercase;
    margin-bottom: 1rem;
    padding: 6px 12px;
    background: rgba($primary, 0.1);
    border-radius: 50px;
  }
  
  h2 {
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: $dark;
  }
  
  .subtitle {
    font-size: 1.125rem;
    color: $gray;
    line-height: 1.6;
  }
}

/* Modern Hero Section */
.modern-hero {
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  
  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }
  
  .hero-content {
    .badge {
      display: inline-block;
      background: rgba($primary, 0.1);
      color: $primary;
      padding: 8px 16px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 0.875rem;
      margin-bottom: 20px;
    }
    
    h1 {
      font-size: clamp(2.5rem, 5vw, 3.5rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      letter-spacing: -0.03em;
      
      span {
        display: block;
        
        &.gradient-text {
          background: linear-gradient(90deg, $primary 0%, $primary-light 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
    
    .subtitle {
      font-size: clamp(1.125rem, 2vw, 1.25rem);
      font-weight: 400;
      line-height: 1.6;
      margin-bottom: 2.5rem;
      color: $gray;
      max-width: 500px;
    }
    
    .cta-group {
      display: flex;
      gap: 16px;
      margin-bottom: 40px;
    }
    
    .stats {
      display: flex;
      gap: 30px;
      margin-top: 40px;
      
      .stat-item {
        .number {
          font-size: 1.5rem;
          font-weight: 700;
          color: $primary;
          margin-bottom: 4px;
        }
        
        .label {
          font-size: 0.875rem;
          color: $gray;
        }
      }
    }
  }
  
  .hero-visual {
    position: relative;
    
    .floating-cards {
      position: relative;
      width: 100%;
      max-width: 500px;
      margin-left: auto;
      
      .main-card {
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        position: relative;
        transform-style: preserve-3d;
        
        img {
          width: 100%;
          height: auto;
          display: block;
        }
        
        .card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          background: linear-gradient(transparent, rgba(0,0,0,0.7));
          color: $white;
          font-weight: 600;
        }
      }
      
      .floating-card {
        position: absolute;
        background: $white;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        width: 220px;
        z-index: 2;
        transform-style: preserve-3d;
        
        &.resources {
          bottom: -30px;
          left: -30px;
          transform: rotate(-5deg);
        }
        
        &.community {
          top: -30px;
          right: -30px;
          transform: rotate(5deg);
        }
        
        .icon {
          width: 40px;
          height: 40px;
          background: rgba($primary, 0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          
          svg {
            width: 20px;
            height: 20px;
          }
        }
        
        h4 {
          font-size: 1rem;
          margin-bottom: 4px;
        }
        
        p {
          font-size: 0.875rem;
          color: $gray;
        }
      }
    }
  }
}

/* Features Section */
.features-section {
  padding: 120px 0;
  background: $gray-lighter;
  position: relative;
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }
  
  .feature-card {
    background: $white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s, box-shadow 0.3s;
    
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
    }
    
    .feature-visual {
      position: relative;
      height: 200px;
      
      .icon-circle {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 60px;
        height: 60px;
        background: rgba($primary, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        
        svg {
          width: 24px;
          height: 24px;
        }
      }
      
      .feature-image {
        width: 100%;
        height: 100%;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    
    .feature-content {
      padding: 30px;
      
      h3 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      
      p {
        color: $gray;
        margin-bottom: 20px;
        line-height: 1.7;
      }
      
      .feature-stats {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
        
        .stat {
          .number {
            font-size: 1.25rem;
            font-weight: 700;
            color: $primary;
          }
          
          .label {
            font-size: 0.75rem;
            color: $gray;
          }
        }
      }
      
      .feature-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: $primary;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s;
        
        &:hover {
          gap: 12px;
        }
        
        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
}


/* Testimonials Section */
.testimonials-section {
  padding: 120px 0;
  background: $white;
  
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }
  
  .testimonial-card {
    background: $white;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba($primary, 0.1);
    transition: transform 0.3s;
    
    &:hover {
      transform: translateY(-5px);
    }
    
    .testimonial-header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      position: relative;
      
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 15px;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      
      .user-info {
        h4 {
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        span {
          font-size: 0.875rem;
          color: $primary;
        }
      }
      
      .quote-icon {
        position: absolute;
        top: 0;
        right: 0;
        color: rgba($primary, 0.2);
      }
    }
    
    blockquote {
      font-size: 1.125rem;
      line-height: 1.8;
      color: $dark;
      margin-bottom: 20px;
      font-style: italic;
      position: relative;
      padding-left: 20px;
      
      &::before {
        content: '"';
        position: absolute;
        left: 0;
        top: -10px;
        font-size: 3rem;
        color: rgba($primary, 0.1);
        font-family: serif;
        line-height: 1;
      }
    }
    
    .progress-container {
      margin-top: 20px;
      
      .progress-label {
        font-size: 0.875rem;
        margin-bottom: 8px;
        color: $gray;
      }
      
      .progress-bar {
        height: 8px;
        background: $gray-light;
        border-radius: 4px;
        position: relative;
        margin-bottom: 8px;
        
        .progress-fill {
          height: 100%;
          background: $primary;
          border-radius: 4px;
          position: relative;
          
          &::after {
            content: '';
            position: absolute;
            right: -6px;
            top: -4px;
            width: 16px;
            height: 16px;
            background: $white;
            border: 2px solid $primary;
            border-radius: 50%;
          }
        }
        
        span {
          position: absolute;
          right: 0;
          top: 15px;
          font-size: 0.75rem;
          color: $primary;
          font-weight: 600;
        }
      }
    }
  }
  
  .testimonials-cta {
    text-align: center;
    margin-top: 60px;
  }
}

/* Interactive Tools Showcase */
.tools-showcase {
  padding: 120px 0;
  background: $gray-lighter;
  
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }
  
  .tool-card {
    background: $white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s;
    
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
    }
    
    .tool-visual {
      position: relative;
      height: 200px;
      
      .tool-icon {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 60px;
        height: 60px;
        background: rgba($primary, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        
        svg {
          width: 24px;
          height: 24px;
        }
      }
      
      .tool-image {
        width: 100%;
        height: 100%;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    
    .tool-content {
      padding: 30px;
      
      h3 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      
      p {
        color: $gray;
        margin-bottom: 20px;
        line-height: 1.7;
      }
    }
  }
}

/* Stats Section */
.stats-section {
  position: relative;
  padding: 100px 0;
  color: $white;
  overflow: hidden;
  
  .parallax-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, $primary-dark 0%, $primary 100%);
    z-index: -1;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 40px;
    text-align: center;
    
    .stat-item {
      .number {
        font-size: clamp(2rem, 5vw, 3rem);
        font-weight: 800;
        margin-bottom: 10px;
        color: $white;
      }
      
      .label {
        font-size: 1.125rem;
        opacity: 0.9;
      }
    }
  }
}

/* Resources Section */
.resources-section {
  padding: 120px 0;
  background: $gray-lighter;
  
  .resources-tabs {
    .tabs-header {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 40px;
      flex-wrap: wrap;
      
      .tab-btn {
        padding: 10px 20px;
        background: transparent;
        border: none;
        border-radius: 50px;
        font-weight: 600;
        color: $gray;
        cursor: pointer;
        transition: all 0.3s;
        
        &.active {
          background: $primary;
          color: $white;
        }
        
        &:not(.active):hover {
          color: $primary;
        }
      }
    }
    
    .tabs-content {
      .tab-pane {
        display: none;
        
        &.active {
          display: block;
        }
      }
    }
  }
  
  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }
  
  .resource-card {
    background: $white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s;
    
    &:hover {
      transform: translateY(-5px);
    }
    
    .resource-image {
      height: 180px;
      overflow: hidden;
      position: relative;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s;
      }
      
      &:hover img {
        transform: scale(1.05);
      }
      
      .category-badge {
        position: absolute;
        top: 15px;
        left: 15px;
        background: rgba($primary, 0.9);
        color: $white;
        padding: 4px 12px;
        border-radius: 50px;
        font-size: 0.75rem;
        font-weight: 600;
      }
    }
    
    .resource-content {
      padding: 20px;
      
      .meta {
        display: flex;
        gap: 15px;
        margin-bottom: 12px;
        font-size: 0.75rem;
        
        .reading-time {
          color: $gray;
        }
        
        .difficulty {
          color: $primary;
          font-weight: 600;
        }
      }
      
      h3 {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 12px;
        line-height: 1.4;
      }
      
      p {
        color: $gray;
        margin-bottom: 20px;
        font-size: 0.9375rem;
        line-height: 1.6;
      }
      
      .resource-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .resource-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: $primary;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s;
          
          &:hover {
            gap: 12px;
          }
          
          svg {
            width: 16px;
            height: 16px;
          }
        }
        
        .bookmark {
          cursor: pointer;
          opacity: 0.7;
          transition: all 0.3s;
          
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
  
  .resources-cta {
    text-align: center;
    margin-top: 60px;
  }
}

/* CTA Section */
.cta-section {
  padding: 80px 0;
  
  .cta-card {
    background: $white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    display: grid;
    grid-template-columns: 1fr 1fr;
    
    .cta-content {
      padding: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      
      .cta-title {
        font-size: clamp(1.5rem, 3vw, 2rem);
        font-weight: 700;
        margin-bottom: 1.5rem;
        line-height: 1.3;
      }
      
      .cta-text {
        font-size: 1.125rem;
        color: $gray;
        margin-bottom: 2.5rem;
        line-height: 1.7;
      }
      
      .cta-buttons {
        display: flex;
        gap: 16px;
      }
    }
    
    .cta-image {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .modern-hero .hero-grid {
    grid-template-columns: 1fr;
    
    .hero-content {
      text-align: center;
      margin-bottom: 60px;
      
      .subtitle {
        margin-left: auto;
        margin-right: auto;
      }
      
      .cta-group {
        justify-content: center;
      }
      
      .stats {
        justify-content: center;
      }
    }
    
    .hero-visual {
      .floating-cards {
        margin: 0 auto;
        
        .floating-card {
          &.resources {
            left: 20px;
          }
          
          &.community {
            right: 20px;
          }
        }
      }
    }
  }
  
  .cta-card {
    grid-template-columns: 1fr !important;
    
    .cta-image {
      order: -1;
      height: 100px;
    }
  }
}

@media (max-width: 768px) {
  .modern-hero,
  .features-section,
  .testimonials-section,
  .resources-section,
  .tools-showcase,
  .parallax-quote {
    padding: 80px 0;
  }
  
  .features-grid,
  .testimonials-grid,
  .resources-grid,
  .tools-grid {
    grid-template-columns: 1fr;
  }
  
  .modern-hero .hero-visual .floating-cards .floating-card {
    display: none;
  }
  
  .tabs-header {
    justify-content: flex-start !important;
    overflow-x: auto;
    padding-bottom: 10px;
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
  
  .cta-content {
    padding: 40px !important;
  }
}

@media (max-width: 480px) {
  .modern-hero {
    padding: 60px 0;
    
    .hero-content {
      .cta-group {
        flex-direction: column;
      }
      
      .stats {
        flex-direction: column;
        gap: 20px;
      }
    }
  }
  
  .feature-card,
  .testimonial-card,
  .resource-card,
  .tool-card {
    padding: 30px !important;
  }
  
  .cta-buttons {
    flex-direction: column;
  }
  
  .stats-grid {
    grid-template-columns: 1fr 1fr !important;
    gap: 20px !important;
  }
}
</style>