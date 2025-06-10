<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section brand-section">
          <div class="logo-container">
            <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>
  <path d="M12 2V12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  <path d="M12 12L20 7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  <path d="M12 12L4 7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  <path d="M12 12L12 22" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
</svg>
            <h3>LIFTUP</h3>
          </div>
          <p class="brand-description">A community-driven platform for mental health support and resources.</p>
          <div class="social-links">
            <a href="#" aria-label="Facebook">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div class="footer-section links-section">
          <h4 class="section-title">Quick Links</h4>
          <ul class="footer-links">
            <li><router-link to="/resources">Mental Health Resources</router-link></li>
            <li><router-link to="/self-care">Self-Care Tools</router-link></li>
            <li><router-link to="/forum">Community Forum</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section contact-section">
          <h4 class="section-title">Contact Us</h4>
          <ul class="contact-info">
            <li class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 6l-10 7L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>support@liftup.com</span>
            </li>
            <li class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>(123) 456-7890</span>
            </li>
            <li class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24" fill="none">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>123 Wellness St, Manila City</span>
            </li>
          </ul>
        </div>
        <div class="footer-section support-section">
  <h4 class="section-title">Support Us</h4>
  <p class="support-text">Help us continue our mission to provide mental health resources to everyone.</p>
  <!-- <div class="github-links">
    <a href="https://github.com/codewithryry" target="_blank" rel="noopener noreferrer" class="github-link">
      <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
      <span>Creator</span>
    </a>
    <a href="https://github.com/codewithryry/LiftUp.git" target="_blank" rel="noopener noreferrer" class="github-link repo-link">
      <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.252-4.555-1.112-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.307.678.915.678 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
      <span>Repository</span>
    </a>
  </div> -->
  </div>
        </div>
      
      <div class="footer-bottom">
        <p class="copyright">&copy; 2025 LiftUp. All rights reserved.</p>
        <div class="legal-links">
          <router-link to="/privacy">Privacy Policy</router-link>
          <router-link to="/terms">Terms of Service</router-link>
          <router-link to="/cookies">Cookie Policy</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="scss">
.footer {
  background: white;
  color: #333;
  padding: 60px 0 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  overflow: hidden;
  box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.05);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}


.github-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
  
  .github-link {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #666;
    text-decoration: none;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    padding: 8px 12px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.03);
    
    &:hover {
      color: #333;
      background: rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
      
      .github-icon {
        color: #333;
      }
    }
    
    .github-icon {
      width: 18px;
      height: 18px;
    }
  }
  
  .repo-link {
    background: rgba(124, 58, 237, 0.05);
    
    &:hover {
      background: rgba(124, 58, 237, 0.1);
      
      .github-icon {
        color: #7C3AED;
      }
    }
  }
}
.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 50px;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

.footer-section {
  &.brand-section {
    .logo-container {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      
      .logo-icon {
        width: 32px;
        height: 32px;
        color: #7C3AED;
        margin-right: 12px;
      }
      
      h3 {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0;
        background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    }
    
    .brand-description {
      color: #666;
      line-height: 1.6;
      margin-bottom: 25px;
      font-size: 0.95rem;
    }
    
    .social-links {
      display: flex;
      gap: 16px;
      
      a {
        color: #666;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.05);
        
        &:hover {
          color: white;
          background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%);
          transform: translateY(-3px);
        }
        
        .social-icon {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
  
  &.links-section {
    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
      
      li {
        margin-bottom: 12px;
        
        a {
          color: #666;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
          position: relative;
          padding-left: 0;
          font-size: 0.95rem;
          
          &::before {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -2px;
            left: 0;
            background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%);
            transition: width 0.3s ease;
          }
          
          &:hover {
            color: #333;
            padding-left: 8px;
            
            &::before {
              width: 100%;
            }
          }
        }
      }
    }
  }
  
  &.contact-section {
    .contact-info {
      list-style: none;
      padding: 0;
      margin: 0;
      
      .contact-item {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        color: #666;
        transition: all 0.3s ease;
        font-size: 0.95rem;
        
        &:hover {
          color: #7C3AED;
          
          .contact-icon {
            color: #7C3AED;
          }
        }
        
        .contact-icon {
          width: 20px;
          height: 20px;
          margin-right: 12px;
          color: #666;
          flex-shrink: 0;
        }
        
        span {
          line-height: 1.4;
        }
      }
    }
  }
  
  &.support-section {
    .support-text {
      color: #666;
      margin-bottom: 20px;
      line-height: 1.6;
      font-size: 0.95rem;
    }
    
    .support-options {
      display: flex;
      flex-direction: column;
      gap: 12px;
      
      .support-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 16px;
        border-radius: 6px;
        font-weight: 500;
        text-decoration: none;
        transition: all 0.3s ease;
        font-size: 0.95rem;
        
        svg {
          width: 18px;
          height: 18px;
        }
        
        &.donate-btn {
          background-color: rgba(124, 58, 237, 0.1);
          color: #7C3AED;
          
          &:hover {
            background-color: rgba(124, 58, 237, 0.2);
            transform: translateY(-2px);
          }
        }
        
        &.volunteer-btn {
          background-color: rgba(16, 185, 129, 0.1);
          color: #10B981;
          
          &:hover {
            background-color: rgba(16, 185, 129, 0.2);
            transform: translateY(-2px);
          }
        }
      }
    }
  }
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 8px;
  color: #333;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%);
  }
}

.footer-bottom {
  border-top: 1px solid #eee;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .copyright {
    color: #999;
    font-size: 0.85rem;
    margin: 0;
  }
  
  .legal-links {
    display: flex;
    gap: 20px;
    
    @media (max-width: 600px) {
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
    }
    
    a {
      color: #666;
      text-decoration: none;
      font-size: 0.85rem;
      transition: all 0.3s ease;
      white-space: nowrap;
      
      &:hover {
        color: #7C3AED;
      }
    }
  }
}
</style>