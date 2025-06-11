<template>
  <div class="about-page">
    <!-- Modern Hero Section -->
    <section class="hero-section">
      <div class="particles" id="particles-js"></div>
      <div class="gradient-overlay"></div>
      
      <div class="container">
        <div class="hero-content">
          <div class="text-content">
            <h1 class="hero-title">
              <span class="gradient-text">About LiftUp</span>
              <span class="typing-cursor">|</span>
            </h1>
            
            <p class="hero-subtitle">
              <span class="typed-text">{{ typedText }}</span>
            </p>
            
            <div class="cta-buttons">
              <a href="#mission" class="btn primary">
                <span>Our Mission</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
              <a href="#team" class="btn secondary">
                <span>Meet the Team</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M12.5 7C12.5 9.20914 10.7091 11 8.5 11C6.29086 11 4.5 9.20914 4.5 7C4.5 4.79086 6.29086 3 8.5 3C10.7091 3 12.5 4.79086 12.5 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
            
            <div class="stats-bar">
              <div class="stat">
                <div class="stat-number">{{ currentCounters.users.toLocaleString() }}</div>
                <div class="stat-label">Daily Users</div>
              </div>
              <div class="stat">
                <div class="stat-number">{{ currentCounters.support }}</div>
                <div class="stat-label">/7 Support</div>
              </div>
              <div class="stat">
                <div class="stat-number">{{ currentCounters.anonymous }}</div>
                <div class="stat-label">% Anonymous</div>
              </div>
            </div>
          </div>
          
          <div class="visual-content">
            <div class="interactive-card" id="interactive-card">
              <div class="card-face">
                <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                     class="card-image"
                     loading="lazy">
                <div class="card-overlay">
                  <h3>Join Our Community</h3>
                  <p>Safe, anonymous support whenever you need it</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>

    <!-- About LiftUp Section -->
    <section class="about-liftup-section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">OUR STORY</span>
          <h2>What is LiftUp?</h2>
        </div>
        
        <div class="about-content">
          <div class="about-text">
            <h3>Who We Are</h3>
            <p>LiftUp is an innovative digital mental health platform founded in 2025 by a team of psychologists, technologists, and mental health advocates. We recognized that traditional mental health services often fail to meet people where they are - whether due to cost barriers, long wait times, or the stigma surrounding seeking help.</p>
            
            <div class="key-facts">
              <div class="fact-item">
                <div class="fact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="fact-content">
                  <h4>Safe & Anonymous</h4>
                  <p>Your privacy is our priority. No personal data required to get support.</p>
                </div>
              </div>
              
              <div class="fact-item">
                <div class="fact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="fact-content">
                  <h4>Community-Powered</h4>
                  <p>Real support from people who understand what you're going through.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="about-visual">
            <div class="illustration-container">
              <img src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                   alt="LiftUp platform illustration" 
                   class="illustration-img"
                   loading="lazy">
              <div class="floating-elements">
                <!-- Floating elements would go here -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section id="mission" class="mission-section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">OUR MISSION</span>
          <h2>Creating safe spaces for mental wellness</h2>
        </div>
        
        <div class="mission-grid">
          <div class="mission-text">
            <h3>Why LiftUp Exists</h3>
            <p>Founded in 2025 by mental health advocates and technologists, LiftUp emerged from a shared frustration with the limitations of traditional mental health support systems. We recognized that while 1 in 5 adults experiences mental illness each year, nearly 60% don't receive the help they need due to barriers like cost, stigma, and accessibility.</p>
            
            <h3>Our Innovative Approach</h3>
            <p>LiftUp combines evidence-based psychological practices with cutting-edge technology to create a support system that's:</p>
            <ul class="mission-features">
              <li>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22 4L12 14.01l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span><strong>Completely anonymous</strong> - No personal data required</span>
              </li>
              <li>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22 4L12 14.01l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span><strong>Community-powered</strong> - Real support from people who understand</span>
              </li>
            </ul>
            
            <p class="mission-closing">We're not just building an app - we're creating a movement to normalize mental health support and make compassionate care accessible to everyone, regardless of their circumstances.</p>
          </div>
          
          <div class="mission-visual">
            <div class="animated-illustration">
              <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                   alt="Mission illustration" 
                   class="mission-image"
                   loading="lazy">
              <div class="circle-layer"></div>
              <div class="testimonial-bubble">
                <div class="bubble-content">
                  "LiftUp gave me the courage to seek professional help after years of struggling alone."
                  <div class="bubble-author">- Maria, 28</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- Add this section after the Values Section and before the Team Section -->
