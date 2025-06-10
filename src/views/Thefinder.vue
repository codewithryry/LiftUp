<template>
  <div class="therapist-finder-container">
    <!-- Modal for Service Not Working -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Service Unavailable</h3>
        <p>We're sorry, the Therapist Finder is currently not working. Please try again later or contact support for assistance.</p>
        <div class="modal-actions">
          <router-link to="/emergency" class="modal-emergency-btn">
            <i class=""></i> Back to Emergency Resources
          </router-link>
        </div>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="finder-hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">Find a Therapist</h1>
        <p class="hero-subtitle">Connect with licensed mental health professionals tailored to your needs</p>
        <div class="search-form">
          <form @submit.prevent="searchTherapists">
            <div class="search-grid">
              <div class="input-group">
                <label for="location">Location</label>
                <input
                  v-model="searchQuery.location"
                  type="text"
                  id="location"
                  placeholder="Enter city or ZIP code"
                  class="search-input"
                />
              </div>
              <div class="input-group">
                <label for="specialization">Specialization</label>
                <select v-model="searchQuery.specialization" id="specialization" class="search-input">
                  <option value="">All Specializations</option>
                  <option value="anxiety">Anxiety</option>
                  <option value="depression">Depression</option>
                  <option value="trauma">Trauma/PTSD</option>
                  <option value="relationships">Relationships</option>
                  <option value="lgbtq">LGBTQ+ Issues</option>
                </select>
              </div>
            </div>
            <!-- <button type="submit" class="search-btn">
              <i class="fas fa-search"></i> Search Therapists
            </button> -->
          </form>
        </div>
      </div>
    </section>

    <!-- Therapist Results Section -->
    <section class="therapist-results" v-if="therapists.length || isLoading || error">
      <div class="section-header">
        <h2><i class="fas fa-user-md"></i> Therapist Results</h2>
        <p v-if="!isLoading && !error">Found {{ therapists.length }} therapists matching your criteria</p>
        <p v-if="isLoading">Loading therapists...</p>
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>
      <div class="card-grid">
        <div
          v-for="(therapist, index) in therapists"
          :key="index"
          class="resource-card"
          :style="{ '--delay': index * 0.1 + 's' }"
        >
          <div class="card-icon">
            <img
              :src="therapist.photo || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'"
              alt="Therapist photo"
            />
          </div>
          <h3>{{ therapist.name || 'Therapist Name' }}</h3>
          <p>{{ therapist.specialization || 'General Therapy' }}</p>
          <p class="therapist-details">{{ therapist.location || 'Location not specified' }}</p>
          <a
            :href="therapist.profileLink || '#'"
            target="_blank"
            class="resource-link"
            @click="trackTherapistClick(therapist.name)"
          >
            View Profile <i class="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="emergency-footer">
      <div class="footer-content">
        <div class="footer-message">
          <p>Find the right support for your mental health journey.</p>
        </div>
        <div class="footer-cta">
          <p>Need immediate assistance?</p>
          <div v-if="emergencyResources.length" class="emergency-resources">
            <div v-for="(resource, index) in emergencyResources" :key="index" class="emergency-resource">
              <a :href="resource.link" class="footer-call-btn">
                <i :class="resource.icon"></i> {{ resource.name }}
              </a>
            </div>
          </div>
          <p v-else-if="isLoadingEmergency">Loading emergency resources...</p>
          <p v-else-if="emergencyError" class="error-message">{{ emergencyError }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
// Mock emergency data
const mockEmergencyResources = [
  {
    name: 'National Suicide Prevention Lifeline',
    link: 'tel:988',
    icon: 'fas fa-phone',
    description: '24/7 crisis support',
  },
  {
    name: 'Crisis Text Line',
    link: 'sms:741741',
    icon: 'fas fa-sms',
    description: 'Text HOME to 741741 for support',
  },
  {
    name: 'SAMHSA National Helpline',
    link: 'tel:1-800-662-4357',
    icon: 'fas fa-phone',
    description: 'Substance abuse and mental health support',
  },
];

// Mock therapist data
const mockTherapists = [
  {
    name: 'Dr. Jane Smith',
    specializations: ['Anxiety', 'Depression'],
    city: 'New York',
    state: 'NY',
    profile_url: 'https://example.com/profiles/jane-smith',
    photo_url: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    name: 'Dr. Michael Chen',
    specializations: ['Trauma/PTSD', 'Relationships'],
    city: 'Los Angeles',
    state: 'CA',
    profile_url: 'https://example.com/profiles/michael-chen',
    photo_url: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    name: 'Dr. Emily Rodriguez',
    specializations: ['LGBTQ+ Issues', 'Anxiety'],
    city: 'Chicago',
    state: 'IL |           ^',
    profile_url: 'https://example.com/profiles/emily-rodriguez',
    photo_url: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
];

export default {
  data() {
    return {
      searchQuery: {
        location: '',
        specialization: '',
        insurance: '',
      },
      therapists: [],
      isLoading: false,
      error: null,
      showModal: false,
      apiBaseUrl: 'https://www.betterhelp.com/api/v1',
      apiToken: null,
      emergencyResources: [],
      isLoadingEmergency: false,
      emergencyError: null,
    };
  },
  methods: {
    async authenticate() {
      // Simulate authentication failure to trigger modal
      this.showModal = true;
      return false;
    },
    async searchTherapists() {
      this.isLoading = true;
      this.error = null;
      this.therapists = [];

      // Simulate API failure
      const simulateApiFailure = true;

      if (simulateApiFailure) {
        this.error = 'Therapist Finder is currently not working.';
        this.showModal = true;
        this.isLoading = false;
        return;
      }

      try {
        // Mock API response
        await new Promise((resolve) => setTimeout(resolve, 1000));
        let filteredTherapists = mockTherapists;

        // Apply filters based on search query
        if (this.searchQuery.location) {
          const location = this.searchQuery.location.toLowerCase();
          filteredTherapists = filteredTherapists.filter(
            (therapist) =>
              therapist.city.toLowerCase().includes(location) ||
              therapist.state.toLowerCase().includes(location)
          );
        }

        if (this.searchQuery.specialization) {
          filteredTherapists = filteredTherapists.filter((therapist) =>
            therapist.specializations.includes(this.searchQuery.specialization)
          );
        }

        if (this.searchQuery.insurance) {
          // Mock insurance filter
          filteredTherapists = filteredTherapists.filter(() => true);
        }

        this.therapists = filteredTherapists.map((therapist) => ({
          name: therapist.name,
          specialization: therapist.specializations?.join(', ') || 'General Therapy',
          location: therapist.city && therapist.state ? `${therapist.city}, ${therapist.state}` : 'Unknown Location',
          profileLink: therapist.profile_url || '#',
          photo: therapist.photo_url || null,
        }));
      } catch (error) {
        this.error = 'Error fetching therapist data. Please try again later.';
        this.showModal = true;
        console.error('Mock API error:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchEmergencyResources() {
      this.isLoadingEmergency = true;
      this.emergencyError = null;

      try {
        // Simulate fetching from /emergency endpoint
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
        this.emergencyResources = mockEmergencyResources;
      } catch (error) {
        this.emergencyError = 'Error fetching emergency resources. Please try again later.';
        console.error('Mock emergency API error:', error);
      } finally {
        this.isLoadingEmergency = false;
      }
    },
    trackTherapistClick(name) {
      console.log(`Therapist profile clicked: ${name}`);
      // Add analytics tracking here
    },
    closeModal() {
      this.showModal = false;
    },
  },
  created() {
    // Authenticate and fetch emergency resources on component mount
    this.authenticate();
    this.fetchEmergencyResources();
  },
};
</script>

<style scoped>
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