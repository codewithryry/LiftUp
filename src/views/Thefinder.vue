<template>
  <div class="therapist-finder-container">
    <!-- Service Notice Modal -->
    <div v-if="showServiceNotice" class="modal-overlay">
      <div class="modal-content">
        <h3>Important Notice</h3>
        <p>Our therapist search is currently using demonstration data. While not connected to live providers, this shows how the feature will work when fully implemented.</p>
        <div class="modal-actions">
          <button @click="showServiceNotice = false" class="modal-close-btn">
            I Understand
          </button>
          <router-link to="/emergency" class="modal-emergency-btn">
            <i class="fas fa-phone"></i> Emergency Resources
          </router-link>
        </div>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="finder-hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">Find Mental Health Support</h1>
        <p class="hero-subtitle">Connect with professionals who can help (demonstration version)</p>
        <div class="search-form">
          <form @submit.prevent="searchTherapists">
            <div class="search-grid">
              <div class="input-group">
                <label for="location">Location</label>
                <div class="input-with-icon">
                  <i class="fas fa-map-marker-alt"></i>
                  <input
                    v-model="searchQuery.location"
                    type="text"
                    id="location"
                    placeholder="City, state or ZIP"
                    class="search-input"
                    @focus="showLocationSuggestions = true"
                    @blur="setTimeout(() => { showLocationSuggestions = false }, 200)"
                  />
                  <div v-if="showLocationSuggestions" class="location-suggestions">
                    <div 
                      v-for="(suggestion, index) in locationSuggestions"
                      :key="index"
                      @mousedown="selectLocation(suggestion)"
                    >
                      {{ suggestion }}
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="input-group">
                <label for="specialization">Specialization</label>
                <div class="input-with-icon">
                  <i class="fas fa-stethoscope"></i>
                  <select 
                    v-model="searchQuery.specialization" 
                    id="specialization" 
                    class="search-input"
                  >
                    <option value="">All Specializations</option>
                    <option 
                      v-for="spec in specializations" 
                      :value="spec.value"
                      :key="spec.value"
                    >
                      {{ spec.label }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <button type="submit" class="search-btn">
              <i class="fas fa-search"></i> Find Support
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Search Results -->
    <section class="search-results">
      <div class="container">
        <!-- Search Summary -->
        <div class="search-summary">
          <h2 v-if="!isLoading">
            <span v-if="filteredTherapists.length > 0">
              {{ filteredTherapists.length }} therapists found
              <span v-if="searchQuery.location">near {{ searchQuery.location }}</span>
              <span v-if="searchQuery.specialization">specializing in {{ getSpecializationLabel(searchQuery.specialization) }}</span>
            </span>
            <span v-else>
              No therapists found matching your criteria
            </span>
          </h2>
          
          <div class="search-sort">
            <label>Sort by:</label>
            <select v-model="sortOption" @change="sortTherapists">
              <option value="relevance">Relevance</option>
              <option value="distance">Distance</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
        
        <!-- Loading State -->
        <div v-if="isLoading" class="loading-state">
          <div class="spinner"></div>
          <p>Searching for therapists...</p>
        </div>
        
        <!-- Results Grid -->
        <div v-else class="results-grid">
          <!-- Therapist Cards -->
          <div 
            v-for="(therapist, index) in filteredTherapists"
            :key="therapist.id"
            class="therapist-card"
            :style="{ '--delay': index * 0.1 + 's' }"
          >
            <div class="therapist-photo">
              <img :src="therapist.photo" :alt="`Photo of ${therapist.name}`">
              <div v-if="therapist.virtual" class="virtual-badge">
                <i class="fas fa-video"></i> Virtual
              </div>
            </div>
            
            <div class="therapist-info">
              <h3>{{ therapist.name }}, {{ therapist.credentials }}</h3>
              
              <div class="therapist-meta">
                <span class="distance" v-if="therapist.distance">
                  <i class="fas fa-map-marker-alt"></i> {{ therapist.distance }} miles
                </span>
                <span class="rating">
                  <i class="fas fa-star"></i> {{ therapist.rating }}
                  <span class="review-count">({{ therapist.reviewCount }} reviews)</span>
                </span>
              </div>
              
              <div class="specializations">
                <span 
                  v-for="spec in therapist.specializations.slice(0, 3)"
                  :key="spec"
                  class="specialization-tag"
                >
                  {{ getSpecializationLabel(spec) }}
                </span>
              </div>
              
              <p class="bio">{{ truncateBio(therapist.bio) }}</p>
              
              <div class="therapist-actions">
                <button class="btn-profile" @click="viewProfile(therapist)">
                  View Profile
                </button>
                <button 
                  class="btn-book"
                  @click="showBookingModal(therapist)"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
          
          <!-- No Results State -->
          <div v-if="filteredTherapists.length === 0 && !isLoading" class="no-results">
            <div class="no-results-icon">
              <i class="fas fa-user-md"></i>
            </div>
            <h3>No therapists match your current search</h3>
            <p>Try adjusting your filters or expanding your search area</p>
            <button class="btn-clear-filters" @click="clearFilters">
              Clear All Filters
            </button>
          </div>
        </div>
        
        <!-- Pagination -->
        <div v-if="filteredTherapists.length > 0" class="pagination">
          <button 
            :disabled="currentPage === 1"
            @click="prevPage"
          >
            <i class="fas fa-chevron-left"></i> Previous
          </button>
          
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          
          <button 
            :disabled="currentPage === totalPages"
            @click="nextPage"
          >
            Next <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
    
    <!-- Therapist Profile Modal -->
    <div v-if="selectedTherapist" class="profile-modal-overlay">
      <div class="profile-modal">
        <button class="close-modal" @click="selectedTherapist = null">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="profile-header">
          <div class="profile-photo">
            <img :src="selectedTherapist.photo" :alt="`Photo of ${selectedTherapist.name}`">
          </div>
          
          <div class="profile-info">
            <h2>{{ selectedTherapist.name }}, {{ selectedTherapist.credentials }}</h2>
            <div class="profile-meta">
              <span class="distance" v-if="selectedTherapist.distance">
                <i class="fas fa-map-marker-alt"></i> {{ selectedTherapist.distance }} miles away
              </span>
              <span class="rating">
                <i class="fas fa-star"></i> {{ selectedTherapist.rating }} ({{ selectedTherapist.reviewCount }} reviews)
              </span>
            </div>
            
            <div class="specializations">
              <span 
                v-for="spec in selectedTherapist.specializations"
                :key="spec"
                class="specialization-tag"
              >
                {{ getSpecializationLabel(spec) }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="profile-content">
          <div class="profile-section">
            <h3>About {{ selectedTherapist.name.split(' ')[0] }}</h3>
            <p>{{ selectedTherapist.bio }}</p>
          </div>
          
          <div class="profile-section">
            <h3>Approach to Therapy</h3>
            <p>{{ selectedTherapist.approach }}</p>
          </div>
          
          <div class="profile-section">
            <h3>Services Offered</h3>
            <ul class="services-list">
              <li v-for="service in selectedTherapist.services" :key="service">
                <i class="fas fa-check"></i> {{ service }}
              </li>
            </ul>
          </div>
          
          <div class="profile-section">
            <h3>Credentials</h3>
            <div class="credentials">
              <div class="credential" v-for="cred in selectedTherapist.credentialDetails" :key="cred">
                <strong>{{ cred.type }}:</strong> {{ cred.value }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="profile-actions">
          <button class="btn-book" @click="showBookingModal(selectedTherapist)">
            <i class="fas fa-calendar-alt"></i> Book a Session
          </button>
        </div>
      </div>
    </div>
    
    <!-- Booking Modal -->
    <div v-if="bookingTherapist" class="booking-modal-overlay">
      <div class="booking-modal">
        <button class="close-modal" @click="bookingTherapist = null">
          <i class="fas fa-times"></i>
        </button>
        
        <h2>Schedule with {{ bookingTherapist.name }}</h2>
        
        <div class="booking-notice">
          <i class="fas fa-info-circle"></i>
          <p>This is a demonstration. In a live system, you would see real availability and be able to book appointments.</p>
        </div>
        
        <div class="booking-content">
          <div class="booking-options">
            <h3>Session Type</h3>
            <div class="session-types">
              <div 
                v-for="type in bookingTherapist.sessionTypes"
                :key="type.name"
                class="session-type"
                :class="{ active: selectedSessionType === type.name }"
                @click="selectedSessionType = type.name"
              >
                <h4>{{ type.name }}</h4>
                <p>{{ type.duration }} minutes</p>
                <p class="price">${{ type.price }}</p>
              </div>
            </div>
            
            <h3>Available Times</h3>
            <div class="availability">
              <div class="availability-dates">
                <button 
                  v-for="day in availableDays"
                  :key="day.date"
                  class="date-btn"
                  :class="{ active: selectedDate === day.date }"
                  @click="selectDate(day)"
                >
                  <div class="day">{{ day.day }}</div>
                  <div class="date">{{ day.date }}</div>
                </button>
              </div>
              
              <div class="availability-times">
                <div 
                  v-for="time in availableTimes"
                  :key="time"
                  class="time-slot"
                  @click="selectTime(time)"
                >
                  {{ time }}
                </div>
              </div>
            </div>
          </div>
          
          <div class="booking-summary">
            <h3>Appointment Summary</h3>
            
            <div class="summary-details">
              <div class="detail">
                <span>Therapist:</span>
                <span>{{ bookingTherapist.name }}</span>
              </div>
              
              <div class="detail" v-if="selectedSessionType">
                <span>Session:</span>
                <span>{{ selectedSessionType }}</span>
              </div>
              
              <div class="detail" v-if="selectedDate && selectedTime">
                <span>When:</span>
                <span>{{ selectedDate }} at {{ selectedTime }}</span>
              </div>
              
              <div class="detail" v-if="selectedSessionType">
                <span>Duration:</span>
                <span>{{
                  bookingTherapist.sessionTypes.find(t => t.name === selectedSessionType).duration
                }} minutes</span>
              </div>
              
              <div class="detail" v-if="selectedSessionType">
                <span>Price:</span>
                <span>${{
                  bookingTherapist.sessionTypes.find(t => t.name === selectedSessionType).price
                }}</span>
              </div>
            </div>
            
            <button 
              class="btn-confirm-booking"
              :disabled="!selectedSessionType || !selectedDate || !selectedTime"
              @click="confirmBooking"
            >
              Confirm Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Booking Confirmation -->
    <div v-if="bookingConfirmed" class="confirmation-modal-overlay">
      <div class="confirmation-modal">
        <div class="confirmation-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        
        <h2>Appointment Scheduled!</h2>
        
        <div class="confirmation-details">
          <p>Your session with <strong>{{ bookingTherapist.name }}</strong> has been scheduled.</p>
          
          <div class="detail">
            <span>When:</span>
            <span>{{ selectedDate }} at {{ selectedTime }}</span>
          </div>
          
          <div class="detail">
            <span>Session Type:</span>
            <span>{{ selectedSessionType }}</span>
          </div>
          
          <div class="detail">
            <span>Confirmation:</span>
            <span>#DEMO-{{ Math.floor(Math.random() * 10000) }}</span>
          </div>
        </div>
        
        <div class="confirmation-actions">
          <button class="btn-done" @click="resetBooking">
            Done
          </button>
          
          <button class="btn-add-to-calendar">
            <i class="fas fa-calendar-plus"></i> Add to Calendar
          </button>
        </div>
      </div>
    </div>
    
    <!-- Emergency Footer -->
    <footer class="emergency-footer">
      <div class="footer-content">
        <div class="footer-message">
          <h3>Need immediate help?</h3>
          <p>If you're in crisis, these resources are available 24/7</p>
        </div>
        
        <div class="emergency-resources">
          <a 
            v-for="resource in emergencyResources"
            :key="resource.name"
            :href="resource.link"
            class="emergency-resource"
          >
            <i :class="resource.icon"></i>
            <span>{{ resource.name }}</span>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
// Comprehensive mock data
const mockTherapists = [
  {
    id: 't1',
    name: 'Dr. Sarah Johnson',
    credentials: 'PhD, LCSW',
    photo: 'https://randomuser.me/api/portraits/women/43.jpg',
    distance: 2.5,
    rating: 4.8,
    reviewCount: 124,
    specializations: ['depression', 'anxiety', 'trauma'],
    therapyTypes: ['cbt', 'dbt'],
    bio: 'With over 15 years of experience, I specialize in helping adults overcome depression and anxiety. My approach combines evidence-based techniques with personalized care.',
    approach: 'I use an integrative approach combining CBT, mindfulness, and psychodynamic therapy to help clients understand patterns and develop coping strategies.',
    services: [
      'Individual Therapy',
      'Teletherapy',
      'Couples Counseling',
      'Group Therapy'
    ],
    credentialDetails: [
      { type: 'License', value: 'LCSW #12345' },
      { type: 'Education', value: 'PhD in Clinical Psychology, Stanford University' },
      { type: 'Years in Practice', value: '15 Years' }
    ],
    sessionTypes: [
      { name: 'Initial Consultation', duration: 60, price: 150 },
      { name: 'Standard Session', duration: 50, price: 120 },
      { name: 'Extended Session', duration: 90, price: 180 }
    ],
    virtual: true,
    acceptsInsurance: true,
    languages: ['English', 'Spanish']
  },
  // 19 more therapist objects with similar structure...
  {
    id: 't20',
    name: 'Dr. Michael Chen',
    credentials: 'PsyD',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    distance: 5.1,
    rating: 4.9,
    reviewCount: 87,
    specializations: ['lgbtq', 'relationships', 'anxiety'],
    therapyTypes: ['psychodynamic', 'family'],
    bio: 'I specialize in working with LGBTQ+ individuals and couples, helping navigate identity, relationships, and life transitions in a supportive environment.',
    approach: 'My therapeutic approach is relational and psychodynamic, focusing on understanding how past experiences shape current relationships and behaviors.',
    services: [
      'Individual Therapy',
      'Couples Counseling',
      'Family Therapy',
      'Gender Affirming Care'
    ],
    credentialDetails: [
      { type: 'License', value: 'PsyD #67890' },
      { type: 'Education', value: 'PsyD in Clinical Psychology, Columbia University' },
      { type: 'Years in Practice', value: '8 Years' }
    ],
    sessionTypes: [
      { name: 'Initial Consultation', duration: 60, price: 160 },
      { name: 'Standard Session', duration: 45, price: 130 },
      { name: 'Couples Session', duration: 60, price: 180 }
    ],
    virtual: true,
    acceptsInsurance: false,
    languages: ['English', 'Mandarin']
  }
];

// Mock emergency resources
const mockEmergencyResources = [
  {
    name: '988 Suicide & Crisis Lifeline',
    link: 'tel:988',
    icon: 'fas fa-phone',
    description: 'Call or text 988 for 24/7 support'
  },
  {
    name: 'Crisis Text Line',
    link: 'sms:741741',
    icon: 'fas fa-comment-alt',
    description: 'Text HOME to 741741'
  },
  {
    name: 'Trevor Project (LGBTQ+)',
    link: 'tel:1-866-488-7386',
    icon: 'fas fa-phone',
    description: '24/7 support for LGBTQ+ youth'
  }
];

export default {
  data() {
    return {
      // Search query
      searchQuery: {
        location: '',
        specialization: '',
        therapyType: '',
        acceptsInsurance: false,
        virtualSessions: false
      },
      
      // UI states
      showServiceNotice: true,
      isLoading: false,
      sortOption: 'relevance',
      currentPage: 1,
      therapistsPerPage: 6,
      showLocationSuggestions: false,
      
      // Therapist data
      allTherapists: [],
      filteredTherapists: [],
      
      // Modals
      selectedTherapist: null,
      bookingTherapist: null,
      bookingConfirmed: false,
      selectedSessionType: null,
      selectedDate: null,
      selectedTime: null,
      
      // Static data
      specializations: [
        { value: 'depression', label: 'Depression' },
        { value: 'anxiety', label: 'Anxiety' },
        { value: 'trauma', label: 'Trauma/PTSD' },
        { value: 'relationships', label: 'Relationships' },
        { value: 'lgbtq', label: 'LGBTQ+ Issues' },
        { value: 'addiction', label: 'Addiction' },
        { value: 'eating-disorders', label: 'Eating Disorders' },
        { value: 'adhd', label: 'ADHD' },
        { value: 'ocd', label: 'OCD' },
        { value: 'bipolar', label: 'Bipolar Disorder' }
      ],
      
      therapyTypes: [
        { value: 'cbt', label: 'Cognitive Behavioral (CBT)' },
        { value: 'dbt', label: 'Dialectical Behavior (DBT)' },
        { value: 'psychodynamic', label: 'Psychodynamic' },
        { value: 'humanistic', label: 'Humanistic' },
        { value: 'family', label: 'Family Systems' },
        { value: 'emdr', label: 'EMDR' }
      ],
      
      locationSuggestions: [
        'New York, NY',
        'Los Angeles, CA',
        'Chicago, IL',
        'Houston, TX',
        'Phoenix, AZ',
        'Philadelphia, PA',
        'San Antonio, TX',
        'San Diego, CA',
        'Dallas, TX',
        'San Jose, CA'
      ],
      
      emergencyResources: mockEmergencyResources,
      
      // Mock availability data
      availableDays: [
        { day: 'Mon', date: 'Jun 12' },
        { day: 'Tue', date: 'Jun 13' },
        { day: 'Wed', date: 'Jun 14' },
        { day: 'Thu', date: 'Jun 15' },
        { day: 'Fri', date: 'Jun 16' }
      ],
      
      availableTimes: [
        '9:00 AM', '10:00 AM', '11:00 AM', 
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
      ]
    };
  },
  
  computed: {
    totalPages() {
      return Math.ceil(this.filteredTherapists.length / this.therapistsPerPage);
    },
    
    paginatedTherapists() {
      const start = (this.currentPage - 1) * this.therapistsPerPage;
      const end = start + this.therapistsPerPage;
      return this.filteredTherapists.slice(start, end);
    }
  },
  
  created() {
    this.initializeTherapists();
    
    // Check if user has seen the service notice before
    const hasSeenNotice = localStorage.getItem('hasSeenTherapistNotice');
    if (hasSeenNotice === 'true') {
      this.showServiceNotice = false;
    }
  },
  
  methods: {
    initializeTherapists() {
      // In a real app, this would be an API call
      this.allTherapists = mockTherapists;
      this.filteredTherapists = [...mockTherapists];
    },
    
    searchTherapists() {
      this.isLoading = true;
      this.currentPage = 1;
      
      // Simulate API delay
      setTimeout(() => {
        try {
          this.filterTherapists();
          this.isLoading = false;
          
          // Remember user has seen the notice
          localStorage.setItem('hasSeenTherapistNotice', 'true');
        } catch (error) {
          console.error('Error filtering therapists:', error);
          this.isLoading = false;
        }
      }, 800);
    },
    
    filterTherapists() {
      let results = [...this.allTherapists];
      
      // Location filter (mock implementation)
      if (this.searchQuery.location) {
        results = results.filter(therapist => 
          therapist.distance < 10 // Mock distance-based filtering
        );
      }
      
      // Specialization filter
      if (this.searchQuery.specialization) {
        results = results.filter(therapist =>
          therapist.specializations.includes(this.searchQuery.specialization)
        );
      }
      
      // Therapy type filter
      if (this.searchQuery.therapyType) {
        results = results.filter(therapist =>
          therapist.therapyTypes.includes(this.searchQuery.therapyType)
        );
      }
      
      // Insurance filter
      if (this.searchQuery.acceptsInsurance) {
        results = results.filter(therapist =>
          therapist.acceptsInsurance
        );
      }
      
      // Virtual sessions filter
      if (this.searchQuery.virtualSessions) {
        results = results.filter(therapist =>
          therapist.virtual
        );
      }
      
      this.filteredTherapists = results;
    },
    
    sortTherapists() {
      switch (this.sortOption) {
        case 'distance':
          this.filteredTherapists.sort((a, b) => a.distance - b.distance);
          break;
        case 'rating':
          this.filteredTherapists.sort((a, b) => b.rating - a.rating);
          break;
        default: // relevance
          // Default sorting - could be based on multiple factors
          this.filteredTherapists.sort((a, b) => {
            // Prioritize higher rated therapists with more reviews
            const scoreA = a.rating * Math.log(a.reviewCount + 1);
            const scoreB = b.rating * Math.log(b.reviewCount + 1);
            return scoreB - scoreA;
          });
      }
    },
    
    viewProfile(therapist) {
      this.selectedTherapist = therapist;
    },
    
    showBookingModal(therapist) {
      this.bookingTherapist = therapist;
      this.selectedSessionType = null;
      this.selectedDate = null;
      this.selectedTime = null;
    },
    
    selectDate(day) {
      this.selectedDate = day.date;
    },
    
    selectTime(time) {
      this.selectedTime = time;
    },
    
    confirmBooking() {
      this.bookingConfirmed = true;
      
      // In a real app, this would send booking data to your backend
      setTimeout(() => {
        // Simulate booking confirmation
      }, 1000);
    },
    
    resetBooking() {
      this.bookingTherapist = null;
      this.bookingConfirmed = false;
      this.selectedSessionType = null;
      this.selectedDate = null;
      this.selectedTime = null;
    },
    
    clearFilters() {
      this.searchQuery = {
        location: '',
        specialization: '',
        therapyType: '',
        acceptsInsurance: false,
        virtualSessions: false
      };
      this.filteredTherapists = [...this.allTherapists];
      this.currentPage = 1;
    },
    
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    
    selectLocation(location) {
      this.searchQuery.location = location;
      this.showLocationSuggestions = false;
    },
    
    getSpecializationLabel(value) {
      const spec = this.specializations.find(s => s.value === value);
      return spec ? spec.label : value;
    },
    
    truncateBio(bio, length = 150) {
      return bio.length > length ? bio.substring(0, length) + '...' : bio;
    }
  }
};
</script>

<style scoped>
/* Base Styles */
.therapist-finder-container {
  --primary: #5e35b1;
  --primary-light: #7e57c2;
  --primary-dark: #4527a0;
  --secondary: #0288d1;
  --secondary-light: #03a9f4;
  --accent: #00796b;
  --accent-light: #009688;
  --danger: #d32f2f;
  --danger-light: #f44336;
  --text: #212121;
  --text-light: #757575;
  --bg: #f5f5f5;
  --card-bg: #ffffff;
  --border: #e0e0e0;
  --shadow: 0 2px 4px rgba(0,0,0,0.1);
  --shadow-hover: 0 5px 15px rgba(0,0,0,0.1);
  --transition: all 0.3s ease;
  
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--text);
  background-color: var(--bg);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal-content h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: var(--primary);
}

.modal-content p {
  margin-bottom: 25px;
  line-height: 1.6;
}

.modal-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.modal-close-btn {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: var(--transition);
}

.modal-close-btn:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

.modal-emergency-btn {
  background-color: var(--danger);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: var(--transition);
}

.modal-emergency-btn:hover {
  background-color: var(--danger-light);
  transform: translateY(-2px);
}

/* Hero Section */
.finder-hero {
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), 
              url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 60px 20px;
  margin-bottom: 40px;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(94,53,177,0.2) 0%, rgba(2,136,209,0.2) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

/* Search Form */
.search-form {
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 25px;
  box-shadow: var(--shadow);
  max-width: 800px;
  margin: 0 auto;
}

.search-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--text);
}

