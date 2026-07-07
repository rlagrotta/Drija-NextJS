import Image from "next/image";
import {
  getSocialLinkLabel,
  getSocialLinkUrl,
} from "@/lib/social-page/page";
import type { SocialPageLabels, SocialPageLink } from "@/types/social-page";

import styles from "./SocialLinksSection.module.css";

type SocialLinksSectionProps = {
  handle: string;
  subtitle: string;
  links: SocialPageLink[];
  labels: SocialPageLabels;
};

export function SocialLinksSection({
  handle,
  subtitle,
  links,
  labels,
}: SocialLinksSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="social-page-handle">
      <div className={styles.inner}>
        <h2 id="social-page-handle" className={styles.handle}>
          {handle}
        </h2>
        <p className={styles.subtitle}>{subtitle}</p>

        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={getSocialLinkUrl(link)}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={getSocialLinkLabel(link, labels)}
              >
                <Image
                  src={link.icon}
                  alt=""
                  width={224}
                  height={224}
                  sizes="(min-width: 1024px) 18vw, (min-width: 640px) 5.25rem, 4.5rem"
                  className={styles.icon}
                  aria-hidden
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
