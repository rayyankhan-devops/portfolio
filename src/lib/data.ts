import type { Skill, Project, Experience, Certification, LearningMilestone, SocialLink, NavItem } from '@/types';

// ─── Navigation ─────────────────────────────────────────────────────
export const navItems: NavItem[] = [
  { label: 'About', href: '#about', number: '01' },
  { label: 'Skills', href: '#skills', number: '02' },
  { label: 'Projects', href: '#projects', number: '03' },
  { label: 'Experience', href: '#experience', number: '04' },
  { label: 'Contact', href: '#contact', number: '05' },
];

// ─── Skills ─────────────────────────────────────────────────────────
export const skills: Skill[] = [
  // Infrastructure
  { name: 'Linux', icon: 'SiLinux', category: 'Infrastructure', level: 90 },
  { name: 'Networking', icon: 'FaNetworkWired', category: 'Infrastructure', level: 80 },
  { name: 'Bash', icon: 'SiGnubash', category: 'Scripting', level: 85 },

  // Containers & Orchestration
  { name: 'Docker', icon: 'SiDocker', category: 'Containers', level: 92 },
  { name: 'Kubernetes', icon: 'SiKubernetes', category: 'Containers', level: 88 },

  // Cloud Providers
  { name: 'AWS', icon: 'FaAws', category: 'Cloud', level: 90 },
  { name: 'Azure', icon: 'VscAzure', category: 'Cloud', level: 75 },
  { name: 'GCP', icon: 'SiGooglecloud', category: 'Cloud', level: 70 },

  // CI/CD
  { name: 'GitHub Actions', icon: 'SiGithubactions', category: 'CI/CD', level: 88 },
  { name: 'Jenkins', icon: 'SiJenkins', category: 'CI/CD', level: 82 },
  { name: 'Git', icon: 'SiGit', category: 'CI/CD', level: 95 },

  // Infrastructure as Code
  { name: 'Terraform', icon: 'SiTerraform', category: 'IaC', level: 85 },
  { name: 'Ansible', icon: 'SiAnsible', category: 'IaC', level: 80 },

  // Security
  { name: 'SAST/DAST/SCA', icon: 'FaShieldAlt', category: 'Security', level: 78 },
  { name: 'Trivy', icon: 'SiTrivy', category: 'Security', level: 82 },
  { name: 'OWASP ZAP', icon: 'SiOwasp', category: 'Security', level: 75 },
  { name: 'Threat Dragon', icon: 'FaDragon', category: 'Security', level: 70 },

  // Scripting
  { name: 'Python', icon: 'SiPython', category: 'Scripting', level: 80 },

  // Monitoring
  { name: 'Prometheus', icon: 'SiPrometheus', category: 'Monitoring', level: 80 },
  { name: 'Grafana', icon: 'SiGrafana', category: 'Monitoring', level: 82 },
];