<section class="nuera-ai-section">
  <div class="container">
    <div class="section-header">
      <span class="section-label">AI COMPANION</span>
      <h2>Meet NueraAI - Your 24/7 Mental Health Companion</h2>
    </div>
    
    <div class="ai-content">
      <div class="ai-text">
        <h3>Always Available Support</h3>
        <p>NueraAI is LiftUp's intelligent chatbot designed to provide immediate, judgment-free support whenever you need it. Powered by advanced natural language processing and trained with mental health professionals, NueraAI offers:</p>
        
        <ul class="ai-features">
          <li>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22 4L12 14.01l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span><strong>Instant conversations</strong> - Get support anytime, day or night</span>
          </li>
          <li>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22 4L12 14.01l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span><strong>Evidence-based techniques</strong> - CBT, mindfulness, and grounding exercises</span>
          </li>
          <li>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22 4L12 14.01l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span><strong>Anonymous interaction</strong> - No personal data stored or required</span>
          </li>
          <li>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22 4L12 14.01l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span><strong>Crisis resources</strong> - Immediate access to help when needed most</span>
          </li>
        </ul>
        
        <div class="ai-disclaimer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p>NueraAI is not a replacement for professional medical care, but can provide immediate support and guide you to appropriate resources.</p>
        </div>
      </div>
      
      <div class="ai-visual">
        <div class="chatbot-interface">
          <div class="chat-header">
            <div class="chatbot-avatar">
              <img src="https://cdn-icons-png.flaticon.com/512/4712/4712139.png" alt="Neura AI" class="chat-logo">
              alt="NueraAI Avatar"
                   loading="lazy">
            </div>
            <div class="chatbot-info">
              <h4>NueraAI</h4>
              <span class="status">Online</span>
            </div>
          </div>
          
          <div class="chat-messages">
            <div class="message ai-message">
              <div class="message-content">
                Hi there! I'm NueraAI. How are you feeling today?
              </div>
              <div class="message-time">Just now</div>
            </div>
            
            <div class="message user-message">
              <div class="message-content">
                I've been feeling really anxious lately
              </div>
              <div class="message-time">Just now</div>
            </div>
            
            <div class="message ai-message">
              <div class="message-content">
                I'm sorry to hear that. Would you like to try a quick grounding exercise or talk through what's bothering you?
              </div>
              <div class="message-time">Just now</div>
            </div>
          </div>
          
          <div class="chat-input">
            <input type="text" placeholder="Type your message...">
            <button class="send-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="floating-shapes">
          <div class="shape circle"></div>
          <div class="shape triangle"></div>
          <div class="shape square"></div>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- <section class="therapist-finder-section">
  <div class="container">
    <div class="section-header">
      <span class="section-label">AI-POWERED MATCHING</span>
      <h2>Find Your Perfect Therapist Match</h2>
    </div>
    
    <div class="finder-content">
      <div class="finder-text">
        <h3>Personalized Therapist Matching</h3>
        <p>Our AI-powered Therapist Finder helps you connect with licensed mental health professionals who are the best fit for your specific needs, preferences, and circumstances.</p>
        
        <div class="finder-features">
          <div class="feature">
            <div class="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="feature-details">
              <h4>Smart Matching Algorithm</h4>
              <p>Our AI analyzes 20+ factors including specialty, approach, personality, and availability to find your ideal match.</p>
            </div>
          </div>
          
          <div class="feature">
            <div class="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="feature-details">
              <h4>Verified Professionals</h4>
              <p>All therapists are licensed and vetted, with transparent profiles showing credentials, specialties, and approaches.</p>
            </div>
          </div>
          
          <div class="feature">
            <div class="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="feature-details">
              <h4>Flexible Options</h4>
              <p>Choose from in-person, video, or text therapy with professionals who meet your scheduling needs.</p>
            </div>
          </div>
        </div>
        
        <div class="finder-stats">
          <div class="stat">
            <div class="stat-number">92%</div>
            <div class="stat-label">Match Satisfaction Rate</div>
          </div>
          <div class="stat">
            <div class="stat-number">500+</div>
            <div class="stat-label">Verified Therapists</div>
          </div>
        </div>
      </div>
      
      <div class="finder-visual">
        <div class="matching-process">
          <div class="process-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>Complete Brief Assessment</h4>
              <p>Answer questions about your preferences, needs, and therapy goals</p>
            </div>
          </div>
          
          <div class="process-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>AI Analyzes Your Needs</h4>
              <p>Our algorithm matches you with 3-5 ideal therapist candidates</p>
            </div>
          </div>
          
          <div class="process-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>Review & Connect</h4>
              <p>Compare matches and schedule your first session</p>
            </div>
          </div>
          
          <div class="therapist-cards">
            <div class="therapist-card">
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" 
                   alt="Therapist" 
                   class="therapist-photo">
              <div class="therapist-info">
                <h5>Dr. Emily Park</h5>
                <span class="specialty">Anxiety & Depression</span>
                <div class="match-score">
                  <div class="score-bar">
                    <div class="score-fill" style="width: 94%"></div>
                  </div>
                  <span>94% Match</span>
                </div>
              </div>
            </div>
            
            <div class="therapist-card">
              <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" 
                   alt="Therapist" 
                   class="therapist-photo">
              <div class="therapist-info">
                <h5>Dr. Mark Johnson</h5>
                <span class="specialty">Trauma & PTSD</span>
                <div class="match-score">
                  <div class="score-bar">
                    <div class="score-fill" style="width: 88%"></div>
                  </div>
                  <span>88% Match</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> -->

    <!-- Team Section -->
    <section id="team" class="team-section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">THE TEAM</span>
          <h2>Passionate creators behind LiftUp</h2>
        </div>
        
        <div class="team-grid">
          <div class="team-card">
            <div class="card-inner">
              <div class="member-photo">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                     alt="Dr. Sarah Chen"
                     loading="lazy">
                <div class="social-links">
                  <a href="#"><i class="icon-linkedin"></i></a>
                  <a href="#"><i class="icon-twitter"></i></a>
                </div>
              </div>
              <div class="member-info">
                <h3>Dr. Sarah Chen</h3>
                <span class="role">Clinical Psychologist</span>
                <p>Specializes in cognitive behavioral therapy and digital mental health interventions with 12 years of clinical experience.</p>
              </div>
            </div>
          </div>
          
          <div class="team-card">
            <div class="card-inner">
              <div class="member-photo">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                     alt="Jamal Williams"
                     loading="lazy">
                <div class="social-links">
                  <a href="#"><i class="icon-linkedin"></i></a>
                  <a href="#"><i class="icon-twitter"></i></a>
                </div>
              </div>
              <div class="member-info">
                <h3>Jamal Williams</h3>
                <span class="role">Community Director</span>
                <p>Leads peer support programs and ensures our community guidelines promote safety and inclusivity.</p>
              </div>
            </div>
          </div>
          
          <div class="team-card">
            <div class="card-inner">
              <div class="member-photo">
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                     alt="Alex Martinez"
                     loading="lazy">
                <div class="social-links">
                  <a href="#"><i class="icon-linkedin"></i></a>
                  <a href="#"><i class="icon-twitter"></i></a>
                </div>
              </div>
              <div class="member-info">
                <h3>Alex Martinez</h3>
                <span class="role">Product Lead</span>
                <p>Designs intuitive experiences that make mental health support accessible to all users.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

        <!-- Values Section -->
        <section class="values-section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">OUR CORE VALUES</span>
          <h2>Principles that guide everything we do</h2>
        </div>
        
        <div class="values-grid">
          <div class="value-card">
            <div class="icon-container">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>Anonymity</h3>
            <p>Your privacy is sacred. We've built our platform from the ground up to protect your identity while fostering genuine connection.</p>
          </div>
          
          <div class="value-card">
            <div class="icon-container">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>Community</h3>
            <p>Healing happens together. We cultivate supportive spaces where shared experiences create powerful bonds.</p>
          </div>
          
          <div class="value-card">
            <div class="icon-container">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="4" y1="22" x2="4" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>Accessibility</h3>
            <p>Mental health support should have no barriers. We design for all abilities, languages, and backgrounds.</p>
          </div>
          
          <div class="value-card">
            <div class="icon-container">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>Innovation</h3>
            <p>We constantly evolve, using technology to create better, more effective support systems.</p>
          </div>
        </div>
      </div>
    </section>


    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <h2>Ready to join our community?</h2>
          <p>Start your journey to better mental health today with LiftUp's supportive community and resources.</p>
          <div class="cta-buttons">
            <a href="/forum" class="btn primary">Visit Our Forum</a>
            <a href="/how-it-works" class="btn secondary">How It Works</a>
          </div>
        </div>
      </div>
    </section>
  </div>

     <Overallchatbot />
