import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

import styles from "./WorkWithUsPage.module.css";

type WorkWithUsWhatsAppButtonProps = {
  href: string;
  label: string;
  ariaLabel: string;
};

export function WorkWithUsWhatsAppButton({
  href,
  label,
  ariaLabel,
}: WorkWithUsWhatsAppButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappButton}
      aria-label={ariaLabel}
    >
      <WhatsAppIcon className={styles.whatsappIcon} />
      <span>{label}</span>
    </a>
  );
}