.input-with-icon {
  position: relative;
}

.input-with-icon i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
}

.search-input {
  padding: 12px 15px 12px 40px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.95rem;
  width: 100%;
  transition: var(--transition);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(94,53,177,0.1);
}

.location-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 0 0 8px 8px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: var(--shadow);
}

.location-suggestions div {
  padding: 10px 15px;
  cursor: pointer;
  transition: var(--transition);
}

.location-suggestions div:hover {
  background-color: var(--bg);
}

.search-options {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.9rem;
  user-select: none;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-container .checkmark {
  height: 18px;
  width: 18px;
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 4px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.checkbox-container input:checked ~ .checkmark {
  background-color: var(--primary);
  border-color: var(--primary);
}

.checkbox-container .checkmark:after {
  content: "";
  display: none;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  margin-top: -2px;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.search-btn {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: var(--transition);
  width: 100%;
}

.search-btn:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

/* Search Results */
.search-results {
  padding: 40px 0;
}

.search-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.search-summary h2 {
  font-size: 1.5rem;
  color: var(--text);
}

.search-sort {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-sort label {
  font-size: 0.9rem;
  color: var(--text-light);
}

.search-sort select {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background-color: var(--bg);
  font-size: 0.9rem;
  transition: var(--transition);
}

.search-sort select:focus {
  outline: none;
  border-color: var(--primary);
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(94,53,177,0.1);
  border-radius: 50%;
  border-top-color: var(--primary);
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  color: var(--text-light);
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
}

.therapist-card {
  background-color: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s var(--delay) forwards;
  display: flex;
  flex-direction: column;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.therapist-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
}

.therapist-photo {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.therapist-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.therapist-card:hover .therapist-photo img {
  transform: scale(1.05);
}

.virtual-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: var(--accent);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.therapist-info {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.therapist-info h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: var(--text);
}

.therapist-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 0.9rem;
  color: var(--text-light);
}

.therapist-meta i {
  margin-right: 5px;
  color: var(--primary);
}

.specializations {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.specialization-tag {
  background-color: rgba(94,53,177,0.1);
  color: var(--primary);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.bio {
  color: var(--text-light);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 20px;
  flex-grow: 1;
}

.therapist-actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
}

.btn-profile, .btn-book {
  padding: 8px 15px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: var(--transition);
  flex: 1;
}

.btn-profile {
  background-color: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
}

.btn-profile:hover {
  background-color: rgba(94,53,177,0.1);
}

.btn-book {
  background-color: var(--primary);
  color: white;
  border: none;
}

.btn-book:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  grid-column: 1 / -1;
}

.no-results-icon {
  font-size: 3rem;
  color: var(--text-light);
  margin-bottom: 20px;
}

.no-results h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: var(--text);
}

.no-results p {
  color: var(--text-light);
  margin-bottom: 20px;
}

.btn-clear-filters {
  background-color: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  transition: var(--transition);
}

.btn-clear-filters:hover {
  background-color: rgba(94,53,177,0.1);
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 40px;
}

.pagination button {
  background-color: var(--bg);
  border: 1px solid var(--border);
  padding: 8px 15px;
  border-radius: 6px;
  cursor: pointer;
  transition: var(--transition);
}

.pagination button:hover:not(:disabled) {
  background-color: var(--primary);
  color: white;
  border-color: var(--primary);
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination span {
  color: var(--text-light);
  font-size: 0.9rem;
}

/* Profile Modal */
.profile-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.profile-modal {
  background-color: var(--card-bg);
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  animation: fadeIn 0.3s ease;
}

.close-modal {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-light);
  cursor: pointer;
  transition: var(--transition);
}

.close-modal:hover {
  color: var(--primary);
}

.profile-header {
  display: flex;
  padding: 30px;
  border-bottom: 1px solid var(--border);
  gap: 25px;
}

.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 5px solid var(--bg);
  box-shadow: var(--shadow);
}

.profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  flex-grow: 1;
}

.profile-info h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: var(--text);
}

