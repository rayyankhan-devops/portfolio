export interface Skill {
  name: string;
  icon: string;
  category: string;
  level: number; // 1-100
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  link?: string;
  github?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  current?: boolean;
  certificate?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  image?: string;
  credentialId?: string;
}

export interface LearningMilestone {
  day: number;
  title: string;
  description: string;
  topics: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  number: string;
}
