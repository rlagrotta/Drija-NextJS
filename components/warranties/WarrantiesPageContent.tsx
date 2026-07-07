import { SupportHelpSection } from "@/components/support/SupportHelpSection";
import type { SupportHelpItem } from "@/components/support/SupportHelpSection";
import { WarrantiesLegalContent } from "@/components/warranties/WarrantiesLegalContent";
import { WarrantiesPeriodsAccordion } from "@/components/warranties/WarrantiesPeriodsAccordion";
import { WarrantiesSupportLinks } from "@/components/warranties/WarrantiesSupportLinks";
import type { LocalizedWarrantyPageContent } from "@/lib/warranties/page";

import styles from "./WarrantiesPage.module.css";

type WarrantiesPageContentProps = LocalizedWarrantyPageContent & {
  pageTitle: string;
  termsTitle: string;
  periodsTitle: string;
  laborLabel: string;
  partsLabel: string;
  yearLabel: string;
  yearsLabel: string;
  supportTitle: string;
  whatsappLabel: string;
  emailLabel: string;
  helpTitle: string;
  helpItems: SupportHelpItem[];
};

export function WarrantiesPageContent({
  pageTitle,
  termsTitle,
  termsIntro,
  conditions,
  voidSituations,
  contactSection,
  periodCategories,
  contact,
  periodsTitle,
  laborLabel,
  partsLabel,
  yearLabel,
  yearsLabel,
  supportTitle,
  whatsappLabel,
  emailLabel,
  helpTitle,
  helpItems,
}: WarrantiesPageContentProps) {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.heroTitle}>{pageTitle}</h1>

          <div className={styles.grid}>
            <WarrantiesLegalContent
              termsTitle={termsTitle}
              termsIntro={termsIntro}
              conditions={conditions}
              voidSituations={voidSituations}
              contactSection={contactSection}
            />

            <div className={styles.sidebar}>
              <WarrantiesPeriodsAccordion
                title={periodsTitle}
                laborLabel={laborLabel}
                partsLabel={partsLabel}
                yearLabel={yearLabel}
                yearsLabel={yearsLabel}
                categories={periodCategories}
              />

              <WarrantiesSupportLinks
                title={supportTitle}
                whatsappLabel={whatsappLabel}
                emailLabel={emailLabel}
                whatsappUrl={contact.whatsappUrl}
                email={contact.email}
              />
            </div>
          </div>
        </div>
      </div>

      <SupportHelpSection title={helpTitle} items={helpItems} />
    </>
  );
}