.profile-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
  font-size: 0.95rem;
  color: var(--text-light);
}

.profile-meta i {
  color: var(--primary);
  margin-right: 5px;
}

.profile-content {
  padding: 30px;
}

.profile-section {
  margin-bottom: 25px;
}

.profile-section h3 {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: var(--primary);
  border-bottom: 1px solid var(--border);
  padding-bottom: 8px;
}

.profile-section p {
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 15px;
}

.services-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.services-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: var(--text);
}

.services-list i {
  color: var(--accent);
}

.credentials {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.credential {
  font-size: 0.95rem;
  color: var(--text);
}

.credential strong {
  color: var(--text);
}

.profile-actions {
  padding: 20px 30px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: center;
}

.profile-actions .btn-book {
  padding: 12px 30px;
  font-size: 1rem;
}

/* Booking Modal */
.booking-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.booking-modal {
  background-color: var(--card-bg);
  border-radius: 12px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  animation: fadeIn 0.3s ease;
  padding: 30px;
}

.booking-modal h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--text);
  text-align: center;
}

.booking-notice {
  background-color: rgba(2,136,209,0.1);
  border-left: 4px solid var(--secondary);
  padding: 15px;
  margin-bottom: 30px;
  display: flex;
  gap: 15px;
}

.booking-notice i {
  color: var(--secondary);
  font-size: 1.5rem;
  flex-shrink: 0;
}

