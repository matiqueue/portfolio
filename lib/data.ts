import { type IconType as ReactIconType } from "react-icons";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiDjango,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiRedux,
  SiVite,
  SiThreedotjs,
  SiExpo,
  SiGit,
  SiDocker,
  SiLinux,
  SiGnubash,
  SiCloudflare,
  SiNginx,
  SiPostman,
  SiVercel,
  SiFigma,
  SiPrisma,
  SiFlutter,
  SiTailwindcss,
} from "react-icons/si";

export interface SkillItem {
  icon: ReactIconType;
  text: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  items: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend & UI",
    subtitle: "Nowoczesne interfejsy webowe, mobilne i 3D",
    items: [
      { icon: SiNextdotjs, text: "Next.js" },
      { icon: SiReact, text: "React" },
      { icon: SiTypescript, text: "TypeScript" },
      { icon: SiTailwindcss, text: "Tailwind CSS" },
      { icon: SiRedux, text: "Redux" },
      { icon: SiVite, text: "Vite" },
      { icon: SiThreedotjs, text: "Three.js" },
      { icon: SiExpo, text: "Expo / RN" },
      { icon: SiFlutter, text: "Flutter" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Data",
    subtitle: "Wydajne API, bazy relacyjne i NoSQL",
    items: [
      { icon: SiPython, text: "Python" },
      { icon: SiDjango, text: "Django" },
      { icon: SiNodedotjs, text: "Node.js" },
      { icon: SiExpress, text: "Express" },
      { icon: SiPostgresql, text: "PostgreSQL" },
      { icon: SiMongodb, text: "MongoDB" },
      { icon: SiPrisma, text: "Prisma" },
      { icon: SiRedis, text: "Redis" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Cloud",
    subtitle: "Konteneryzacja, infrastruktura i design",
    items: [
      { icon: SiDocker, text: "Docker" },
      { icon: SiLinux, text: "Linux" },
      { icon: SiGnubash, text: "Bash" },
      { icon: SiCloudflare, text: "Cloudflare" },
      { icon: SiNginx, text: "Nginx" },
      { icon: SiVercel, text: "Vercel" },
      { icon: SiPostman, text: "Postman" },
      { icon: SiFigma, text: "Figma" },
      { icon: SiGit, text: "Git" },
    ],
  },
];

export const skills: SkillItem[] = skillCategories.flatMap((category) => category.items);

export interface Project {
  title: string;
  description: string;
  repoUrl?: string;
  demoUrl?: string;
  repoSlug?: string;
  technologies: string[];
  stars?: number;
  forks?: number;
  language: string;
  badge?: string;
}

export const projects: Project[] = [
  {
    title: "Aven Mail",
    description:
      "Błyskawiczny klient poczty e-mail stworzony z myślą o obsłudze klawiaturą (keyboard-first) na macOS, Windows, Linux oraz web. Zbudowany w architekturze local-first z Tauri, React i Rust, ze wsparciem AI i pełnym skupieniem na prywatności.",
    demoUrl: "https://get-aven.com",
    repoSlug: "get-aven.com",
    technologies: ["Tauri", "Rust", "React", "Next.js", "TypeScript", "Tailwind CSS"],
    language: "TypeScript",
    badge: "Flagship Product",
  },
  {
    title: "Rift Daily",
    description:
      "Nowoczesny, szybki mobilny e-Dziennik studencki USOS na iOS i Androida w stylu Bento Grid. Zbudowany w React Native i Expo z automatycznym budowaniem wydań APK w GitHub Actions.",
    repoUrl: "https://github.com/matiqueue/rift-daily",
    demoUrl: "https://rift-daily.vercel.app",
    repoSlug: "matiqueue/rift-daily",
    technologies: ["React Native", "Expo", "TypeScript", "USOS API"],
    stars: 6,
    language: "TypeScript",
  },
  {
    title: "Iron Routine",
    description:
      "Monochromatyczny dziennik treningu siłowego na iOS, Androida i web działający w pełni offline-first. Zawiera interaktywną mapę anatomii 2D oraz szyfrowany komunikator E2EE.",
    repoUrl: "https://github.com/matiqueue/iron-routine",
    demoUrl: "https://iron-routine-app.vercel.app",
    repoSlug: "matiqueue/iron-routine",
    technologies: ["React Native", "Expo", "TypeScript", "PostgreSQL"],
    stars: 3,
    language: "TypeScript",
  },
  {
    title: "Mate Chess",
    description:
      "Platforma szachowa w architekturze monorepo (web, desktop i serwer gry) umożliwiająca rozgrywki online w czasie rzeczywistym, grę z botem oraz partie lokalne.",
    repoUrl: "https://github.com/matiqueue/mate-chess",
    demoUrl: "https://getmatechess.vercel.app",
    repoSlug: "matiqueue/mate-chess",
    technologies: ["Next.js", "Tauri", "TypeScript", "Turborepo"],
    stars: 4,
    forks: 2,
    language: "TypeScript",
  },
  {
    title: "Ayla AI",
    description:
      "Konwersacyjny asystent AI oparty o przetwarzanie języka naturalnego (NLP), wspierający organizację zadań, szybkie odpowiedzi i automatyzację codziennej pracy.",
    repoUrl: "https://github.com/matiqueue/Ayla-AI",
    repoSlug: "matiqueue/Ayla-AI",
    technologies: ["TypeScript", "Next.js", "NLP", "AI"],
    stars: 5,
    language: "TypeScript",
  },
  {
    title: "Klucze Rowerowe",
    description:
      "Komercyjny sklep e-commerce z przejrzystym katalogiem produktów, obsługą zamówień i integracjami płatności. Zaprojektowany z myślą o szybkości działania i responsywności.",
    demoUrl: "https://kluczerowerowe.pl",
    repoSlug: "kluczerowerowe.pl",
    technologies: ["Next.js", "TypeScript", "E-commerce", "Tailwind CSS"],
    language: "TypeScript",
    badge: "Commercial",
  },
  {
    title: "Portfolio",
    description:
      "Moje osobiste portfolio zbudowane na Next.js 16 i React 19 z płynnymi animacjami Framer Motion, trybem jasnym i ciemnym oraz interaktywną mapą ścieżki zawodowej.",
    repoUrl: "https://github.com/matiqueue/portfolio",
    demoUrl: "https://matiqueue-portfolio.vercel.app",
    repoSlug: "matiqueue/portfolio",
    technologies: ["Next.js", "React 19", "TypeScript", "Framer Motion"],
    stars: 1,
    language: "TypeScript",
  },
];

export type WorkType = "school" | "project" | "job";
export type WorkIconType =
  | "school"
  | "github"
  | "console"
  | "server"
  | "chess"
  | "bike"
  | "building"
  | "mail"
  | "smartphone"
  | "code";

export interface WorkExperience {
  id: string;
  type: WorkType;
  company: string;
  logo?: string;
  position: string;
  description: string;
  years: string;
  skills: string[];
  link?: string;
  linkLabel?: string;
  iconType: WorkIconType;
  isCurrent?: boolean;
}

export const workExperiences: WorkExperience[] = [
  {
    id: "technikum",
    type: "school",
    company: "Technikum im. Antoniego Kocjana",
    position: "Technik programista",
    description:
      "Solidne fundamenty inżynierii oprogramowania w Olkuszu: algorytmika, programowanie obiektowe, bazy danych oraz pierwsze aplikacje webowe i desktopowe.",
    years: "2021 - 2026",
    skills: ["Algorytmika", "OOP", "SQL", "Web Dev"],
    iconType: "school",
  },
  {
    id: "open-source",
    type: "project",
    company: "Open Source & GitHub",
    position: "Full-Stack Developer",
    description:
      "Regularne tworzenie i publikowanie projektów open source na GitHubie. Budowanie narzędzi developerskich, aplikacji użytkowych i eksperymenty z nowymi technologiami.",
    years: "2022 - Obecnie",
    skills: ["Open Source", "TypeScript", "CI/CD"],
    link: "https://github.com/matiqueue",
    linkLabel: "Profil GitHub",
    iconType: "github",
  },
  {
    id: "konsola",
    type: "project",
    company: "Konsola Operatorska",
    position: "Full-Stack Developer",
    description:
      "Aplikacja panelu zarządzania stworzona jako projekt szkolny, wzbogacona o analitykę zachowań użytkowników w Hotjar. Pełny cykl od projektu po wdrożenie.",
    years: "2023 - 2024",
    skills: ["TypeScript", "Web App", "Hotjar"],
    link: "https://github.com/matiqueue/konsola-operatorska",
    linkLabel: "Zobacz na GitHub",
    iconType: "console",
  },
  {
    id: "sg-system",
    type: "job",
    company: "SG-System",
    position: "Web Developer (Freelance)",
    description:
      "Zaprojektowanie i wdrożenie kompletnej strony firmowej sg-system.pl. Odpowiedzialność za frontend, wydajność, techniczne SEO i współpracę z klientem.",
    years: "2024",
    skills: ["Frontend", "SEO", "UI/UX"],
    link: "https://sg-system.pl",
    linkLabel: "Odwiedź sg-system.pl",
    iconType: "server",
  },
  {
    id: "mate-chess",
    type: "project",
    company: "Mate Chess & Ayla AI",
    position: "Lead Developer",
    description:
      "Platforma szachowa w monorepo (Next.js + Tauri) do gry online w czasie rzeczywistym i z botem oraz konwersacyjny asystent Ayla AI oparty o NLP.",
    years: "2025",
    skills: ["Next.js", "Tauri", "Turborepo", "WebSockets"],
    link: "https://github.com/matiqueue/mate-chess",
    linkLabel: "Zobacz na GitHub",
    iconType: "chess",
  },
  {
    id: "klucze-rowerowe",
    type: "job",
    company: "Klucze Rowerowe",
    position: "Full-Stack Developer (Freelance)",
    description:
      "Wdrożenie platformy e-commerce kluczerowerowe.pl z katalogiem produktów, koszykiem, obsługą zamówień oraz integracjami płatności online.",
    years: "2026",
    skills: ["Next.js", "TypeScript", "E-commerce", "Payments"],
    link: "https://kluczerowerowe.pl",
    linkLabel: "Odwiedź sklep",
    iconType: "bike",
  },
  {
    id: "granteam",
    type: "job",
    company: "GranTeam",
    position: "Full-Stack Engineer",
    description:
      "Komercyjna praca nad zaawansowanymi platformami webowymi i systemami dla klientów w oparciu o Python, Django, Next.js, TypeScript, PostgreSQL, Redis i Docker.",
    years: "2026 - Obecnie",
    skills: ["Python", "Django", "Next.js", "PostgreSQL", "Docker"],
    iconType: "building",
    isCurrent: true,
  },
  {
    id: "aven-mail",
    type: "project",
    company: "Aven Mail",
    position: "Creator & Lead Engineer",
    description:
      "Flagowy klient poczty e-mail typu keyboard-first na desktop i web. Architektura local-first w Tauri, React i Rust wraz z pełnym ekosystemem webowym.",
    years: "2026 - Obecnie",
    skills: ["Tauri", "Rust", "React", "Next.js"],
    link: "https://get-aven.com",
    linkLabel: "Odwiedź get-aven.com",
    iconType: "mail",
    isCurrent: true,
  },
  {
    id: "mobile-suite",
    type: "project",
    company: "Rift Daily & Iron Routine",
    position: "Mobile Product Developer",
    description:
      "Dwie aplikacje mobilne na iOS i Androida w React Native i Expo: szybki e-Dziennik studencki USOS w stylu Bento Grid oraz offline-first dziennik treningowy z E2EE.",
    years: "2026 - Obecnie",
    skills: ["React Native", "Expo", "Offline-First", "E2EE"],
    link: "https://rift-daily.vercel.app",
    linkLabel: "Zobacz Rift Daily",
    iconType: "smartphone",
    isCurrent: true,
  },
];

export const aboutYou = {
  name: "Szymon Góral",
  role: "Full-Stack Engineer @ GranTeam",
  description:
    "Cześć, jestem Szymon! Jestem Full-Stack Engineerem pracującym komercyjnie z Next.js, TypeScript oraz Python / Django. Tworzę wydajne aplikacje webowe, mobilne i desktopowe z naciskiem na czystą architekturę i dopracowany UI/UX.",
  yearsOfExperience: "Od 2021",
  location: "Kraków, Polska",
  email: "szymon.goral@icloud.com",
  github: "https://github.com/matiqueue",
  linkedin: "https://www.linkedin.com/in/szymon-g%C3%B3ral-214b232b2/",
  discord: "https://discord.com/users/matiqueue",
};

export const logoText = "@matiqueue";

export const marketingHeadlines = {
  mainHeadline: "Cześć, witaj na moim portfolio!",
  subHeadline: "Full-Stack Engineer | Next.js, TypeScript & Python / Django",
};

export const websiteMetadata = {
  title: "Szymon Góral | Full-Stack Engineer Portfolio",
  description:
    "Portfolio Szymona Górala, Full-Stack Engineera pracującego z Next.js, TypeScript, Python/Django i React Native. Zobacz moje projekty i ścieżkę zawodową.",
};
