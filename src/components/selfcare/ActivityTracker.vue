<template>
    <div class="activity-tracker">
      <h2 v-if="!showExtended">Your Self-Care Activity</h2>
      <h2 v-else>Self-Care Journey</h2>
      
      <div class="tracker-header">
        <div class="streak">
          <div class="streak-count">{{ currentStreak }}</div>
          <div class="streak-label">day streak</div>
        </div>
        
        <div class="stats">
          <div class="stat-item">
            <div class="stat-value">{{ weeklyActivities }}</div>
            <div class="stat-label">this week</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ monthlyActivities }}</div>
            <div class="stat-label">this month</div>
          </div>
        </div>
      </div>
      
      <div class="calendar" v-if="showExtended">
        <div class="calendar-header">
          <button @click="prevMonth" class="btn-icon">
            <i class="icon-arrow-left"></i>
          </button>
          <div class="month-name">
            {{ currentMonthName }} {{ currentYear }}
          </div>
          <button @click="nextMonth" class="btn-icon">
            <i class="icon-arrow-right"></i>
          </button>
        </div>
        
        <div class="calendar-grid">
          <div class="day-name" v-for="day in dayNames" :key="day">
            {{ day }}
          </div>
          <div 
            v-for="day in calendarDays" 
            :key="day.date" 
            class="calendar-day"
            :class="{ 
              'current-month': day.isCurrentMonth,
              'has-activity': day.hasActivity,
              'today': day.isToday
            }"
            @click="showDayActivities(day)"
          >
            <div class="day-number">{{ day.dayNumber }}</div>
            <div v-if="day.hasActivity" class="activity-dot"></div>
          </div>
        </div>
      </div>
      
      <div class="activity-list" v-if="showExtended && selectedDay">
        <h3>Activities on {{ selectedDay.formattedDate }}</h3>
        <ul>
          <li v-for="activity in selectedDay.activities" :key="activity.id">
            {{ activity.name }} - {{ activity.duration }} mins
          </li>
        </ul>
      </div>
      
      <div class="quick-add" v-if="!showExtended">
        <h3>Quick Add Activity</h3>
        <div class="quick-actions">
          <button 
            v-for="activity in quickActivities" 
            :key="activity.id"
            @click="addActivity(activity)"
            class="btn-outline"
          >
            {{ activity.name }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showExtended: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentStreak: 7,
        weeklyActivities: 4,
        monthlyActivities: 15,
        currentDate: new Date(),
        selectedDay: null,
        quickActivities: [
          { id: 1, name: 'Meditation', duration: 10 },
          { id: 2, name: 'Journaling', duration: 5 },
          { id: 3, name: 'Breathing', duration: 3 },
          { id: 4, name: 'Stretching', duration: 5 }
        ],
        dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        activities: [
          // Sample data - in a real app, this would come from the backend
          { id: 1, date: '2023-06-15', name: 'Meditation', duration: 10 },
          { id: 2, date: '2023-06-15', name: 'Journaling', duration: 5 },
          { id: 3, date: '2023-06-18', name: 'Breathing', duration: 3 },
          { id: 4, date: '2023-06-20', name: 'Stretching', duration: 5 },
          { id: 5, date: '2023-06-20', name: 'Gratitude', duration: 2 },
          { id: 6, date: '2023-06-22', name: 'Meditation', duration: 15 }
        ]
      }
    },
    computed: {
      currentMonth() {
        return this.currentDate.getMonth()
      },
      currentYear() {
        return this.currentDate.getFullYear()
      },
      currentMonthName() {
        return this.currentDate.toLocaleString('default', { month: 'long' })
      },
      calendarDays() {
        const year = this.currentYear
        const month = this.currentMonth
        
        // Get the first day of the month and how many days in the month
        const firstDay = new Date(year, month, 1)
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        
        // Get the day of the week for the first day (0-6)
        const firstDayOfWeek = firstDay.getDay()
        
        // Get the last day of the previous month
        const daysInPrevMonth = new Date(year, month, 0).getDate()
        
        // Create array of days for the calendar
        const days = []
        
        // Add days from previous month
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
          const day = daysInPrevMonth - i
          const date = new Date(year, month - 1, day).toISOString().split('T')[0]
          days.push({
            date,
            dayNumber: day,
            isCurrentMonth: false,
            hasActivity: this.hasActivity(date),
            isToday: this.isToday(date),
            activities: this.getActivitiesForDate(date)
          })
        }
        
        // Add days from current month
        for (let i = 1; i <= daysInMonth; i++) {
          const date = new Date(year, month, i).toISOString().split('T')[0]
          days.push({
            date,
            dayNumber: i,
            isCurrentMonth: true,
            hasActivity: this.hasActivity(date),
            isToday: this.isToday(date),
            activities: this.getActivitiesForDate(date),
            formattedDate: new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })
          })
        }
        
        // Add days from next month to complete the grid (6 rows)
        const totalDays = days.length
        const remainingDays = 42 - totalDays // 6 weeks
        
        for (let i = 1; i <= remainingDays; i++) {
          const date = new Date(year, month + 1, i).toISOString().split('T')[0]
          days.push({
            date,
            dayNumber: i,
            isCurrentMonth: false,
            hasActivity: this.hasActivity(date),
            isToday: this.isToday(date),
            activities: this.getActivitiesForDate(date)
          })
        }
        
        return days
      }
    },
    methods: {
      hasActivity(date) {
        return this.activities.some(activity => activity.date === date)
      },
      isToday(date) {
        const today = new Date().toISOString().split('T')[0]
        return date === today
      },
      getActivitiesForDate(date) {
        return this.activities.filter(activity => activity.date === date)
      },
      prevMonth() {
        this.currentDate = new Date(this.currentYear, this.currentMonth - 1, 1)
        this.selectedDay = null
      },
      nextMonth() {
        this.currentDate = new Date(this.currentYear, this.currentMonth + 1, 1)
        this.selectedDay = null
      },
      showDayActivities(day) {
        if (day.hasActivity) {
          this.selectedDay = day
        }
      },
      addActivity(activity) {
        const today = new Date().toISOString().split('T')[0]
        const newActivity = {
          id: Date.now(),
          date: today,
          name: activity.name,
          duration: activity.duration
        }
        
        this.activities.push(newActivity)
        this.$toast.success(`${activity.name} activity added`)
        
        // Update stats
        this.weeklyActivities++
        this.monthlyActivities++
        
        // Check if this maintains or increases streak
        // In a real app, this would be more sophisticated
        this.currentStreak++
      }
    }
  }
  </script>
  
  <style scoped lang="scss">
  .activity-tracker {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    
    h2 {
      color: $dark;
      margin-bottom: 20px;
    }
  }
  
  .tracker-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .streak {
    text-align: center;
    margin-right: 30px;
    
    .streak-count {
      font-size: 2.5rem;
      font-weight: 700;
      color: $primary;
      line-height: 1;
    }
    
    .streak-label {
      font-size: 0.9rem;
      color: $gray;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
  
  .stats {
    display: flex;
    gap: 20px;
    
    .stat-item {
      text-align: center;
      
      .stat-value {
        font-size: 1.5rem;
        font-weight: 600;
        color: $dark;
        line-height: 1;
        margin-bottom: 5px;
      }
      
      .stat-label {
        font-size: 0.9rem;
        color: $gray;
      }
    }
  }
  
  .calendar {
    margin-top: 30px;
  }
  
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    
    .month-name {
      font-weight: 600;
      color: $dark;
      font-size: 1.2rem;
    }
    
    .btn-icon {
      background: none;
      border: none;
      color: $gray;
      cursor: pointer;
      font-size: 1.2rem;
      padding: 5px;
      
      &:hover {
        color: $primary;
      }
    }
  }
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }
  
  .day-name {
    text-align: center;
    font-weight: 600;
    color: $dark;
    font-size: 0.9rem;
    padding: 5px;
  }
  
  .calendar-day {
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    
    &.current-month {
      background: #f9f9f9;
      
      &:hover {
        background: #f0f0f0;
      }
    }
    
    &.has-activity {
      background: rgba($primary, 0.1);
      
      &:hover {
        background: rgba($primary, 0.2);
      }
    }
    
    &.today {
      border: 1px solid $primary;
    }
    
    .day-number {
      font-size: 0.9rem;
      color: $dark;
    }
    
    .activity-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: $primary;
      margin-top: 3px;
    }
  }
  
  .activity-list {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    
    h3 {
      color: $dark;
      margin-bottom: 15px;
      font-size: 1.1rem;
    }
    
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      
      li {
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;
        color: $gray;
        
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
  
  .quick-add {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    
    h3 {
      color: $dark;
      margin-bottom: 15px;
      font-size: 1.1rem;
    }
  }
  
  .quick-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    
    .btn-outline {
      padding: 8px 15px;
      font-size: 0.9rem;
    }
  }
  
  @media (max-width: 600px) {
    .tracker-header {
      flex-direction: column;
      align-items: flex-start;
      
      .streak {
        margin-right: 0;
        margin-bottom: 20px;
      }
    }
    
    .calendar-grid {
      gap: 2px;
    }
    
    .quick-actions {
      grid-template-columns: 1fr 1fr;
    }
  }
  </style>