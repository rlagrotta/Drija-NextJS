import type { RegistroLegalSection } from "@/types/registro";

import styles from "./RegistroPage.module.css";

type RegistroLegalSectionsProps = {
  intro: string[];
  conditions: RegistroLegalSection;
  warranty: RegistroLegalSection;
  venezuela: RegistroLegalSection;
};

function LegalBlock({ section }: { section: RegistroLegalSection }) {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalTitle}>{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph} className={styles.legalParagraph}>
          {paragraph}
        </p>
      ))}
      {section.items?.length ? (
        <ul className={styles.legalList}>
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function RegistroLegalSections({
  intro,
  conditions,
  warranty,
  venezuela,
}: RegistroLegalSectionsProps) {
  return (
    <>
      {intro.map((paragraph) => (
        <p key={paragraph} className={styles.intro}>
          {paragraph}
        </p>
      ))}

      <hr className={styles.divider} />

      <LegalBlock section={conditions} />

      <hr className={styles.divider} />

      <LegalBlock section={warranty} />

      <hr className={styles.divider} />

      <LegalBlock section={venezuela} />

      <hr className={styles.divider} />
    </>
  );
}