</template>

<script>
import Overallchatbot from '@/components/MentalHealthWidget.vue';

export default {
  name: 'AboutPage',
   components: {
    Overallchatbot
  },
  data() {
    return {
      typedText: '',
      currentCounters: {
        users: 0,
        support: 0,
        anonymous: 0
      },
      typewriterPhrases: [
        "Breaking barriers in mental health support",
        "Compassionate technology for all",
        "Anonymous, accessible care",
        "Where technology meets empathy"
      ],
      typewriterState: {
        currentPhrase: 0,
        currentChar: 0,
        isDeleting: false,
        typingSpeed: 100,
        deletingSpeed: 50,
        pauseBetween: 2000
      }
    }
  },
  mounted() {
    this.initTypewriter();
    this.initCounters();
    this.initCardTilt();
    
    if (typeof particlesJS !== 'undefined') {
      this.initParticles();
    }
  },
  methods: {
    initTypewriter() {
      const type = () => {
        const { currentPhrase, currentChar, isDeleting } = this.typewriterState;
        const fullPhrase = this.typewriterPhrases[currentPhrase];
        
        if (isDeleting) {
          this.typedText = fullPhrase.substring(0, currentChar - 1);
          this.typewriterState.currentChar--;
        } else {
          this.typedText = fullPhrase.substring(0, currentChar + 1);
          this.typewriterState.currentChar++;
        }
        
        if (!isDeleting && this.typewriterState.currentChar === fullPhrase.length) {
          this.typewriterState.isDeleting = true;
          setTimeout(type, this.typewriterState.pauseBetween);
        } else if (isDeleting && this.typewriterState.currentChar === 0) {
          this.typewriterState.isDeleting = false;
          this.typewriterState.currentPhrase = (currentPhrase + 1) % this.typewriterPhrases.length;
          setTimeout(type, this.typewriterState.typingSpeed);
        } else {
          setTimeout(type, isDeleting ? this.typewriterState.deletingSpeed : this.typewriterState.typingSpeed);
        }
      };
      
      setTimeout(type, 1000);
    },
    
    initCounters() {
      const targets = {
        users: 10000,
        support: 24,
        anonymous: 100
      };
      const duration = 2000;
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);
      
      Object.keys(targets).forEach(key => {
        let frame = 0; // This is the critical fix
        const countTo = targets[key];
        const counter = () => {
          frame++;
          const progress = frame / totalFrames;
          const currentCount = Math.round(countTo * progress);
          
          if (key === 'users') this.currentCounters.users = currentCount;
          if (key === 'support') this.currentCounters.support = currentCount;
          if (key === 'anonymous') this.currentCounters.anonymous = currentCount;
          
          if (frame < totalFrames) {
            requestAnimationFrame(counter);
          }
        };
        
        counter();
      });
    },
    
    initCardTilt() {
      this.$nextTick(() => {
        const card = document.getElementById('interactive-card');
        
        if (card) {
          card.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
          });
          
          card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
          });
          
          card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = 'rotateY(0deg) rotateX(0deg)';
          });
        }
      });
    },
    
    initParticles() {
      particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          line_linked: { 
            enable: true, 
            distance: 150, 
            color: "#ffffff", 
            opacity: 0.4, 
            width: 1 
          },
          move: { 
            enable: true, 
            speed: 2, 
            direction: "none", 
            random: true, 
            straight: false, 
            out_mode: "out" 
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
          }
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
/* Variables */
$primary: #6366f1;
$primary-light: #a5b4fc;
$primary-dark: #4f46e5;
$dark: #1f2937;
$gray: #6b7280;
$light-gray: #f3f4f6;
$white: #ffffff;
$success: #10b981;
$warning: #f59e0b;
$error: #ef4444;

$radius-sm: 0.5rem;
$radius-md: 1rem;
$radius-lg: 1.5rem;

$shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
$shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.1);

