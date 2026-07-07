import type { WarrantyLegalListSection } from "@/types/warranty-page";

import styles from "./WarrantiesPage.module.css";

type WarrantiesLegalContentProps = {
  termsTitle: string;
  termsIntro: string;
  conditions: WarrantyLegalListSection;
  voidSituations: WarrantyLegalListSection;
  contactSection: {
    title: string;
    paragraph: string;
  };
};

export function WarrantiesLegalContent({
  termsTitle,
  termsIntro,
  conditions,
  voidSituations,
  contactSection,
}: WarrantiesLegalContentProps) {
  return (
    <div>
      <section className={styles.legalSection} aria-labelledby="warranty-terms-title">
        <h2 id="warranty-terms-title" className={styles.legalTitle}>
          {termsTitle}
        </h2>
        <p className={styles.legalParagraph}>{termsIntro}</p>
      </section>

      <section className={styles.legalSection} aria-labelledby="warranty-conditions-title">
        <h2 id="warranty-conditions-title" className={styles.legalTitle}>
          {conditions.title}
        </h2>
        <ol className={styles.legalList}>
          {conditions.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className={styles.legalSection} aria-labelledby="warranty-void-title">
        <h2 id="warranty-void-title" className={styles.legalTitle}>
          {voidSituations.title}
        </h2>
        <ol className={styles.legalList}>
          {voidSituations.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className={styles.legalSection} aria-labelledby="warranty-contact-title">
        <h2 id="warranty-contact-title" className={styles.legalTitle}>
          {contactSection.title}
        </h2>
        <p className={styles.legalParagraph}>{contactSection.paragraph}</p>
      </section>
    </div>
  );
}
