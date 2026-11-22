"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillCategories } from "@/lib/data";
import { Layout, Server, Wrench } from "lucide-react";

const CATEGORY_META: Record<
  string,
  { icon: React.ElementType; gradient: string; badgeBg: string; iconColor: string }
> = {
  frontend: {
    icon: Layout,
    gradient: "from-sky-500/18 via-primary/8 to-transparent",
    badgeBg: "bg-sky-500/10 border-sky-500/20",
    iconColor: "text-sky-500",
  },
  backend: {
    icon: Server,
    gradient: "from-emerald-500/18 via-teal-500/8 to-transparent",
    badgeBg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-500",
  },
  tools: {
    icon: Wrench,
    gradient: "from-violet-500/18 via-indigo-500/8 to-transparent",
    badgeBg: "bg-violet-500/10 border-violet-500/20",
    iconColor: "text-violet-500",
  },
};

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-mono text-sm uppercase tracking-widest">
            Core Arsenal & Tech Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-4">
            Technologies I Work With
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Technologie i narzędzia, z których korzystam w codziennej pracy komercyjnej oraz przy
            własnych projektach
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => {
            const meta = CATEGORY_META[category.id] ?? CATEGORY_META.frontend;
            const CategoryIcon = meta.icon;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: categoryIndex * 0.08 }}
                className="glass rounded-2xl p-6 relative overflow-hidden hover:border-primary/40 transition-colors"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${meta.gradient} pointer-events-none opacity-75`}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center ${meta.badgeBg}`}
                    >
                      <CategoryIcon className={`w-5 h-5 ${meta.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold tracking-tight">{category.title}</h3>
                      <p className="text-xs text-muted-foreground">{category.subtitle}</p>
                    </div>
                  </div>

                  {/* Brand-colored app-style technology icon tiles (CSS transitions for 120fps smoothness) */}
                  <div className="flex flex-wrap gap-2.5 mt-5">
                    {category.items.map((skill) => {
                      const Icon = skill.icon;
                      return (
                        <div
                          key={skill.text}
                          className={`group/chip rounded-xl pl-2 pr-3.5 py-1.5 flex items-center gap-2.5 bg-background/70 dark:bg-secondary/50 hover:bg-background dark:hover:bg-secondary/90 border border-border/60 ${skill.borderClass} cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}
                        >
                          <span
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${skill.tintClass} transition-transform duration-200 group-hover/chip:scale-110`}
                          >
                            <Icon className={`w-[18px] h-[18px] ${skill.colorClass}`} />
                          </span>
                          <span className="font-medium text-xs sm:text-sm">{skill.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
