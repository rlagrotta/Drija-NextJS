import { RegistroForm } from "@/components/registro/RegistroForm";
import { RegistroLegalSections } from "@/components/registro/RegistroLegalSections";
import type { LocalizedRegistroPageContent } from "@/lib/registro/page";

import styles from "./RegistroPage.module.css";

type RegistroPageContentProps = LocalizedRegistroPageContent & {
  heroTitle: string;
  recaptchaSiteKey: string;
};

export function RegistroPageContent({
  heroTitle,
  intro,
  conditions,
  warranty,
  venezuela,
  recaptchaSiteKey,
}: RegistroPageContentProps) {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.heroTitle}>{heroTitle}</h1>

        <RegistroLegalSections
          intro={intro}
          conditions={conditions}
          warranty={warranty}
          venezuela={venezuela}
        />

        <RegistroForm recaptchaSiteKey={recaptchaSiteKey} />
      </div>
    </div>
  );
}