/* Base Styles */


/* NueraAI Section Styles */
.nuera-ai-section {
  padding: 6rem 0;
  background: linear-gradient(to bottom, $light-gray 0%, $white 100%);
  
  .ai-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    
    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }
  
  .ai-text {
    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: $primary-dark;
    }
    
    p {
      color: $gray;
      margin-bottom: 2rem;
      line-height: 1.7;
    }
    
    .ai-features {
      list-style: none;
      padding: 0;
      margin: 2rem 0;
      
      li {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1.25rem;
        
        svg {
          flex-shrink: 0;
          color: $primary;
          margin-top: 0.25rem;
        }
        
        span {
          color: $dark;
          
          strong {
            color: $primary-dark;
          }
        }
      }
    }
    
    .ai-disclaimer {
      display: flex;
      gap: 1rem;
      background: rgba($warning, 0.1);
      border-radius: $radius-sm;
      padding: 1rem;
      margin-top: 2rem;
      
      svg {
        flex-shrink: 0;
        color: $warning;
      }
      
      p {
        font-size: 0.875rem;
        color: $dark;
        margin-bottom: 0;
      }
    }
  }
  
  .ai-visual {
    position: relative;
    
    .chatbot-interface {
      background: $white;
      border-radius: $radius-lg;
      box-shadow: $shadow-lg;
      overflow: hidden;
      transform: translateY(0);
      transition: transform 0.3s ease;
      position: relative;
      z-index: 2;
      
      &:hover {
        transform: translateY(-5px);
      }
      
      .chat-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
        background: linear-gradient(to right, $primary 0%, $primary-light 100%);
        color: $white;
        
        .chatbot-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        
        .chatbot-info {
          h4 {
            font-size: 1.25rem;
            margin-bottom: 0.25rem;
          }
          
          .status {
            display: flex;
            align-items: center;
            font-size: 0.75rem;
            
            &::before {
              content: '';
              display: inline-block;
              width: 8px;
              height: 8px;
              background: $success;
              border-radius: 50%;
              margin-right: 0.5rem;
            }
          }
        }
      }
      
      .chat-messages {
        padding: 1.5rem;
        height: 300px;
        overflow-y: auto;
        
        .message {
          margin-bottom: 1rem;
          max-width: 80%;
          
          .message-content {
            padding: 0.75rem 1rem;
            border-radius: $radius-sm;
            font-size: 0.9375rem;
            line-height: 1.5;
          }
          
          .message-time {
            font-size: 0.6875rem;
            color: $gray;
            margin-top: 0.25rem;
          }
          
          &.ai-message {
            .message-content {
              background: rgba($primary, 0.1);
              border-bottom-left-radius: 0;
            }
          }
          
          &.user-message {
            margin-left: auto;
            
            .message-content {
              background: $primary;
              color: $white;
              border-bottom-right-radius: 0;
            }
            
            .message-time {
              text-align: right;
            }
          }
        }
      }
      
      .chat-input {
        display: flex;
        padding: 0 1.5rem 1.5rem;
        
        input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid rgba($gray, 0.2);
          border-radius: $radius-sm;
          font-size: 0.9375rem;
          
          &:focus {
            outline: none;
            border-color: $primary;
          }
        }
        
        .send-button {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: $primary;
          color: $white;
          border: none;
          border-radius: $radius-sm;
          margin-left: 0.5rem;
          cursor: pointer;
          transition: all 0.3s;
          
          &:hover {
            background: $primary-dark;
          }
        }
      }
    }
    
    .floating-shapes {
      position: absolute;
      top: -30px;
      right: -30px;
      width: 200px;
      height: 200px;
      
      .shape {
        position: absolute;
        opacity: 0.2;
        
        &.circle {
          width: 80px;
          height: 80px;
          background: $primary;
          border-radius: 50%;
          top: 0;
          right: 0;
          animation: float 6s ease-in-out infinite;
        }
        
        &.triangle {
          width: 0;
          height: 0;
          border-left: 40px solid transparent;
          border-right: 40px solid transparent;
          border-bottom: 70px solid $success;
          bottom: 0;
          left: 0;
          animation: float 8s ease-in-out infinite reverse;
        }
        
        &.square {
          width: 60px;
          height: 60px;
          background: $warning;
          bottom: 20px;
          right: 20px;
          transform: rotate(15deg);
          animation: float 7s ease-in-out infinite 1s;
        }
      }
    }
  }
}



