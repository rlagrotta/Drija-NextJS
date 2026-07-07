import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { SupportHelpSection } from "@/components/support/SupportHelpSection";
import type { SupportHelpItem } from "@/components/support/SupportHelpSection";
import type { TechnicalServiceContact } from "@/types/technical-service";

import styles from "./TechnicalServicePage.module.css";

type TechnicalServicePageContentProps = {
  contact: TechnicalServiceContact;
  introLine1: string;
  introLine2: string;
  whatsappButton: string;
  whatsappAriaLabel: string;
  emailLabel: string;
  helpTitle: string;
  helpItems: SupportHelpItem[];
};

export function TechnicalServicePageContent({
  contact,
  introLine1,
  introLine2,
  whatsappButton,
  whatsappAriaLabel,
  emailLabel,
  helpTitle,
  helpItems,
}: TechnicalServicePageContentProps) {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.inner}>
          <p className={styles.intro}>{introLine1}</p>
          <p className={styles.intro}>{introLine2}</p>

          <a
            href={contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
            aria-label={whatsappAriaLabel}
          >
            <WhatsAppIcon className={styles.buttonIcon} />
            <span className={styles.buttonLabel}>{whatsappButton}</span>
          </a>

          <div className={styles.emailBlock}>
            <p className={styles.emailLabel}>{emailLabel}</p>
            <a href={`mailto:${contact.email}`} className={styles.emailLink}>
              {contact.email}
            </a>
          </div>
        </div>
      </div>

      <SupportHelpSection title={helpTitle} items={helpItems} />
    </>
  );
}