// ─── Projects ───────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: 'arquistic-store',
    title: 'Arquistic Store – E-commerce Platform',
    description: 'Built and deployed a production-ready e-commerce website with responsive design, product management, shopping cart, optimized asset delivery, and performance-focused frontend architecture. Configured deployment pipelines, domain integration, HTTPS, and cloud hosting while ensuring scalability and fast loading across devices.',
    image: '/images/projects/arquistic.png',
    tags: ['E-commerce', 'Cloud Hosting', 'CI/CD', 'Next.js'],
    category: 'Products',
    link: 'https://arquistic.store/',
  },
  {
    id: 'abroadaoo',
    title: 'AbroadAOO – Study Abroad Consultancy Platform',
    description: 'Developed and deployed a modern consultancy website featuring responsive UI, inquiry forms, service management, and SEO optimization. Implemented cloud deployment, domain configuration, performance optimization, and production-ready hosting with a focus on reliability and user experience.',
    image: '/images/projects/abroadaoo.png',
    tags: ['Consultancy', 'Cloud Deployment', 'SEO', 'React'],
    category: 'Products',
    link: 'https://abroadaoo.com/',
  },
  {
    id: 'godropme',
    title: "GoDropMe – Real-time GPS Tracking Platform",
    description: "Developed a real-time GPS tracking mobile app connecting parents, drivers, and schools. Designed for safe and efficient transportation, featuring live route updates, custom notifications, and high reliability. Fully deployed and available on the Google Play Store.",
    image: '/images/projects/godropme.png',
    tags: ['Flutter', 'Real-time GPS', 'Firebase', 'Play Store'],
    category: 'Products',
    link: 'https://play.google.com/store/apps/details?id=com.rayonixsolutions.godropme&pcampaignid=web_share',
  },
  {
    id: 'maternity-hub',
    title: 'Maternity HUB – Healthcare Hackathon Project',
    description: 'Maternal healthcare app built during the MINIMEDI Hackathon to support underserved regions. Delivers medical advice guidance, interactive Q&A support, emergency contact access, and health records management with optimized offline capability.',
    image: '/images/projects/maternityhub.png',
    tags: ['Flutter', 'Healthcare', 'Hackathon', 'API Integration'],
    category: 'Hackathons',
    link: 'https://youtu.be/94J0PTZEsY8',
    github: 'https://devpost.com/software/maternity-hub',
  },
  {
    id: 'meditation-home',
    title: 'Meditation Home – Mindfulness Hackathon Project',
    description: 'Cross-platform mindfulness app with guided meditation sessions, custom user progression, and immersive calming interfaces. Developed for the Mindfulness Hackathon to deliver scalable, cross-device performance.',
    image: '/images/projects/meditation.png',
    tags: ['Flutter', 'Mindfulness', 'Hackathon', 'UI/UX'],
    category: 'Hackathons',
    link: 'https://youtu.be/UDl2q6H6u48',
    github: 'https://devpost.com/software/meditation-home',
  },
  {
    id: 'cicd-pipeline',
    title: 'Cloud-Native CI/CD Pipeline',
    description: 'Designed and implemented a fully automated CI/CD pipeline with multi-stage builds, automated testing, container security scanning, and zero-downtime deployments to AWS EKS using ArgoCD for GitOps-based delivery.',
    image: '/images/projects/cicd.jpg',
    tags: ['GitHub Actions', 'Docker', 'AWS ECR', 'ArgoCD'],
    category: 'CI/CD',
    github: 'https://github.com/rayyankhan-devops',
  },
  {
    id: 'k8s-multicluster',
    title: 'Kubernetes Multi-Cluster Setup',
    description: 'Architected a production-grade multi-cluster Kubernetes environment with Istio service mesh, centralized monitoring with Prometheus/Grafana, and automated scaling policies handling 10K+ requests per second.',
    image: '/images/projects/kubernetes.jpg',
    tags: ['Kubernetes', 'Helm', 'Istio', 'Prometheus'],
    category: 'Kubernetes',
    github: 'https://github.com/rayyankhan-devops',
  },
  {
    id: 'iac-framework',
    title: 'Infrastructure as Code Framework',
    description: 'Built a modular Terraform framework with reusable modules for VPC, EKS, RDS, and S3, featuring remote state management, workspace-based environments, and automated drift detection.',
    image: '/images/projects/terraform.jpg',
    tags: ['Terraform', 'AWS', 'Modules', 'State Management'],
    category: 'Terraform',
    github: 'https://github.com/rayyankhan-devops',
  },
  {
    id: 'container-security',
    title: 'Container Security Pipeline',
    description: 'Implemented a comprehensive DevSecOps pipeline integrating Trivy for container scanning, OWASP ZAP for DAST, and Snyk for dependency analysis, reducing vulnerabilities by 85% across all microservices.',
    image: '/images/projects/security.jpg',
    tags: ['Docker', 'Trivy', 'OWASP ZAP', 'Snyk'],
    category: 'Docker',
    github: 'https://github.com/rayyankhan-devops',
  },
  {
    id: 'aws-architecture',
    title: 'AWS Serverless Architecture',
    description: 'Designed a serverless event-driven architecture on AWS using Lambda, API Gateway, DynamoDB, and SQS, achieving 99.99% uptime and processing 1M+ events daily with automatic scaling.',
    image: '/images/projects/aws.jpg',
    tags: ['AWS', 'Lambda', 'API Gateway', 'DynamoDB'],
    category: 'AWS',
    github: 'https://github.com/rayyankhan-devops',
  },
  {
    id: 'monitoring-stack',
    title: 'Observability & Monitoring Stack',
    description: 'Deployed a full observability platform with Prometheus metrics, Grafana dashboards, ELK log aggregation, and AlertManager, providing real-time insights across 50+ microservices.',
    image: '/images/projects/monitoring.jpg',
    tags: ['Prometheus', 'Grafana', 'ELK', 'AlertManager'],
    category: 'Monitoring',
    github: 'https://github.com/rayyankhan-devops',
  },
];

