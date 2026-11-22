"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { skillCategories, type SkillItem } from "@/lib/data";

// True multi-color official SVG icons for iconic multi-color brands
function MultiColorTechIcon({ name, skill }: { name: string; skill: SkillItem }) {
  switch (name) {
    case "Python":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
          <path
            fill="#3776AB"
            d="M11.9 2C7.4 2 7.7 3.9 7.7 3.9V6h4.4v.6H5.9S2 6.2 2 11.7s3.4 5.3 3.4 5.3h2v-2.6s-.1-3.4 3.3-3.4h5.7s3.2.1 3.2-3.1V4.7S20.1 2 11.9 2zm-2.4 1.6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
          />
          <path
            fill="#FFD43B"
            d="M12.1 22c4.5 0 4.2-1.9 4.2-1.9V18h-4.4v-.6h6.2s3.9.4 3.9-5.1-3.4-5.3-3.4-5.3h-2v2.6s.1 3.4-3.3 3.4H7.6s-3.2-.1-3.2 3.1v3.2S3.9 22 12.1 22zm2.4-1.6a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
          />
        </svg>
      );
    case "Figma":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
          <path fill="#F24E1E" d="M8.5 2h3.5v6.7H8.5a3.35 3.35 0 0 1 0-6.7z" />
          <path fill="#FF7262" d="M12 2h3.5a3.35 3.35 0 0 1 0 6.7H12V2z" />
          <path fill="#1ABCFE" d="M12 12a3.35 3.35 0 1 1 6.7 0 3.35 3.35 0 0 1-6.7 0z" />
          <path fill="#0ACF83" d="M5.15 18.65A3.35 3.35 0 0 1 8.5 15.3H12v3.35a3.35 3.35 0 1 1-6.85 0z" />
          <path fill="#A259FF" d="M5.15 12A3.35 3.35 0 0 1 8.5 8.65H12v6.7H8.5A3.35 3.35 0 0 1 5.15 12z" />
        </svg>
      );
    case "Vite":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
          <defs>
            <linearGradient id="vite-g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#41D1FF" />
              <stop offset="100%" stopColor="#BD34FE" />
            </linearGradient>
            <linearGradient id="vite-g2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFEA83" />
              <stop offset="100%" stopColor="#FFA800" />
            </linearGradient>
          </defs>
          <path fill="url(#vite-g1)" d="M21.8 5.2L12.5 21.8c-.3.5-1 .5-1.3 0L2.2 5.2c-.3-.5.1-1.1.7-1l9 1.6c.1 0 .3 0 .4 0l8.8-1.6c.6-.1 1 .5.7 1z" />
          <path fill="url(#vite-g2)" d="M16.5 2.4L9.7 3.7c-.2 0-.3.2-.3.4l-.4 6.9c0 .3.2.5.5.4l1.9-.4c.3-.1.5.2.5.4l-.6 2.8c-.1.3.2.5.5.4l1.2-.4c.3-.1.5.2.5.4l-.9 4.4c-.1.3.3.5.5.2l.1-.2 5.4-10.7c.1-.3-.1-.6-.4-.5l-2 .4c-.3.1-.5-.2-.4-.5l1.3-4.6c.1-.3-.2-.6-.6-.7z" />
        </svg>
      );
    case "Flutter":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
          <path fill="#54C5F8" d="M13.8 2L4.2 11.6l3 3L19.8 2h-6z" />
          <path fill="#54C5F8" d="M13.8 11.1L8.7 16.2l3 3 8.1-8.1h-6z" />
          <path fill="#01579B" d="M11.7 19.2L14.5 22h5.3l-5.1-5.8-3 3z" />
          <path fill="#29B6F6" d="M8.7 16.2l3 3 3-3-3-3-3 3z" />
        </svg>
      );
    case "Tauri":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
          <circle cx="15.2" cy="8.8" r="2.2" fill="#FFC131" />
          <circle cx="8.8" cy="15.2" r="2.2" fill="#24C8DB" />
          <path
            fill="#FFC131"
            d="M15.2 3.2A5.6 5.6 0 0 0 9.7 7.6l2.4.7a3.2 3.2 0 1 1 3.7 3.7l.7 2.4a5.6 5.6 0 0 0-1.3-11.2z"
          />
          <path
            fill="#24C8DB"
            d="M8.8 20.8a5.6 5.6 0 0 0 5.5-4.4l-2.4-.7a3.2 3.2 0 1 1-3.7-3.7l-.7-2.4a5.6 5.6 0 0 0 1.3 11.2z"
          />
        </svg>
      );
    default: {
      const Icon = skill.icon;
      return <Icon className={`w-5 h-5 flex-shrink-0 ${skill.colorClass}`} />;
    }
  }
}

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const visibleSkills = useMemo(() => {
    if (activeCategory === "all") {
      return skillCategories.flatMap((cat) => cat.items);
    }
    return skillCategories.find((cat) => cat.id === activeCategory)?.items ?? [];
  }, [activeCategory]);

  const tabs = [
    { id: "all", label: "Wszystkie" },
    { id: "frontend", label: "Frontend & Mobile" },
    { id: "backend", label: "Backend & Data" },
    { id: "tools", label: "DevOps & Tools" },
  ];

  return (
    <section id="skills" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="text-primary font-mono text-sm uppercase tracking-widest">
            Tech Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">
            Technologies I Work With
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Narzędzia i technologie, z których korzystam na co dzień w pracy i własnych projektach
          </p>

          {/* Lightweight category switcher without heavy cards */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {tabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Open, airy, non-card skill cloud directly on canvas */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-3.5 max-w-5xl mx-auto"
        >
          {visibleSkills.map((skill) => (
            <div
              key={skill.text}
              className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full glass hover:border-primary/45 cursor-default transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <span className="transition-transform duration-200 group-hover:scale-110">
                <MultiColorTechIcon name={skill.text} skill={skill} />
              </span>
              <span className="font-medium text-sm text-foreground/90">{skill.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
