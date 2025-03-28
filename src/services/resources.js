export const fetchResources = async () => {
  return Promise.resolve([
    {
      id: '1',
      title: 'Understanding Depression',
      description: 'A comprehensive guide to recognizing and managing depressive symptoms.',
      type: 'article',
      categories: ['depression'],
      url: 'https://www.helpguide.org/articles/depression/depression-symptoms-and-warning-signs.htm',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
      author: 'HelpGuide.org'
    },
    {
      id: '2',
      title: 'Mindfulness for Anxiety',
      description: 'Learn mindfulness techniques to help manage anxiety symptoms.',
      type: 'video',
      categories: ['anxiety'],
      url: 'https://www.youtube.com/watch?v=SEfs5TJZ6Nk',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597',
      duration: '12 min'
    },
    {
      id: '3',
      title: 'PTSD Recovery Journey',
      description: 'Personal stories and professional advice for PTSD recovery.',
      type: 'podcast',
      categories: ['ptsd'],
      url: 'https://www.ptsd.va.gov/apps/podcasts/',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad',
      episodes: 24
    },
    {
      id: '4',
      title: 'Addiction Recovery Support',
      description: 'Support groups and recovery programs for addiction treatment.',
      type: 'professional',
      categories: ['addiction'],
      url: 'https://www.samhsa.gov/find-help/national-helpline',
      image: 'https://images.unsplash.com/photo-1559718062-0b35b9b80db4'
    },
    {
      id: '5',
      title: 'Self-Compassion Exercises',
      description: 'Practical self-compassion exercises to improve mental well-being.',
      type: 'tool',
      categories: ['self-esteem'],
      url: 'https://self-compassion.org/category/exercises/',
      image: 'https://images.unsplash.com/photo-1521145239861-2a1ee6a8b4f9'
    },
    {
      id: '6',
      title: 'Trauma Recovery Workbook',
      description: 'A step-by-step guide to processing and healing from trauma.',
      type: 'article',
      categories: ['trauma'],
      url: 'https://www.nctsn.org/resources/trauma-and-mental-health',
      image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783'
    },
    {
      id: '7',
      title: 'Neurodivergent Mental Health Support',
      description: 'Resources for autistic individuals and those with ADHD.',
      type: 'professional',
      categories: ['autism', 'adhd'],
      url: 'https://neurodivergentinsights.com/',
      image: 'https://images.unsplash.com/photo-1550418290-a8d86ad674a6'
    },
    {
      id: '8',
      title: 'Grief Support Community',
      description: 'Online forums and resources for coping with loss.',
      type: 'tool',
      categories: ['grief'],
      url: 'https://www.grief.com/',
      image: 'https://images.unsplash.com/photo-1505433229639-1d4d61d74a27'
    },
    {
      id: '9',
      title: 'Panic Attack Emergency Guide',
      description: 'Immediate steps to take when experiencing a panic attack.',
      type: 'article',
      categories: ['anxiety'],
      url: 'https://www.anxietycanada.com/articles/how-to-manage-panic-attacks/',
      image: 'https://images.unsplash.com/photo-1597393359896-110bee84db5d'
    },
    {
      id: '10',
      title: 'BPD (Borderline Personality Disorder) Support',
      description: 'Information and peer support for people with BPD.',
      type: 'professional',
      categories: ['bpd'],
      url: 'https://www.bpdresourcecenter.org/',
      image: 'https://images.unsplash.com/photo-1533243951219-597d0419e3ad'
    },
    {
      id: '11',
      title: 'CPTSD Healing Strategies',
      description: 'Guidelines for managing Complex PTSD and emotional trauma.',
      type: 'article',
      categories: ['ptsd', 'trauma'],
      url: 'https://cptsdfoundation.org/',
      image: 'https://images.unsplash.com/photo-1603666186185-1b26e5ec011d'
    },
    {
      id: '12',
      title: 'Meditation for Stress Relief',
      description: 'Guided meditation techniques for reducing stress levels.',
      type: 'video',
      categories: ['stress'],
      url: 'https://www.youtube.com/watch?v=wJ67N8EKpvs',
      image: 'https://images.unsplash.com/photo-1592991661040-fd41cb6121d5',
      duration: '15 min'
    },
    {
      id: '13',
      title: 'Loneliness and Isolation Support',
      description: 'Community-based strategies to combat loneliness.',
      type: 'article',
      categories: ['loneliness'],
      url: 'https://www.campaigntoendloneliness.org/',
      image: 'https://images.unsplash.com/photo-1561214014-840b92fc4c50'
    },
    {
      id: '14',
      title: 'Workplace Mental Health Toolkit',
      description: 'Guidelines for managing mental health in the workplace.',
      type: 'tool',
      categories: ['workplace-mental-health'],
      url: 'https://www.mhanational.org/workplace-mental-health',
      image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7'
    },
    {
      id: '15',
      title: 'Perinatal and Postpartum Depression Support',
      description: 'Support networks for parents experiencing postpartum depression.',
      type: 'professional',
      categories: ['postpartum'],
      url: 'https://www.postpartum.net/',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801'
    },
    {
      id: '16',
      title: 'Men’s Mental Health Resources',
      description: 'Guidance and support specifically for men’s mental health.',
      type: 'article',
      categories: ['mens-mental-health'],
      url: 'https://www.mantherapy.org/',
      image: 'https://images.unsplash.com/photo-1532384848820-16c7a7fefd73'
    },
    {
      id: '17',
      title: 'Teen Mental Health Support',
      description: 'Programs and advice tailored to teenage mental health needs.',
      type: 'professional',
      categories: ['teen-mental-health'],
      url: 'https://jedfoundation.org/',
      image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c'
    },
    {
      id: '18',
      title: 'Spirituality and Mental Health',
      description: 'How spirituality and mindfulness can support mental health.',
      type: 'article',
      categories: ['spirituality'],
      url: 'https://www.psychologytoday.com/us/basics/spirituality',
      image: 'https://images.unsplash.com/photo-1595941100214-0274ec9d4d6d'
    },
    {
      id: '19',
      title: 'LGBTQ+ Mental Health Support',
      description: 'Resources specifically for LGBTQ+ individuals facing mental health challenges.',
      type: 'professional',
      categories: ['lgbtq+'],
      url: 'https://www.thetrevorproject.org/',
      image: 'https://images.unsplash.com/photo-1597097098476-52f165715349'
    },
    {
      id: '20',
      title: 'Financial Stress and Mental Health',
      description: 'How to cope with financial anxiety and economic hardship.',
      type: 'article',
      categories: ['financial-stress'],
      url: 'https://www.mhanational.org/financial-stress-and-mental-health',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644'
    },
    {
      id: '21',
      title: 'Childhood Trauma Recovery Guide',
      description: 'Healing techniques for individuals dealing with past childhood trauma.',
      type: 'article',
      categories: ['childhood-trauma'],
      url: 'https://www.nctsn.org/resources/understanding-child-trauma',
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765'
    },
    {
      id: '22',
      title: 'Relationship Therapy Resources',
      description: 'Guidance for couples and individuals on improving relationships.',
      type: 'professional',
      categories: ['relationships'],
      url: 'https://www.gottman.com/',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9'
    },
    {
      id: '23',
      title: 'Sleep and Mental Health',
      description: 'How sleep impacts mental well-being and tips for better rest.',
      type: 'article',
      categories: ['sleep'],
      url: 'https://www.sleepfoundation.org/mental-health',
      image: 'https://images.unsplash.com/photo-1519417288428-c7d38f6322a0'
    },
    {
      id: '24',
      title: 'Chronic Illness and Mental Health',
      description: 'Support for those facing mental health struggles due to chronic illness.',
      type: 'article',
      categories: ['chronic-illness'],
      url: 'https://www.psychologytoday.com/us/conditions/chronic-illness',
      image: 'https://images.unsplash.com/photo-1587986114566-b379e24db099'
    },
    {
      id: '25',
      title: 'Self-Harm Prevention & Support',
      description: 'Guidance and emergency help for individuals struggling with self-harm.',
      type: 'professional',
      categories: ['self-harm'],
      url: 'https://www.crisistextline.org/topics/self-harm/',
      image: 'https://images.unsplash.com/photo-1510534977538-d9f8b176a16a'
    },
    {
      id: '26',
      title: 'Music Therapy for Anxiety and Stress',
      description: 'How music can improve mental well-being and reduce stress.',
      type: 'article',
      categories: ['music-therapy'],
      url: 'https://www.health.harvard.edu/mind-and-mood/how-music-can-help-you-heal',
      image: 'https://images.unsplash.com/photo-1514820720301-4c47930fcd04'
    },
    {
      id: '27',
      title: 'Art Therapy Techniques',
      description: 'Explore how creative expression can help with mental health recovery.',
      type: 'tool',
      categories: ['art-therapy'],
      url: 'https://www.arttherapy.org/',
      image: 'https://images.unsplash.com/photo-1532635241-16bc8fbd35b5'
    },
    {
      id: '28',
      title: 'Schizophrenia Support Resources',
      description: 'Resources for those affected by schizophrenia, including families.',
      type: 'professional',
      categories: ['schizophrenia'],
      url: 'https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Schizophrenia',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f3'
    },
    {
      id: '29',
      title: 'Journaling for Mental Health',
      description: 'How journaling can be an effective tool for managing mental health.',
      type: 'article',
      categories: ['journaling'],
      url: 'https://positivepsychology.com/journaling-mental-health/',
      image: 'https://images.unsplash.com/photo-1531346171594-32c87e8d8f2b'
    },
    {
      id: '30',
      title: 'Crisis Support and Emergency Hotlines',
      description: 'A list of international mental health crisis hotlines for immediate help.',
      type: 'professional',
      categories: ['crisis-support'],
      url: 'https://checkpointorg.com/global/',
      image: 'https://images.unsplash.com/photo-1596495577886-d920f1fc7568'
    },
    {
      id: '31',
      title: 'Veteran Mental Health Resources',
      description: 'Mental health services tailored for military veterans.',
      type: 'professional',
      categories: ['veterans'],
      url: 'https://www.mentalhealth.va.gov/',
      image: 'https://images.unsplash.com/photo-1589820296156-b5c5f5cfb40b'
    },
    {
      id: '32',
      title: 'How Diet Affects Mental Health',
      description: 'The connection between nutrition and emotional well-being.',
      type: 'article',
      categories: ['nutrition'],
      url: 'https://www.psychologytoday.com/us/basics/nutrition',
      image: 'https://images.unsplash.com/photo-1514995428455-447d4443fa7f'
    },
    {
      id: '33',
      title: 'Digital Detox and Mental Well-being',
      description: 'Strategies to reduce screen time for better mental health.',
      type: 'article',
      categories: ['digital-detox'],
      url: 'https://www.verywellmind.com/digital-detox-benefits-and-tips-4783075',
      image: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b'
    },
    {
      id: '34',
      title: 'Eating Disorder Recovery Resources',
      description: 'Support and guidance for individuals recovering from eating disorders.',
      type: 'professional',
      categories: ['eating-disorders'],
      url: 'https://www.nationaleatingdisorders.org/help-support/contact-helpline',
      image: 'https://images.unsplash.com/photo-1556910105-6b5f731a7d0b'
    },
    {
      id: '35',
      title: 'OCD (Obsessive-Compulsive Disorder) Support',
      description: 'Information and resources for individuals with OCD and related disorders.',
      type: 'professional',
      categories: ['ocd'],
      url: 'https://iocdf.org/',
      image: 'https://images.unsplash.com/photo-1542282088-2c5d3de5e6e9'
    },
    {
      id: '36',
      title: 'Social Anxiety Resources',
      description: 'Guidance and support for individuals dealing with social anxiety disorder.',
      type: 'professional',
      categories: ['social-anxiety'],
      url: 'https://www.adaa.org/understanding-anxiety/social-anxiety-disorder',
      image: 'https://images.unsplash.com/photo-1542282088-2c5d3de5e6e9'
    },
    {
      id: '37',
      title: 'Bipolar Disorder Support',
      description: 'Resources and information for individuals living with bipolar disorder.',
      type: 'professional',
      categories: ['bipolar-disorder'],
      url: 'https://www.dbsalliance.org/',
      image: 'https://images.unsplash.com/photo-1542282088-2c5d3de5e6e9'
    },
    {
      id: '38',
      title: 'Substance Abuse Recovery',
      description: 'Support groups and resources for individuals recovering from addiction.',
      type: 'professional',
      categories: ['substance-abuse'],
      url: 'https://www.samhsa.gov/find-help/national-helpline',
      image: 'https://images.unsplash.com/photo-1542282088-2c5d3de5e6e9'
    },
    {
      id: '39',
      title: 'Cognitive Behavioral Therapy (CBT)',
      description: 'Information and resources on CBT for managing mental health conditions.',
      type: 'professional', 
    },
    {
      id: '40',
      title: 'Mindfulness Meditation for Beginners',
      description: 'A beginner-friendly guide to mindfulness meditation practices.',
      type: 'article',
      categories: ['mindfulness'],
      url: 'https://www.mindful.org/how-to-meditate/',
      image: 'https://images.unsplash.com/photo-1551796887-1457f5b9e7e1'
    },
    {
      id: '41',
      title: 'Anger Management Techniques',
      description: 'Strategies for managing and coping with anger in healthy ways.',
      type: 'article',
      categories: ['anger-management'],
      url: 'https://www.apa.org/topics/anger/control',
      image: 'https://images.unsplash.com/photo-1515377905701-4f6c2f16e8a9'
    },
    {
      id: '42',
      title: 'Parenting Stress and Mental Health',
      description: 'Tips for parents to manage stress and prioritize their mental well-being.',
      type: 'article',
      categories: ['parenting'],
      url: 'https://www.psychologytoday.com/us/basics/parenting',
      image: 'https://images.unsplash.com/photo-1528837877641-6e803f4b6f0a'
    },
    {
      id: '43',
      title: 'Coping with Chronic Pain',
      description: 'Strategies for coping with chronic pain and maintaining mental health.',
      type: 'article',
      categories: ['chronic-pain'],
      url: 'https://www.verywellhealth.com/coping-with-chronic-pain-2564591',
      image: 'https://images.unsplash.com/photo-1580476264200-6f2b6e2b3f3b'
    },
    {
      id: '44',
      title: 'Healthy Boundaries in Relationships',
      description: 'Guidelines for setting and maintaining healthy boundaries in relationships.',
      type: 'article',
      categories: ['boundaries'],
      url: 'https://www.psychologytoday.com/us/basics/boundaries',
      image: 'https://images.unsplash.com/photo-1515377905701-4f6c2f16e8a9'
    },
    {
      id: '45',
      title: 'Emotional Intelligence Development',
      description: 'Learn how to improve emotional intelligence for better relationships and self-awareness.',
      type: 'article',
      categories: ['emotional-intelligence'],
      url: 'https://www.verywellmind.com/what-is-emotional-intelligence-2795423',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4'
    },
  ]);
};