export const experiences: Experience[] = [
  {
    company: 'DevSpire Solutions (Peshawar, Pakistan)',
    role: 'Mobile App Development (Flutter)',
    period: '01/07/2025 – 31/12/2025',
    description: [
      'Built responsive mobile applications focused on user experience',
      'Implemented authentication and data security features',
      'Integrated RESTful APIs and contributed to a distributed Agile development team',
    ],
    certificate: '/images/certificates/devspire-internship.jpeg',
  },
  {
    company: 'YoungDev Intern (Pakistan)',
    role: 'Flutter Developer',
    period: '01/06/2025 – 30/06/2025',
    description: [
      'Built responsive cross-platform apps with Flutter/Dart',
      'Integrated RESTful APIs and applied state management',
      'Maintained version-controlled code via Git in an Agile workflow',
    ],
    certificate: '/images/certificates/youngdev-internship.jpeg',
  },
  {
    company: 'DevelopersHub Corporation© (Pakistan)',
    role: 'App Developer (Flutter)',
    period: '01/05/2025 – 30/06/2025',
    description: [
      'Developed scalable mobile apps with user-centered design',
      'Implemented secure authentication and integrated APIs',
      'Collaborated in a remote Agile team',
    ],
    certificate: '/images/certificates/developershub-internship.jpeg',
  },
];

// ─── Certifications ─────────────────────────────────────────────────
export const certifications: Certification[] = [
  {
    name: 'DevOps - Zero To Hero (Josh Batch 10)',
    issuer: 'Train With Shubham',
    date: '13/07/2026',
    credentialId: 'CJYTKCAT',
    image: '/images/certificates/devops-zero-to-hero.png',
  },
  {
    name: 'Domain 1 Review: AWS Certified DevOps Engineer - Professional (DOP-C02)',
    issuer: 'Amazon Web Services',
    date: '11/07/2026',
    image: '/images/certificates/aws-devops-professional.jpg',
  },
  {
    name: 'AWS Foundations: Getting Started with the AWS Cloud Essentials',
    issuer: 'Amazon Web Services',
    date: '11/07/2026',
    image: '/images/certificates/aws-essentials.jpg',
  },
  {
    name: 'Mobile App Development Internship Certificate',
    issuer: 'DevSpire Solutions',
    date: '12/2025',
    credentialId: 'DS/2025/85',
    image: '/images/certificates/devspire-internship.jpeg',
  },
  {
    name: 'Flutter Development Internship Certificate',
    issuer: 'YoungDev Interns',
    date: '06/2025',
    image: '/images/certificates/youngdev-internship.jpeg',
  },
  {
    name: 'Mobile App Development Internship Certificate',
    issuer: 'DevelopersHub Corporation',
    date: '06/2025',
    credentialId: 'DHC-1975',
    image: '/images/certificates/developershub-internship.jpeg',
  },
];

// ─── Learning Journey (90 Days of DevOps) ───────────────────────────
export const learningMilestones: LearningMilestone[] = [
  {
    day: 30,
    title: 'Foundation & Linux',
    description: 'Mastered Linux administration, shell scripting, networking fundamentals, and system architecture.',
    topics: ['Linux', 'Bash', 'Networking', 'SSH', 'File Systems', 'Process Management'],
  },
  {
    day: 50,
    title: 'Containers & Docker',
    description: 'Deep dive into containerization, Docker Compose, image optimization, and container orchestration basics.',
    topics: ['Docker', 'Docker Compose', 'Container Networking', 'Image Building', 'Registries'],
  },
  {
    day: 70,
    title: 'CI/CD & Automation',
    description: 'Built automated pipelines with GitHub Actions and Jenkins, integrated testing and security scanning.',
    topics: ['GitHub Actions', 'Jenkins', 'Pipeline Design', 'Automated Testing', 'Artifact Management'],
  },
  {
    day: 90,
    title: 'Cloud & Orchestration',
    description: 'Deployed production workloads on Kubernetes, managed infrastructure with Terraform across cloud providers.',
    topics: ['Kubernetes', 'Terraform', 'AWS', 'Helm', 'Service Mesh', 'Cloud Architecture'],
  },
];

// ─── Social Links ───────────────────────────────────────────────────
export const socialLinks: SocialLink[] = [
  {
    name: 'Email',
    url: 'mailto:rkkhan0750@gmail.com',
    icon: 'HiOutlineMail',
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.link/bzoxwm',
    icon: 'FaWhatsapp',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/muhammad-rayyan-5645b1317/',
    icon: 'FaLinkedinIn',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/rayyankhan-devops',
    icon: 'FaGithub',
  },
];
