"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { projects, Project, aboutYou } from "@/lib/data";
import { ExternalLink, Star, GitFork, ArrowUpRight, Globe } from "lucide-react";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiRust,
  SiSwift,
  SiGithub,
} from "react-icons/si";

// Map language name to icon and colour
const LANG_META: Record<
  string,
  { icon: React.ElementType; color: string; bg: string }
> = {
  TypeScript: { icon: SiTypescript, color: "text-blue-500", bg: "bg-blue-500/10" },
  JavaScript: { icon: SiJavascript, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  Python: { icon: SiPython, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  "Next.js": { icon: SiNextdotjs, color: "text-foreground", bg: "bg-muted" },
  React: { icon: SiReact, color: "text-sky-500", bg: "bg-sky-500/10" },
  Node: { icon: SiNodedotjs, color: "text-green-500", bg: "bg-green-500/10" },
  Rust: { icon: SiRust, color: "text-orange-500", bg: "bg-orange-500/10" },
  Swift: { icon: SiSwift, color: "text-orange-500", bg: "bg-orange-500/10" },
};

// Accent bar colours per card index
const ACCENT_COLORS = [
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-purple-400",
  "from-emerald-500 to-teal-400",
  "from-orange-500 to-amber-400",
  "from-rose-500 to-pink-400",
  "from-indigo-500 to-sky-400",
];

function LanguageIcon({ language }: { language?: string }) {
  if (!language) return null;
  const meta = LANG_META[language];
  if (!meta) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-muted text-muted-foreground">
        {language}
      </span>
    );
  }
  const Icon = meta.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${meta.bg} ${meta.color}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {language}
    </span>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const primaryHref = project.demoUrl ?? project.repoUrl ?? aboutYou.github;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative h-full"
    >
      <motion.div
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="relative glass rounded-2xl overflow-hidden flex flex-col h-full"
      >
        {/* Top accent bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${accent}`} />

        {/* Card body */}
        <div className="p-5 flex flex-col flex-1">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold tracking-tight leading-tight group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                {project.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                    {project.badge}
                  </span>
                )}
              </div>
              <div className="mt-1.5">
                <LanguageIcon language={project.language} />
              </div>
            </div>

            {/* Quick icon links */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} na GitHub`}
                  className="w-9 h-9 rounded-xl flex items-center justify-center bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <SiGithub className="w-4 h-4" />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} strona live`}
                  className="w-9 h-9 rounded-xl flex items-center justify-center bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
            {project.description}
          </p>

          {/* Tech tags */}
          {project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs rounded-md bg-secondary text-secondary-foreground border border-border/50 font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-0.5 text-xs rounded-md bg-muted text-muted-foreground">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Footer stats + link */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
            <div className="flex items-center gap-3 text-muted-foreground text-xs">
              {project.stars !== undefined && (
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  {project.stars}
                </span>
              )}
              {project.forks !== undefined && (
                <span className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" />
                  {project.forks}
                </span>
              )}
              {project.stars === undefined && project.demoUrl && (
                <span className="font-mono text-[11px] text-muted-foreground/80">
                  {project.repoSlug}
                </span>
              )}
            </div>

            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
            >
              {project.demoUrl ? "Zobacz live" : "Zobacz kod"}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Glow on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          animate={{
            boxShadow: hovered
              ? "0 0 40px -8px hsl(var(--glow) / 0.25)"
              : "0 0 0px 0px transparent",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}

function FeaturedProjectCard({ project }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const accent = ACCENT_COLORS[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group col-span-full"
    >
      <motion.div
        animate={{ y: hovered ? -3 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="relative glass rounded-2xl overflow-hidden"
      >
        {/* Top accent bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${accent}`} />

        <div className="flex flex-col lg:flex-row">
          {/* Left: visual panel */}
          <div className="relative lg:w-80 xl:w-96 flex-shrink-0 flex flex-col items-center justify-center p-10 bg-gradient-to-br from-primary/10 via-muted/30 to-accent/10 border-b lg:border-b-0 lg:border-r border-border/50">
            {/* Patterned code lines as decoration */}
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
              <div className="absolute inset-0 grid grid-cols-4 gap-2 p-6">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1.5 rounded-full bg-primary/60"
                    style={{ width: `${35 + ((i * 37) % 55)}%` }}
                    animate={hovered ? { opacity: [0.3, 0.7, 0.3] } : {}}
                    transition={{ duration: 1.8, delay: i * 0.06, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>

            {/* Language icon large */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              {(() => {
                const meta = project.language ? LANG_META[project.language] : null;
                if (meta) {
                  const Icon = meta.icon;
                  return (
                    <div
                      className={`w-20 h-20 rounded-2xl ${meta.bg} flex items-center justify-center ring-2 ring-border/50`}
                    >
                      <Icon className={`w-10 h-10 ${meta.color}`} />
                    </div>
                  );
                }
                return (
                  <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center ring-2 ring-border/50">
                    <SiGithub className="w-10 h-10 text-muted-foreground" />
                  </div>
                );
              })()}

              <span className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                {project.badge ?? "Featured"}
              </span>
            </div>
          </div>

          {/* Right: content */}
          <div className="p-8 flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground font-mono">
              <Globe className="w-3.5 h-3.5 text-primary" />
              {project.repoSlug ?? project.title.toLowerCase().replace(/\s+/g, "-")}
            </div>

            <h3 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors mb-3">
              {project.title}
            </h3>

            <p className="text-muted-foreground leading-relaxed mb-5 max-w-2xl">
              {project.description}
            </p>

            {project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm rounded-lg bg-primary/10 text-primary font-medium border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Odwiedź stronę projektu
                </a>
              )}

              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border-primary/30 text-foreground font-medium hover:bg-primary/10 transition-colors text-sm"
                >
                  <SiGithub className="w-4 h-4" />
                  Zobacz na GitHub
                </a>
              )}

              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                {project.stars !== undefined && (
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {project.stars}
                  </span>
                )}
                {project.forks !== undefined && (
                  <span className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {project.forks}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          animate={{
            boxShadow: hovered
              ? "0 0 60px -12px hsl(var(--glow) / 0.3)"
              : "0 0 0px 0px transparent",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section id="projects" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-primary font-mono text-sm uppercase tracking-widest">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Wybrane projekty z mojego GitHuba oraz wdrożenia produkcyjne: od aplikacji desktopowych
            i mobilnych po platformy webowe
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {/* Featured spans full width */}
          <FeaturedProjectCard project={featured} index={0} />

          {/* Rest in responsive 2-column / 3-column grid */}
          {rest.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i + 1} />
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex justify-center mt-8"
        >
          <a
            href={aboutYou.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border-primary/30 text-foreground font-medium hover:bg-primary/10 transition-colors group"
          >
            <SiGithub className="w-5 h-5" />
            Zobacz wszystkie projekty
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
