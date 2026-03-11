export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: 'web' | 'mobile' | 'design' | 'experimental';
  year: number;
  image: string;
  images: string[];
  link?: string;
  github?: string;
  role: string;
  technologies: string[];
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number;
  color: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}