/* Therapist Finder Section */
.therapist-finder-section {
  padding: 6rem 0;
  background: $white;
  
  .finder-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    
    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }
  
  .finder-text {
    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: $primary-dark;
    }
    
    p {
      color: $gray;
      margin-bottom: 2rem;
      line-height: 1.7;
    }
    
    .finder-features {
      display: grid;
      gap: 1.5rem;
      margin: 2rem 0;
      
      .feature {
        display: flex;
        gap: 1.5rem;
        align-items: flex-start;
        
        .feature-icon {
          width: 48px;
          height: 48px;
          background: rgba($primary, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          
          svg {
            color: $primary;
          }
        }
        
        .feature-details {
          h4 {
            font-size: 1.125rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
          }
          
          p {
            font-size: 0.9375rem;
            margin-bottom: 0;
          }
        }
      }
    }
    
    .finder-stats {
      display: flex;
      gap: 2rem;
      margin-top: 2rem;
      
      .stat {
        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: $primary;
          line-height: 1;
          margin-bottom: 0.25rem;
        }
        
        .stat-label {
          font-size: 0.875rem;
          color: $gray;
        }
      }
    }
  }
  
  .finder-visual {
    .matching-process {
      background: $light-gray;
      border-radius: $radius-lg;
      padding: 2rem;
      position: relative;
      
      .process-step {
        display: flex;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
        position: relative;
        z-index: 2;
        
        .step-number {
          width: 40px;
          height: 40px;
          background: $primary;
          color: $white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }
        
        .step-content {
          h4 {
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }
          
          p {
            font-size: 0.9375rem;
            color: $gray;
          }
        }
        
        &:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 20px;
          top: 40px;
          bottom: -1.5rem;
          width: 2px;
          background: rgba($primary, 0.2);
          z-index: 1;
        }
      }
      
      .therapist-cards {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-top: 2rem;
        
        .therapist-card {
          background: $white;
          border-radius: $radius-md;
          padding: 1.5rem;
          box-shadow: $shadow-sm;
          transition: transform 0.3s;
          
          &:hover {
            transform: translateY(-5px);
          }
          
          .therapist-photo {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 1rem;
          }
          
          .therapist-info {
            h5 {
              font-size: 1.125rem;
              margin-bottom: 0.25rem;
            }
            
            .specialty {
              display: block;
              font-size: 0.875rem;
              color: $gray;
              margin-bottom: 1rem;
            }
            
            .match-score {
              .score-bar {
                height: 6px;
                background: rgba($primary, 0.1);
                border-radius: 3px;
                margin-bottom: 0.5rem;
                
                .score-fill {
                  height: 100%;
                  background: $primary;
                  border-radius: 3px;
                }
              }
              
              span {
                font-size: 0.75rem;
                color: $primary;
                font-weight: 600;
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .therapist-finder-section {
    padding: 4rem 0;
    
    .finder-visual {
      .matching-process {
        .therapist-cards {
          grid-template-columns: 1fr;
        }
      }
    }
  }
}

.about-page {
  overflow-x: hidden;
  color: $dark;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-header {
  text-align: left;
  margin-bottom: 3rem;
  
  .section-label {
    display: inline-block;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: $primary;
    text-align: left;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    background: rgba($primary, 0.1);
    border-radius: $radius-sm;
  }
  
  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: $dark;
  }
  
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: $radius-sm;
  font-weight: 600;
  transition: all 0.3s ease;
  gap: 0.5rem;
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform 0.3s ease;
  }
  
  &.primary {
    background: $primary;
    color: $white;
    box-shadow: $shadow-sm;
    
    &:hover {
      background: $primary-dark;
      transform: translateY(-2px);
      box-shadow: $shadow-md;
      
      svg {
        transform: translateX(4px);
      }
    }
  }
  
  &.secondary {
    background: transparent;
    color: $primary;
    border: 1px solid $primary;
    
    &:hover {
      background: rgba($primary, 0.1);
      transform: translateY(-2px);
    }
  }
}

/* Hero Section - Modern Design */
.hero-section {
  position: relative;
  padding: 8rem 0 6rem;
  background: linear-gradient(135deg, $primary 0%, $primary-dark 100%);
  color: white;
  overflow: hidden;
  
  .particles {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }
  
  .gradient-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: radial-gradient(circle at 20% 50%, rgba($primary, 0.8) 0%, rgba($primary-dark, 0.9) 100%);
    z-index: 2;
  }
  
  .container {
    position: relative;
    z-index: 3;
  }
  
  .hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
    
    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }
  
  .text-content {
    .hero-title {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      
      .gradient-text {
        background: linear-gradient(90deg, $white 0%, #e0e7ff 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        position: relative;
      }
      
      .typing-cursor {
        display: inline-block;
        margin-left: 4px;
        animation: blink 1s infinite;
        color: white;
      }
    }
    
    .hero-subtitle {
      font-size: clamp(1.25rem, 2vw, 1.5rem);
      opacity: 0.9;
      margin-bottom: 2rem;
      min-height: 3rem;
      
      @media (max-width: 768px) {
        min-height: 4.5rem;
      }
    }
    
    .cta-buttons {
      display: flex;
      gap: 1rem;
      margin-bottom: 3rem;
      
      @media (max-width: 768px) {
        flex-direction: column;
      }
      
      .btn {
        min-height: 44px; // Accessibility touch target
        
        &.primary {
          background: $white;
          color: $primary-dark;
          
          &:hover {
            color: $white;
          }
        }
        
        &.secondary {
          color: $white;
          border: 2px solid rgba($white, 0.3);
          
          &:hover {
            background: rgba($white, 0.1);
            border-color: $white;
          }
        }
      }
    }
    
    .stats-bar {
      display: flex;
      gap: 2rem;
      margin-top: 2rem;
      
      @media (max-width: 768px) {
        justify-content: center;
        flex-wrap: wrap;
      }
      
      .stat {
        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 0.25rem;
        }
        
        .stat-label {
          font-size: 0.875rem;
          opacity: 0.8;
        }
      }
    }
  }
  
  .visual-content {
    position: relative;
    height: 100%;
    perspective: 1000px;
    
    @media (max-width: 1024px) {
      margin-top: 3rem;
      height: 400px;
    }
    
    .interactive-card {
      width: 100%;
      height: 500px;
      transform-style: preserve-3d;
      transition: transform 0.5s ease;
      position: relative;
      
      @media (max-width: 1024px) {
        height: 400px;
        max-width: 500px;
        margin: 0 auto;
      }
      
      .card-face {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: $radius-lg;
        overflow: hidden;
        box-shadow: $shadow-lg;
        
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          color: $white;
          
          h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
          }
          
          p {
            opacity: 0.9;
          }
        }
      }
    }
  }
  
  .wave-divider {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150px;
    color: rgba($white, 0.2);
    
    svg {
      width: 100%;
      height: 100%;
    }
  }
}

