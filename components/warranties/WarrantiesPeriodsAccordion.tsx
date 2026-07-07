"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { WarrantyPeriodCategory } from "@/types/warranty-page";
import { cn } from "@/lib/utils";

import styles from "./WarrantiesPage.module.css";

const collapseTransition = { duration: 0.25, ease: "easeOut" as const };

type WarrantiesPeriodsAccordionProps = {
  title: string;
  laborLabel: string;
  partsLabel: string;
  yearLabel: string;
  yearsLabel: string;
  categories: WarrantyPeriodCategory[];
};

function formatYears(years: number, yearLabel: string, yearsLabel: string) {
  return years === 1 ? `1 ${yearLabel}` : `${years} ${yearsLabel}`;
}

export function WarrantiesPeriodsAccordion({
  title,
  laborLabel,
  partsLabel,
  yearLabel,
  yearsLabel,
  categories,
}: WarrantiesPeriodsAccordionProps) {
  const [openSlugs, setOpenSlugs] = useState<Set<string>>(() => new Set());

  const toggleCategory = (slug: string) => {
    setOpenSlugs((current) => {
      const next = new Set(current);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  return (
    <section aria-labelledby="warranty-periods-title">
      <h2 id="warranty-periods-title" className={styles.periodsTitle}>
        {title}
      </h2>

      <ul className={styles.periodsList}>
        {categories.map((category) => {
          const isOpen = openSlugs.has(category.slug);
          const panelId = `warranty-period-panel-${category.slug}`;

          return (
            <li key={category.id} className={styles.periodItem}>
              <button
                type="button"
                id={`warranty-period-trigger-${category.slug}`}
                className={cn(styles.periodTrigger, isOpen && styles.periodTriggerOpen)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleCategory(category.slug)}
              >
                <span className={styles.toggleIcon} aria-hidden>
                  {isOpen ? "−" : "+"}
                </span>
                <span className={styles.periodName}>{category.name}</span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={`warranty-period-trigger-${category.slug}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={collapseTransition}
                    className={styles.periodPanel}
                  >
                    <ul className={styles.periodGroups}>
                      {category.groups.map((group) => (
                        <li key={group.id} className={styles.periodGroup}>
                          <p className={styles.groupName}>{group.name}</p>
                          <p className={styles.groupDetail}>
                            {laborLabel}: {formatYears(group.laborYears, yearLabel, yearsLabel)}
                          </p>
                          <p className={styles.groupDetail}>
                            {partsLabel}: {formatYears(group.partsYears, yearLabel, yearsLabel)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
