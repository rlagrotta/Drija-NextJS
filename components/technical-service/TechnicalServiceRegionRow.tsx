import Image from "next/image";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import type { TechnicalServiceRegion } from "@/types/technical-service";

import styles from "./TechnicalServicePage.module.css";

type TechnicalServiceRegionRowProps = {
  region: TechnicalServiceRegion;
  contactAriaLabel: string;
};

export function TechnicalServiceRegionRow({
  region,
  contactAriaLabel,
}: TechnicalServiceRegionRowProps) {
  const buttonText = `${region.buttonLabel} / ${region.phoneLabel}`;

  return (
    <li className={styles.row}>
      <div className={styles.flagWrap}>
        <Image
          src={region.flag.src}
          alt={region.flag.alt}
          width={56}
          height={36}
          className={styles.flag}
        />
      </div>

      <a
        href={region.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
        aria-label={contactAriaLabel.replace("{region}", region.name)}
      >
        <WhatsAppIcon className={styles.buttonIcon} />
        <span className={styles.buttonLabel}>{buttonText}</span>
      </a>
    </li>
  );
}