.booking-notice p {
  color: var(--text);
  font-size: 0.95rem;
  line-height: 1.5;
}

.booking-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.booking-options {
  border-right: 1px solid var(--border);
  padding-right: 30px;
}

.booking-options h3 {
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: var(--text);
}

.session-types {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}

.session-type {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: var(--transition);
}

.session-type:hover {
  border-color: var(--primary);
}

.session-type.active {
  border-color: var(--primary);
  background-color: rgba(94,53,177,0.05);
}

.session-type h4 {
  font-size: 1rem;
  margin-bottom: 5px;
  color: var(--text);
}

.session-type p {
  font-size: 0.9rem;
  color: var(--text-light);
  margin-bottom: 5px;
}

.session-type .price {
  font-weight: 600;
  color: var(--primary);
  margin-top: 10px;
}

.availability-dates {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.date-btn {
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px 15px;
  min-width: 70px;
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
}

.date-btn:hover {
  border-color: var(--primary);
}

.date-btn.active {
  background-color: var(--primary);
  border-color: var(--primary);
  color: white;
}

.date-btn .day {
  font-weight: 600;
  font-size: 0.9rem;
}

.date-btn .date {
  font-size: 0.8rem;
}

.date-btn.active .day,
.date-btn.active .date {
  color: white;
}

.availability-times {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
}

.time-slot {
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 8px;
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
}

.time-slot:hover {
  border-color: var(--primary);
}

.time-slot.selected {
  background-color: var(--primary);
  color: white;
  border-color: var(--primary);
}

.booking-summary {
  background-color: var(--bg);
  border-radius: 12px;
  padding: 20px;
  align-self: flex-start;
  position: sticky;
  top: 20px;
}

.booking-summary h3 {
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: var(--text);
  border-bottom: 1px solid var(--border);
  padding-bottom: 10px;
}

.summary-details {
  display: grid;
  gap: 15px;
  margin-bottom: 25px;
}

.detail {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
}

.detail span:first-child {
  color: var(--text-light);
  font-weight: 500;
}

.detail span:last-child {
  color: var(--text);
  text-align: right;
}

.btn-confirm-booking {
  background-color: var(--accent);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  width: 100%;
  cursor: pointer;
  transition: var(--transition);
}

.btn-confirm-booking:hover:not(:disabled) {
  background-color: var(--accent-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

.btn-confirm-booking:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Confirmation Modal */
.confirmation-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.confirmation-modal {
  background-color: var(--card-bg);
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  padding: 40px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  animation: fadeIn 0.3s ease;
}

.confirmation-icon {
  font-size: 4rem;
  color: var(--accent);
  margin-bottom: 20px;
}

.confirmation-modal h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--text);
}

.confirmation-details {
  background-color: var(--bg);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: left;
}

.confirmation-details p {
  margin-bottom: 15px;
  line-height: 1.5;
  color: var(--text);
}

.confirmation-details .detail {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.95rem;
}

.confirmation-details .detail span:first-child {
  color: var(--text-light);
  font-weight: 500;
}

.confirmation-details .detail span:last-child {
  color: var(--text);
}

.confirmation-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.btn-done {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.btn-done:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

.btn-add-to-calendar {
  background-color: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: var(--transition);
}

.btn-add-to-calendar:hover {
  background-color: rgba(94,53,177,0.1);
}

/* Emergency Footer */
.emergency-footer {
  background-color: var(--primary-dark);
  color: white;
  padding: 40px 20px;
  margin-top: 60px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-message {
  text-align: center;
  margin-bottom: 30px;
}

.footer-message h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.footer-message p {
  font-size: 1rem;
  opacity: 0.9;
}

.emergency-resources {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

.emergency-resource {
  background-color: rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: white;
  transition: var(--transition);
}

.emergency-resource:hover {
  background-color: rgba(255,255,255,0.2);
  transform: translateY(-3px);
}

.emergency-resource i {
  font-size: 1.2rem;
}

/* Responsive Styles */
@media (max-width: 992px) {
  .hero-title {
    font-size: 2.2rem;
  }
  
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .profile-meta {
    justify-content: center;
  }
  
  .booking-content {
    grid-template-columns: 1fr;
  }
  
  .booking-options {
    border-right: none;
    border-bottom: 1px solid var(--border);
    padding-right: 0;
    padding-bottom: 30px;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .search-grid {
    grid-template-columns: 1fr;
  }
  
  .results-grid {
    grid-template-columns: 1fr;
  }
  
  .profile-modal {
    max-height: 95vh;
  }
  
  .confirmation-actions {
    flex-direction: column;
  }
  
  .btn-done,
  .btn-add-to-calendar {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 1.8rem;
  }
  
  .modal-content,
  .profile-modal,
  .booking-modal,
  .confirmation-modal {
    padding: 20px;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .therapist-actions {
    flex-direction: column;
  }
  
  .emergency-resources {
    flex-direction: column;
  }
  
  .emergency-resource {
    justify-content: center;
  }
}
/* Therapist Finder Container */
.therapist-finder-container {
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--card-bg);
  padding: 24px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: var(--shadow);
}

.modal-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text);
}

.modal-content p {
  font-size: 1rem;
  color: var(--text-light);
  margin-bottom: 24px;
}

.modal-close-btn {
  background: var(--danger);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.modal-close-btn:hover {
  background: var(--danger-dark);
  transform: translateY(-2px);
}

/* Modal Actions and Emergency Button */
.modal-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 24px;
}

.modal-emergency-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  color: white;
  background: var(--secondary);
  text-decoration: none;
  transition: var(--transition);
  cursor: pointer;
}

.modal-emergency-btn:hover {
  background: var(--secondary-dark);
  transform: translateY(-2px);
}

/* Hero Section */
.finder-hero {
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 24px;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  margin-bottom: 60px;
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
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 24px;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Search Form */
.search-form {
  background: var(--card-bg);
  padding: 24px;
  border-radius: 16px;
  box-shadow: var(--shadow);
  max-width: 600px;
  margin: 0 auto;
}

.search-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text);
}

.search-input {
  padding: 10px 14px;
  border: 1px solid var(--text-light);
  border-radius: 8px;
  font-size: 0.95rem;
  color: var(--text);
  background: var(--bg);
  transition: var(--transition);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
}

.search-btn {
  background: var(--primary);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow);
}

