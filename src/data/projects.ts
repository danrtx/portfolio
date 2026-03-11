import { Project, Skill } from '../types';

// ─── Personal Info ──────────────────────────────────────────────────────────
export const personal = {
  name: 'Danilo Montezuma',
  shortName: 'Danilo',
  displayName: 'DANILO',
  role: 'Full-Stack Developer & UI Engineer',
  email: 'danilomntzm@gmail.com',
  linkedin: 'https://linkedin.com/in/danilo-andres-montezuma-ibarra-a8067b29b',
  github: 'https://github.com/DaniloMontezuma',
  location: 'Pasto, Colombia',
  education: 'Software Engineering · 7th Semester',
  university: 'Universidad Cooperativa de Colombia',
  languages: 'Spanish (Native) · English (C2)',
  status: 'Available for remote work',
};

// ─── Projects ───────────────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: '1',
    slug: 'cambridge-academy',
    title: 'Cambridge Academy',
    subtitle: 'Institutional platform of Cambridge Academy of Languages',
    description: 'Full-stack institutional website with Agile Scrum workflow, GitLab CI, and continuous performance monitoring.',
    longDescription: `Led full-stack development of the Cambridge Academy of Languages institutional website. 
    Managed the Git workflow via GitLab, applied Agile Scrum methodology across the team, 
    and handled continuous performance monitoring and deployment pipelines. 
    The platform serves as the primary digital presence for language education services.`,
    tags: ['React', 'Node.js', 'Express', 'CSS'],
    category: 'web',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    ],
    link: 'https://www.cambridgeacademy.edu.co/',
    role: 'Full-Stack Developer',
    technologies: ['ReactJS', 'JavaScript', 'CSS', 'Node.js', 'Express', 'GitLab CI', 'Agile Scrum'],
    featured: true,
  },
  {
    id: '2',
    slug: 'mastercoffe-pasto',
    title: 'MasterCoffe Pasto',
    subtitle: 'End-to-end platform for a local coffee brand',
    description: 'Built from UI design to database architecture — authentication, security, and data analysis for business decisions.',
    longDescription: `Built the MasterCoffe Pasto platform end-to-end, from initial UI design and UX flows 
    to database architecture and backend services. Implemented authentication, security protocols, 
    and performed data analysis to support business decisions. 
    The stack combined Next.js for the frontend with TypeScript and PostgreSQL for robust data management.`,
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    category: 'web',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1200&q=80',
    ],
    role: 'Full-Stack Developer',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'REST API', 'Auth JWT'],
    featured: true,
  },
];

// ─── Skills grouped by category ─────────────────────────────────────────────
export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 92, color: '#4F8EF7' },
  { name: 'Next.js', level: 88, color: '#4F8EF7' },
  { name: 'TypeScript', level: 85, color: '#A78BFA' },
  { name: 'JavaScript', level: 90, color: '#A78BFA' },
  { name: 'CSS / Tailwind', level: 90, color: '#4F8EF7' },
  { name: 'Framer Motion', level: 80, color: '#34D399' },
  { name: 'Three.js', level: 72, color: '#34D399' },
  // Backend
  { name: 'Node.js', level: 82, color: '#34D399' },
  { name: 'Express', level: 80, color: '#34D399' },
  { name: 'Python', level: 70, color: '#A78BFA' },
  { name: 'Java', level: 65, color: '#A78BFA' },
  { name: 'PostgreSQL', level: 75, color: '#4F8EF7' },
  { name: 'MySQL', level: 72, color: '#4F8EF7' },
  // Tools
  { name: 'Git / GitHub / GitLab', level: 88, color: '#34D399' },
  { name: 'Agile / Scrum', level: 82, color: '#A78BFA' },
  { name: 'Power BI', level: 68, color: '#4F8EF7' },
];

export const skillGroups = [
  {
    label: 'Frontend',
    color: '#4F8EF7',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'CSS', 'Tailwind', 'Framer Motion', 'Three.js'],
  },
  {
    label: 'Backend',
    color: '#34D399',
    items: ['Node.js', 'Express', 'Python', 'Java', 'REST APIs', 'PostgreSQL', 'MySQL'],
  },
  {
    label: 'Tools & Other',
    color: '#A78BFA',
    items: ['Git', 'GitHub', 'GitLab', 'Agile/Scrum', 'CI/CD', 'AWS/GCP basics', 'Power BI', 'Photoshop CS6'],
  },
];

// ─── Experience ──────────────────────────────────────────────────────────────
export const experience = [
  {
    company: 'Cambridge Academy of Languages',
    role: 'Full-Stack Developer',
    period: 'Jun 2024 – Present',
    location: 'Pasto, Colombia',
    stack: ['ReactJS', 'JavaScript', 'CSS', 'Node.js', 'Express'],
    description:
      'Led full-stack development of the institutional website. Managed Git workflow via GitLab, applied Agile Scrum methodology, and handled continuous performance monitoring.',
    accent: '#4F8EF7',
    current: true,
  },
  {
    company: 'MasterCoffe Pasto',
    role: 'Full-Stack Developer',
    period: 'Feb 2023 – Jun 2023',
    location: 'Pasto, Colombia',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
    description:
      'Built the platform end-to-end from UI design to database architecture. Implemented authentication, security protocols, and performed data analysis to support business decisions.',
    accent: '#34D399',
    current: false,
  },
  {
    company: 'Camp Michigania',
    role: 'International Staff',
    period: 'May 2025 – Sept 2025',
    location: 'Boyne City, Michigan, USA',
    stack: [],
    description:
      'International work experience in the United States. Strengthened English communication, teamwork, and problem-solving skills in a fast-paced multicultural environment.',
    accent: '#A78BFA',
    current: false,
  },
];

// ─── Education ───────────────────────────────────────────────────────────────
export const education = [
  {
    institution: 'Universidad Cooperativa de Colombia',
    degree: 'B.S. Software Engineering',
    period: 'Feb 2023 – Nov 2026',
    detail: 'Currently in 7th semester',
    accent: '#4F8EF7',
  },
  {
    institution: 'Cambridge Academy of Languages',
    degree: 'National Higher Certificate in English',
    period: '2022',
    detail: 'Certified English proficiency (C1/C2 level)',
    accent: '#34D399',
  },
];

// ─── Certifications ──────────────────────────────────────────────────────────
export const certifications = [
  {
    title: 'Power BI Data Analyst with AI',
    issuer: 'Daxus Latam',
    date: 'Jan 2026',
    accent: '#A78BFA',
    icon: '📊',
  },
  {
    title: 'EF SET English Certificate 75/100',
    issuer: 'EF Standard English Test',
    date: 'Nov 2025',
    detail: 'C2 Proficient',
    accent: '#34D399',
    icon: '🌐',
  },
];

// ─── Social Links ─────────────────────────────────────────────────────────────
export const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/DaniloMontezuma', icon: 'github' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/danilo-andres-montezuma-ibarra-a8067b29b', icon: 'linkedin' },
];
