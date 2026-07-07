import { SupportHelpSection } from "@/components/support/SupportHelpSection";
import type { SupportHelpItem } from "@/components/support/SupportHelpSection";
import { TechnicalServiceRegionRow } from "@/components/technical-service/TechnicalServiceRegionRow";
import type { TechnicalServiceRegion } from "@/types/technical-service";

import styles from "./TechnicalServicePage.module.css";

type TechnicalServicePageContentProps = {
  regions: TechnicalServiceRegion[];
  introLine1: string;
  introLine2: string;
  introLine3: string;
  whatsappTitle: string;
  contactAriaLabel: string;
  helpTitle: string;
  helpItems: SupportHelpItem[];
};

export function TechnicalServicePageContent({
  regions,
  introLine1,
  introLine2,
  introLine3,
  whatsappTitle,
  contactAriaLabel,
  helpTitle,
  helpItems,
}: TechnicalServicePageContentProps) {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.inner}>
          <p className={styles.intro}>{introLine1}</p>
          <p className={styles.intro}>{introLine2}</p>
          <p className={`${styles.intro} ${styles.introEmphasis}`}>{introLine3}</p>

          <h1 className={styles.whatsappTitle}>{whatsappTitle}</h1>

          <ul className={styles.list}>
            {regions.map((region) => (
              <TechnicalServiceRegionRow
                key={region.id}
                region={region}
                contactAriaLabel={contactAriaLabel}
              />
            ))}
          </ul>
        </div>
      </div>

      <SupportHelpSection title={helpTitle} items={helpItems} />
    </>
  );
}