/* About LiftUp Section */
.about-liftup-section {
  padding: 6rem 0;
  background: $white;
  position: relative;
  
  .about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    
    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }
  
  .about-text {
    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 2rem 0 1rem;
      color: $primary-dark;
      
      &:first-child {
        margin-top: 0;
      }
    }
    
    p {
      color: $gray;
      margin-bottom: 1.5rem;
      line-height: 1.7;
    }
    
    .key-facts {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
      margin: 2rem 0;
      
      .fact-item {
        display: flex;
        gap: 1.5rem;
        align-items: flex-start;
        background: rgba($primary, 0.05);
        border-radius: $radius-sm;
        padding: 1.5rem;
        transition: transform 0.3s ease;
        
        &:hover {
          transform: translateY(-5px);
          background: rgba($primary, 0.1);
        }
        
        .fact-icon {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          background: rgba($primary, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: $primary;
        }
        
        .fact-content {
          h4 {
            font-size: 1.125rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: $dark;
          }
          
          p {
            margin-bottom: 0;
            font-size: 0.9375rem;
          }
        }
      }
    }
    
    .vision-list {
      list-style: none;
      padding: 0;
      margin: 1.5rem 0;
      
      li {
        position: relative;
        padding-left: 1.75rem;
        margin-bottom: 0.75rem;
        color: $gray;
        
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.5rem;
          width: 8px;
          height: 8px;
          background: $primary;
          border-radius: 50%;
        }
      }
    }
  }
  
  .about-visual {
    position: relative;
    height: 100%;
    
    @media (max-width: 1024px) {
      margin-top: 3rem;
      height: 400px;
    }
    
    .illustration-container {
      position: relative;
      width: 100%;
      height: 500px;
      border-radius: $radius-lg;
      overflow: hidden;
      box-shadow: $shadow-md;
      
      @media (max-width: 1024px) {
        height: 400px;
      }
      
      .illustration-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .floating-elements {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        
        .floating-element {
          position: absolute;
          width: 40px;
          height: 40px;
          color: $white;
          animation: float 6s ease-in-out infinite;
          
          &.element-1 {
            top: 15%;
            left: 10%;
            animation-delay: 0s;
          }
          
          &.element-2 {
            top: 60%;
            left: 80%;
            animation-delay: 1s;
          }
          
          &.element-3 {
            top: 30%;
            left: 70%;
            animation-delay: 2s;
          }
        }
      }
    }
  }
}

