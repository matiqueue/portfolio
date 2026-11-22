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
  SiRust,
  SiTauri,
  SiSwift,
  SiGithubactions,
} from "react-icons/si";

export interface SkillItem {
  icon: ReactIconType;
  text: string;
  color: string;
  darkColor?: string;
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
    title: "Frontend, Mobile & Desktop",
    subtitle: "Nowoczesne interfejsy webowe, mobilne i natywne",
    items: [
      { icon: SiNextdotjs, text: "Next.js", color: "#111827", darkColor: "#ffffff" },
      { icon: SiReact, text: "React", color: "#087EA4", darkColor: "#61DAFB" },
      { icon: SiTypescript, text: "TypeScript", color: "#3178C6", darkColor: "#3B82F6" },
      { icon: SiTailwindcss, text: "Tailwind CSS", color: "#06B6D4", darkColor: "#22D3EE" },
      { icon: SiExpo, text: "Expo / RN", color: "#111827", darkColor: "#ffffff" },
      { icon: SiTauri, text: "Tauri", color: "#FFC131" },
      { icon: SiSwift, text: "Swift", color: "#F05138" },
      { icon: SiRedux, text: "Redux", color: "#764ABC", darkColor: "#A78BFA" },
      { icon: SiVite, text: "Vite", color: "#646CFF" },
      { icon: SiThreedotjs, text: "Three.js", color: "#111827", darkColor: "#ffffff" },
      { icon: SiFlutter, text: "Flutter", color: "#02569B", darkColor: "#54C5F8" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Data",
    subtitle: "Wydajne API, systemy i bazy SQL / NoSQL",
    items: [
      { icon: SiPython, text: "Python", color: "#3776AB" },
      { icon: SiDjango, text: "Django", color: "#0C4B33", darkColor: "#44B78B" },
      { icon: SiRust, text: "Rust", color: "#CE412B", darkColor: "#F97316" },
      { icon: SiNodedotjs, text: "Node.js", color: "#339933", darkColor: "#5FA04E" },
      { icon: SiExpress, text: "Express", color: "#111827", darkColor: "#E5E7EB" },
      { icon: SiPostgresql, text: "PostgreSQL", color: "#336791", darkColor: "#60A5FA" },
      { icon: SiMongodb, text: "MongoDB", color: "#47A248", darkColor: "#4ADE80" },
      { icon: SiPrisma, text: "Prisma", color: "#2D3748", darkColor: "#2DD4BF" },
      { icon: SiRedis, text: "Redis", color: "#DC382D", darkColor: "#F87171" },
    ],
  },
  {
    id: "tools",
    title: "Tools, DevOps & Cloud",
    subtitle: "Konteneryzacja, CI/CD, infrastruktura i design",
    items: [
      { icon: SiDocker, text: "Docker", color: "#2496ED", darkColor: "#38BDF8" },
      { icon: SiLinux, text: "Linux", color: "#CA8A04", darkColor: "#FACC15" },
      { icon: SiGnubash, text: "Bash", color: "#4EAA25", darkColor: "#4ADE80" },
      { icon: SiGithubactions, text: "GitHub Actions", color: "#2088FF", darkColor: "#60A5FA" },
      { icon: SiCloudflare, text: "Cloudflare", color: "#F38020", darkColor: "#FB923C" },
      { icon: SiNginx, text: "Nginx", color: "#009639", darkColor: "#34D399" },
      { icon: SiVercel, text: "Vercel", color: "#111827", darkColor: "#ffffff" },
      { icon: SiPostman, text: "Postman", color: "#FF6C37", darkColor: "#FB923C" },
      { icon: SiFigma, text: "Figma", color: "#F24E1E" },
      { icon: SiGit, text: "Git", color: "#F05032", darkColor: "#F87171" },
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
  icon?: string;
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
    icon: "/projects/aven-mail.png",
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
    icon: "/projects/rift-daily.png",
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
    icon: "/projects/iron-routine.png",
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
    icon: "/projects/mate-chess.png",
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
      "Nowoczesna strona serwisu i wypożyczalni rowerów w Kluczach z interaktywnym cennikiem usług, opiniami klientów, mapą dojazdu oraz rezerwacją wizyt.",
    demoUrl: "https://kluczerowerowe.pl",
    repoSlug: "kluczerowerowe.pl",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
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
  | "shield"
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
  secondaryLogo?: string;
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
    logo: "/projects/sg-system.png",
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
    logo: "/projects/mate-chess.png",
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
    logo: "/projects/klucze-rowerowe.png",
    position: "Full-Stack Developer (Freelance)",
    description:
      "Stworzenie strony serwisu i wypożyczalni rowerów kluczerowerowe.pl z interaktywnym cennikiem, opiniami klientów, mapą oraz formularzem kontaktu.",
    years: "2026",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "UI/UX"],
    link: "https://kluczerowerowe.pl",
    linkLabel: "Odwiedź kluczerowerowe.pl",
    iconType: "bike",
  },
  {
    id: "granteam",
    type: "job",
    company: "GranTeam",
    logo: "/projects/granteam.png",
    position: "Full-Stack Engineer",
    description:
      "Komercyjna praca nad zaawansowanymi platformami webowymi i systemami dla klientów w oparciu o Python, Django, Next.js, TypeScript, PostgreSQL, Redis i Docker.",
    years: "2026 - Obecnie",
    skills: ["Python", "Django", "Next.js", "PostgreSQL", "Docker"],
    link: "https://granteam.pl",
    linkLabel: "Odwiedź granteam.pl",
    iconType: "building",
    isCurrent: true,
  },
  {
    id: "uken",
    type: "school",
    company: "UKEN w Krakowie",
    position: "Cyberbezpieczeństwo (studia inżynierskie)",
    description:
      "Studia inżynierskie na kierunku Cyberbezpieczeństwo na Uniwersytecie Komisji Edukacji Narodowej w Krakowie. Bezpieczeństwo sieci, systemów, kryptografia i bezpieczne projektowanie aplikacji.",
    years: "2026 - 2030",
    skills: ["Cyberbezpieczeństwo", "Sieci", "Kryptografia", "Linux"],
    iconType: "shield",
    isCurrent: true,
  },
  {
    id: "aven-mail",
    type: "project",
    company: "Aven Mail",
    logo: "/projects/aven-mail.png",
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
    logo: "/projects/rift-daily.png",
    secondaryLogo: "/projects/iron-routine.png",
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
  title: "Szymon Góral · Full-Stack Engineer",
  description:
    "Portfolio Szymona Górala (matique), Full-Stack Engineera pracującego z Next.js, TypeScript, Python/Django, Tauri i React Native.",
};
