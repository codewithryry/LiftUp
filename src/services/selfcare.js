const selfCareResources = [
    {
      id: 1,
      title: "Deep Breathing Exercise",
      description: "Take 5 deep breaths, inhaling for 4 seconds and exhaling for 6 seconds.",
      categories: ['mindfulness', 'physical'],
      type: 'meditation',
      duration: "under5",
      popularity: 850,
      date: "2023-05-15T10:30:00Z"
    },
    {
      id: 2,
      title: "Gratitude Journaling",
      description: "Write down 3 things you're grateful for today.",
      categories: ['emotional'],
      type: 'journaling',
      duration: "5to15",
      popularity: 720,
      date: "2023-06-20T14:15:00Z"
    },
    {
      id: 3,
      title: "Stretch Break",
      description: "Stand up and stretch your body for a few minutes.",
      categories: ['physical'],
      type: 'exercise',
      duration: "under5",
      popularity: 920,
      date: "2023-07-10T08:45:00Z"
    },
    {
      id: 4,
      title: "Call a Friend",
      description: "Reach out to someone you care about for a quick chat.",
      categories: ['social'],
      type: 'routine',
      duration: "15to30",
      popularity: 680,
      date: "2023-08-05T16:20:00Z"
    },
    {
      id: 5,
      title: "Mindful Coloring",
      description: "Spend some time coloring to relax your mind.",
      categories: ['creative', 'mindfulness'],
      type: 'tool',
      duration: "15to30",
      popularity: 790,
      date: "2023-09-12T11:10:00Z"
    },
    {
      id: 6,
      title: "Positive Affirmations",
      description: "Repeat positive statements about yourself in the mirror.",
      categories: ['emotional'],
      type: 'routine',
      duration: "under5",
      popularity: 880,
      date: "2023-10-18T09:30:00Z"
    },
    {
      id: 7,
      title: "Digital Detox",
      description: "Take 30 minutes away from all screens.",
      categories: ['professional', 'mindfulness'],
      type: 'challenge',
      duration: "over30",
      popularity: 750,
      date: "2023-11-22T13:45:00Z"
    },
    {
      id: 8,
      title: "Nature Walk",
      description: "Take a 15-minute walk outside and observe nature.",
      categories: ['physical', 'mindfulness'],
      type: 'exercise',
      duration: "15to30",
      popularity: 910,
      date: "2023-12-05T07:30:00Z"
    }
  ];
  
  // Simulate API call with delay
  export const fetchSelfCareResources = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...selfCareResources]);
      }, 800); // 0.8 second delay to simulate network request
    });
  };