@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

/* Process/How It Works Section */
.process-section {
  padding: 6rem 0;
  background: $light-gray;
  
  .process-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      
      .step {
        display: flex;
        align-items: flex-start;
        gap: 1.5rem;
        text-align: left;
        
        .step-number {
          margin-bottom: 0;
        }
      }
    }
    
    .step {
      background: $white;
      border-radius: $radius-md;
      padding: 2rem;
      box-shadow: $shadow-sm;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: $shadow-md;
      }
      
      .step-number {
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: $primary;
        color: $white;
        font-size: 1.5rem;
        font-weight: 700;
        border-radius: 50%;
        margin-bottom: 1.5rem;
      }
      
      .step-content {
        h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: $dark;
        }
        
        p {
          color: $gray;
          font-size: 0.9375rem;
        }
      }
    }
  }
  
  .process-visual {
    position: relative;
    height: 100px;
    margin: 0 auto;
    max-width: 800px;
    
    .timeline {
      position: relative;
      height: 100%;
      width: 100%;
      
      &-line {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 4px;
        background: rgba($primary, 0.2);
        transform: translateY(-50%);
      }
      
      &-dots {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        display: flex;
        justify-content: space-between;
        
        .dot {
          width: 20px;
          height: 20px;
          background: $primary;
          border-radius: 50%;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          box-shadow: 0 0 0 8px rgba($primary, 0.2);
        }
      }
    }
  }
}

