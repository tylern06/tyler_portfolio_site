export const personalInfo = {
  name: 'Tyler Nguyen',
  title: 'Software Engineer',
  tagline: 'Full stack engineer with 8+ years of experience designing high-performance web and mobile applications in FinTech and warehouse management.',
  email: 'tynguyen06@gmail.com',
  location: 'Seattle, WA',
  linkedin: 'https://www.linkedin.com/in/tyler-nguyen',
  github: 'https://github.com/tyler-nguyen',
  resumePdf: '/Tyler_Nguyen_Software_Engineer_Resume.pdf',
  bio: [
    "I'm a full stack engineer with 8+ years of experience designing high-performance web and mobile applications in FinTech and warehouse management. I specialize in React, Node.js, and AWS — with a track record of modernizing legacy systems, leading architecture initiatives, and delivering scalable solutions.",
    "I care deeply about code quality, developer experience, and building things that are both technically sound and genuinely useful to the people who use them."
  ]
}

export const stats = [
  { value: '8+', label: 'Years Experience' },
  { value: '3', label: 'Companies' },
  { value: '$5M+', label: 'Deal Flow Enabled' },
  { value: '60%', label: 'Build Time Reduction' },
]

export const experience = [
  {
    company: 'CAPX',
    role: 'Software Engineer',
    period: 'Dec 2022 – Feb 2026',
    location: 'Seattle, WA',
    description: 'Led modernization of a legacy FinTech lender platform and built end-to-end product features serving lending operations.',
    highlights: [
      'Migrated legacy Meteor platform to React, Node.js, Express, and Vite — reducing build times by 60%',
      'Designed and built a partner referral platform contributing to $5M+ in lending deal flow',
      'Architected a multi-step form wizard with conditional workflows using React Hook Form and Radix UI',
      'Implemented secure document upload with AWS S3 and Lambda, including serverless file zipping',
      'Developed a reusable React component system in collaboration with designers using Figma',
      'Mentored junior engineers on coding standards, debugging, and system design',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'Vite', 'AWS S3', 'Lambda', 'React Hook Form', 'Radix UI'],
  },
  {
    company: 'Coolearth Software',
    role: 'Software Engineer',
    period: 'Sep 2017 – Aug 2022',
    location: 'Seattle, WA',
    description: 'Built and maintained web and mobile applications for warehouse management, QA/QC, and ERP integrations.',
    highlights: [
      'Built a React Native mobile WMS app translating Figma prototypes into production-ready features',
      'Implemented gRPC-based communication integrating TypeScript clients with C# backend services',
      'Designed and integrated industrial scale hardware into a production reporting web app with real-time monitoring',
      'Improved data-heavy admin dashboard performance by ~50% via server-side pagination and DB indexing',
      'Developed APIs and scheduling algorithms to generate optimized pallet picklists for a robotic crane system',
    ],
    tech: ['React', 'React Native', 'TypeScript', 'gRPC', 'Node.js', 'PostgreSQL', 'MongoDB'],
  },
  {
    company: 'Conflare',
    role: 'Web Developer',
    period: 'Oct 2016 – Aug 2017',
    location: 'Seattle, WA',
    description: 'Developed responsive, cross-browser websites from design mockups and improved frontend build workflows.',
    highlights: [
      'Developed responsive, cross-browser websites using HTML, CSS (Sass), JavaScript, and Bootstrap',
      'Improved build workflows using Gulp for asset compilation, minification, and cache busting',
      'Implemented client-side form validation and AJAX-based submissions',
    ],
    tech: ['HTML5', 'CSS3', 'Sass', 'JavaScript', 'Bootstrap', 'Gulp'],
  },
]

export const projects = [
  {
    title: 'Partner Referral Platform',
    description: 'End-to-end referral platform for a FinTech lender enabling partner registration, agreement signing, and deal submissions — with an admin dashboard tracking referrals through payment.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'AWS'],
    liveUrl: null,
    githubUrl: null,
    featured: true,
    image: null,
    gradient: 'from-blue-600/20 to-cyan-600/20',
  },
  {
    title: 'React Native WMS App',
    description: 'Mobile warehouse management system built with React Native and Expo, featuring gRPC communication with C# backend services for strongly typed, low-latency warehouse operations.',
    tech: ['React Native', 'Expo', 'TypeScript', 'gRPC'],
    liveUrl: null,
    githubUrl: null,
    featured: true,
    image: null,
    gradient: 'from-purple-600/20 to-pink-600/20',
  },
  {
    title: 'Robotic Crane Picklist System',
    description: 'APIs and scheduling algorithms to generate optimized pallet picklists for a robotic crane system, integrated with real-time production reporting and industrial scale hardware.',
    tech: ['Node.js', 'PostgreSQL', 'REST APIs'],
    liveUrl: null,
    githubUrl: null,
    featured: true,
    image: null,
    gradient: 'from-emerald-600/20 to-teal-600/20',
  },
]

export const skills = {
  'Frontend': [
    'React', 'TypeScript', 'JavaScript', 'Next.js', 'React Native', 'Expo',
    'Redux Toolkit', 'RTK Query', 'React Query', 'React Hook Form',
    'Tailwind CSS', 'CSS Modules', 'Sass', 'HTML5', 'CSS3',
  ],
  'Backend': [
    'Node.js', 'Express', 'Python', 'Flask', 'RESTful APIs', 'gRPC',
  ],
  'Databases': [
    'MongoDB', 'PostgreSQL', 'MySQL', 'Microsoft SQL Server',
  ],
  'DevOps & Testing': [
    'AWS (S3, Lambda, EC2, Cognito, CloudWatch)', 'Docker', 'Kubernetes',
    'Jest', 'Vitest', 'Playwright', 'React Testing Library',
    'Git', 'Vite', 'Webpack',
  ],
}