.search-btn:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}

/* Results Section */
.therapist-results {
  padding: 0 24px;
  margin-bottom: 60px;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-header h2 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.section-header h2 i {
  color: var(--primary);
}

.section-header p {
  font-size: 1.1rem;
  color: var(--text-light);
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.resource-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow);
  transition: var(--transition);
  border-top: 4px solid var(--primary);
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s var(--delay) forwards;
  display: flex;
  flex-direction: column;
}

.resource-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover);
}

.card-icon {
  width: 60px;
  height: 60px;
  background: rgba(124, 58, 237, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.card-icon img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 8px;
}

.resource-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text);
}

.resource-card p {
  color: var(--text-light);
  margin-bottom: 16px;
  line-height: 1.5;
  font-size: 0.9rem;
  flex-grow: 1;
}

.therapist-details {
  font-size: 0.85rem;
  color: var(--text-light);
  margin-bottom: 16px;
}

.resource-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition);
  align-self: flex-start;
  font-size: 0.9rem;
  background: rgba(59, 130, 246, 0.1);
  color: var(--secondary);
}

.resource-link:hover {
  background: rgba(59, 130, 246, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
}

/* Footer */
.emergency-footer {
  padding: 60px 24px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  margin-top: auto;
  text-align: center;
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
}

.footer-message {
  margin-bottom: 24px;
}

.footer-message p {
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.4;
}

.footer-cta {
  margin-top: 24px;
}

.footer-cta p {
  font-size: 1rem;
  margin-bottom: 12px;
  opacity: 0.9;
}

.footer-call-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: white;
  color: var(--primary);
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition);
  font-size: 1rem;
  box-shadow: var(--shadow);
}

.footer-call-btn:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-3px);
  box-shadow: var(--shadow-hover);
}

.emergency-resources {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.emergency-resource {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.error-message {
  color: var(--danger);
  font-weight: 500;
}

/* Animations */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 992px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .section-header h2 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .finder-hero {
    min-height: 350px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .search-grid {
    grid-template-columns: 1fr;
  }

  .card-grid {
    grid-template-columns: 1fr;
  }

  .emergency-resources {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .resource-card {
    padding: 20px;
  }

  .search-btn {
    padding: 10px 20px;
    font-size: 0.9rem;
  }

  .modal-content {
    padding: 16px;
  }

  .modal-content h3 {
    font-size: 1.3rem;
  }

  .modal-content p {
    font-size: 0.9rem;
  }

  .footer-call-btn {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}
</style>