/* Mission Section */
.mission-section {
  padding: 6rem 0;
  background: $white;
  
  .mission-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    
    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }
  
  .mission-text {
    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 2rem 0 1rem;
      color: $primary-dark;
      
      &:first-child {
        margin-top: 0;
      }
    }
    
    p {
      color: $gray;
      margin-bottom: 1.5rem;
      line-height: 1.7;
    }
    
    .mission-features {
      list-style: none;
      padding: 0;
      margin: 2rem 0;
      
      li {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1rem;
        
        svg {
          flex-shrink: 0;
          color: $primary;
          margin-top: 0.25rem;
        }
        
        span {
          color: $dark;
          
          strong {
            color: $primary-dark;
          }
        }
      }
    }
    
    .impact-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin: 2.5rem 0;
      
      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
      
      .impact-stat {
        background: rgba($primary, 0.05);
        border-radius: $radius-sm;
        padding: 1.5rem;
        text-align: center;
        
        .stat-value {
          font-size: 2.25rem;
          font-weight: 800;
          color: $primary;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        
        .stat-desc {
          font-size: 0.9375rem;
          color: $gray;
        }
      }
    }
    
    .mission-closing {
      font-size: 1.125rem;
      font-weight: 500;
      color: $dark;
      border-left: 4px solid $primary;
      padding-left: 1.5rem;
    }
  }
  
  .mission-visual {
    position: relative;
    height: 100%;
    
    @media (max-width: 1024px) {
      height: 400px;
    }
    
    .animated-illustration {
      position: relative;
      width: 100%;
      height: 500px;
      border-radius: $radius-lg;
      overflow: hidden;
      box-shadow: $shadow-md;
      
      @media (max-width: 1024px) {
        height: 400px;
      }
      
      .mission-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .circle-layer {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: radial-gradient(circle at 30% 50%, rgba($primary, 0.1) 0%, transparent 50%);
        animation: pulse 8s ease-in-out infinite;
      }
      
      .testimonial-bubble {
        position: absolute;
        bottom: 2rem;
        right: 2rem;
        max-width: 280px;
        background: rgba($white, 0.95);
        border-radius: $radius-md;
        padding: 1.5rem;
        box-shadow: $shadow-md;
        transform: translateY(20px);
        opacity: 0;
        animation: fadeInUp 1s ease-out 0.5s forwards;
        
        @media (max-width: 768px) {
          max-width: 220px;
          padding: 1rem;
          bottom: 1rem;
          right: 1rem;
        }
        
        .bubble-content {
          font-size: 0.9375rem;
          color: $dark;
          line-height: 1.6;
        }
        
        .bubble-author {
          font-weight: 600;
          margin-top: 0.5rem;
          color: $primary;
          font-size: 0.875rem;
        }
        
        &::after {
          content: '';
          position: absolute;
          bottom: -10px;
          right: 30px;
          border-width: 10px 10px 0;
          border-style: solid;
          border-color: rgba($white, 0.95) transparent transparent;
        }
      }
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* Team Section */
.team-section {
  padding: 6rem 0;
  background: $light-gray;
  
  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
    
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
    
    .team-card {
      perspective: 1000px;
      
      .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.6s;
        transform-style: preserve-3d;
        box-shadow: $shadow-md;
        border-radius: $radius-md;
        overflow: hidden;
        background: $white;
        
        &:hover {
          transform: translateY(-10px);
          box-shadow: $shadow-lg;
        }
      }
      
      .member-photo {
        position: relative;
        height: 300px;
        overflow: hidden;
        
        @media (max-width: 480px) {
          height: 250px;
        }
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
          
          &:hover {
            transform: scale(1.1);
          }
        }
        
        .social-links {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 1rem;
          background: linear-gradient(to top, rgba($dark, 0.7), transparent);
          display: flex;
          gap: 1rem;
          justify-content: center;
          
          a {
            color: $white;
            width: 2.5rem;
            height: 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba($white, 0.2);
            border-radius: 50%;
            transition: all 0.3s;
            
            &:hover {
              background: $primary;
              transform: translateY(-3px);
            }
          }
        }
      }
      
      .member-info {
        padding: 1.5rem;
        
        h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        
        .role {
          display: block;
          color: $primary;
          font-weight: 600;
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }
        
        p {
          color: $gray;
          font-size: 0.9375rem;
        }
      }
    }
  }
}

/* Values Section */
.values-section {
  padding: 6rem 0;
  background: $white;
  
  .values-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
    
    @media (max-width: 640px) {
      grid-template-columns: 1fr 1fr;
    }
    
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
    
    .value-card {
      background: $white;
      border-radius: $radius-md;
      padding: 2rem;
      box-shadow: $shadow-sm;
      transition: all 0.3s;
      text-align: center;
      
      &:hover {
        transform: translateY(-10px);
        box-shadow: $shadow-lg;
      }
      
      .icon-container {
        width: 5rem;
        height: 5rem;
        margin: 0 auto 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba($primary, 0.1);
        color: $primary;
        border-radius: $radius-sm;
        
        svg {
          width: 2rem;
          height: 2rem;
        }
      }
      
      h3 {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      
      p {
        color: $gray;
        font-size: 0.9375rem;
      }
    }
  }
}

/* CTA Section */
.cta-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, $primary 0%, $primary-dark 100%);
  color: $white;
  
  .cta-card {
    max-width: 800px;
    margin: 0 auto;
    background: $white;
    border-radius: $radius-md;
    padding: 4rem;
    box-shadow: $shadow-lg;
    text-align: center;
    color: $dark;
    
    @media (max-width: 768px) {
      padding: 2rem;
    }
    
    h2 {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 1rem;
    }
    
    p {
      font-size: 1.125rem;
      color: $gray;
      margin-bottom: 2rem;
    }
    
    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      
      @media (max-width: 768px) {
        flex-direction: column;
      }
    }
  }
}

/* Animations */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.5; }
}
</style>