import Image from "next/image";
import { WorkWithUsWhatsAppButton } from "@/components/work-with-us/WorkWithUsWhatsAppButton";

import styles from "./WorkWithUsPage.module.css";

type WorkWithUsPageContentProps = {
  heroTitle: string;
  subtitle: string;
  paragraph1: string;
  paragraph2: string;
  contactLabel: string;
  whatsappLabel: string;
  whatsappAriaLabel: string;
  mascot: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  email: string;
  whatsappUrl: string;
};

export function WorkWithUsPageContent({
  heroTitle,
  subtitle,
  paragraph1,
  paragraph2,
  contactLabel,
  whatsappLabel,
  whatsappAriaLabel,
  mascot,
  email,
  whatsappUrl,
}: WorkWithUsPageContentProps) {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.heroTitle}>{heroTitle}</h1>

        <div className={styles.grid}>
          <div className={styles.mascotCard}>
            <Image
              src={mascot.src}
              alt={mascot.alt}
              width={mascot.width}
              height={mascot.height}
              className={styles.mascotImage}
              priority
            />
          </div>

          <div className={styles.content}>
            <h2 className={styles.subtitle}>{subtitle}</h2>
            <p className={styles.paragraph}>{paragraph1}</p>
            <p className={styles.paragraph}>{paragraph2}</p>

            <div className={styles.contactBlock}>
              <p className={styles.contactLabel}>{contactLabel}</p>
              <a href={`mailto:${email}`} className={styles.emailLink}>
                {email}
              </a><br/>

              <WorkWithUsWhatsAppButton
                href={whatsappUrl}
                label={whatsappLabel}
                ariaLabel={whatsappAriaLabel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
