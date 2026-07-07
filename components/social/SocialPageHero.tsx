import { OptimizedImage } from "@/components/ui/OptimizedImage";

import styles from "./SocialPageHero.module.css";

type SocialPageHeroProps = {
  line1: string;
  line2: string;
  image: { src: string; alt: string };
};

export function SocialPageHero({ line1, line2, image }: SocialPageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroMedia}>
        <OptimizedImage
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.overlay} aria-hidden />
        <div className={styles.titleWrap}>
          <div className={styles.titleBlock}>
            <p className={styles.titleLine}>{line1}</p>
            <h1 className={styles.titleHash}>{line2}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