// services/resources.js
const selfCareTips = [
  {
    id: 1,
    title: "Deep Breathing Exercise",
    description: "Take 5 deep breaths, inhaling for 4 seconds and exhaling for 6 seconds.",
    categories: ['mindfulness', 'physical'],
    duration: "5 min"
  },
  {
    id: 2,
    title: "Gratitude Journaling",
    description: "Write down 3 things you're grateful for today.",
    categories: ['emotional'],
    duration: "10 min"
  },
  {
    id: 3,
    title: "Stretch Break",
    description: "Stand up and stretch your body for a few minutes.",
    categories: ['physical'],
    duration: "5 min"
  },
  {
    id: 4,
    title: "Call a Friend",
    description: "Reach out to someone you care about for a quick chat.",
    categories: ['social'],
    duration: "15 min"
  },
  {
    id: 5,
    title: "Mindful Coloring",
    description: "Spend some time coloring to relax your mind.",
    categories: ['creative', 'mindfulness'],
    duration: "20 min"
  },
  {
    id: 6,
    title: "Positive Affirmations",
    description: "Repeat positive statements about yourself in the mirror.",
    categories: ['emotional'],
    duration: "5 min"
  }
];

// Simulate API call with delay
export const fetchSelfCareTips = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random errors (comment out for production)
      // if (Math.random() > 0.8) {
      //   reject(new Error("Failed to fetch tips"));
      // } else {
        resolve([...selfCareTips]);
      // }
    }, 800); // 0.8 second delay to simulate network request
  });
};