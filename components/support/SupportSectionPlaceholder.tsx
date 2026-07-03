import { SupportHelpSection } from "@/components/support/SupportHelpSection";
import type { SupportHelpItem } from "@/components/support/SupportHelpSection";

import styles from "./SupportSectionPlaceholder.module.css";

type SupportSectionPlaceholderProps = {
  title: string;
  description: string;
  comingSoon: string;
  helpTitle: string;
  helpItems: SupportHelpItem[];
};

export function SupportSectionPlaceholder({
  title,
  description,
  comingSoon,
  helpTitle,
  helpItems,
}: SupportSectionPlaceholderProps) {
  return (
    <>
      <section className={styles.section} aria-labelledby="support-placeholder-title">
        <div className={styles.inner}>
          <h1 id="support-placeholder-title" className={styles.title}>
            {title}
          </h1>
          <p className={styles.description}>{description}</p>
          <p className={styles.comingSoon}>{comingSoon}</p>
        </div>
      </section>

      <SupportHelpSection title={helpTitle} items={helpItems} />
    </>
  );
}
