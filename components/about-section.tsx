"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { aboutYou } from "@/lib/data";
import { MapPin, Mail, Layers, Smartphone, Cpu, Sparkles } from "lucide-react";

const interests = [
  {
    icon: Layers,
    label: "Full-Stack Web",
    desc: "Next.js, TypeScript oraz Python / Django",
  },
  {
    icon: Smartphone,
    label: "Mobile & Desktop",
    desc: "React Native, Expo, Tauri i Rust",
  },
  {
    icon: Cpu,
    label: "Clean Architecture",
    desc: "Skalowalne systemy, PostgreSQL i Redis",
  },
  {
    icon: Sparkles,
    label: "Fluid UI/UX",
    desc: "Dopracowane, szybkie i responsywne interfejsy",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="space-y-10 max-w-5xl mx-auto">
          {/* Label */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="block text-primary font-mono text-sm uppercase tracking-widest"
          >
            About Me
          </motion.span>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold tracking-tight -mt-4"
          >
            {aboutYou.name}
          </motion.h2>

          {/* Main description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-muted-foreground text-lg leading-relaxed -mt-4"
          >
            Jestem Full-Stack Engineerem pracującym komercyjnie w GranTeam, gdzie na co dzień
            rozwijam platformy webowe i architekturę backendową w oparciu o Python, Django, Next.js
            oraz TypeScript. Łączę solidne fundamenty backendowe z dbałością o czysty, płynny UI/UX.
          </motion.p>

          {/* Second paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.48, duration: 0.6 }}
            className="text-muted-foreground leading-relaxed -mt-2"
          >
            Programuję od 2021 roku. Zaczynałem od podstaw web developmentu w Technikum
            Programistycznym im. Antoniego Kocjana w Olkuszu, a dzisiaj realizuję komercyjne
            systemy, aplikacje mobilne (React Native / Expo) oraz desktopowe w Tauri i Rust. Po
            godzinach rozwijam własne produkty takie jak Aven Mail, Rift Daily czy Iron Routine, a w
            wolnym czasie pasjonuję się siatkówką i szachami.
          </motion.p>

          {/* Interests grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.56, duration: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 -mt-2"
          >
            {interests.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.07, duration: 0.5 }}
                className="glass rounded-xl p-4 flex flex-col gap-2 glow-sm"
              >
                <Icon className="w-5 h-5 text-primary" />
                <p className="text-sm font-semibold leading-tight">{label}</p>
                <p className="text-xs text-muted-foreground leading-snug">{desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.72, duration: 0.6 }}
            className="flex flex-wrap gap-4 -mt-2"
          >
            <div className="glass rounded-xl px-6 py-4 glow-sm">
              <p className="text-2xl font-bold text-primary">{aboutYou.yearsOfExperience}</p>
              <p className="text-sm text-muted-foreground">Doświadczenie</p>
            </div>
            <div className="glass rounded-xl px-6 py-4 glow-sm">
              <p className="text-2xl font-bold text-primary">GranTeam</p>
              <p className="text-sm text-muted-foreground">Full-Stack Engineer</p>
            </div>
            <div className="glass rounded-xl px-6 py-4 glow-sm">
              <p className="text-2xl font-bold text-primary">15+</p>
              <p className="text-sm text-muted-foreground">Wdrożonych projektów</p>
            </div>
            <div className="glass rounded-xl px-6 py-4 glow-sm">
              <p className="text-2xl font-bold text-primary">Web / Mobile</p>
              <p className="text-sm text-muted-foreground">oraz aplikacje desktop</p>
            </div>
          </motion.div>

          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.82, duration: 0.6 }}
            className="flex flex-wrap items-center gap-5 pt-2 text-sm text-muted-foreground -mt-2"
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              {aboutYou.location}
            </span>
            <a
              href={`mailto:${aboutYou.email}`}
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              {aboutYou.email}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
