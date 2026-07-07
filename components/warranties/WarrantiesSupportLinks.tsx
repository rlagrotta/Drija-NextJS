import styles from "./WarrantiesPage.module.css";

type WarrantiesSupportLinksProps = {
  title: string;
  whatsappLabel: string;
  emailLabel: string;
  whatsappUrl: string;
  email: string;
};

export function WarrantiesSupportLinks({
  title,
  whatsappLabel,
  emailLabel,
  whatsappUrl,
  email,
}: WarrantiesSupportLinksProps) {
  return (
    <aside className={styles.supportBox} aria-labelledby="warranty-support-title">
      <h2 id="warranty-support-title" className={styles.supportTitle}>
        {title}
      </h2>

      <ul className={styles.supportLinks}>
        <li className={styles.supportLinkItem}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.supportLink}
          >
            {whatsappLabel}
          </a>
        </li>
        <li className={styles.supportLinkItem}>
          <a href={`mailto:${email}`} className={styles.supportLink}>
            {emailLabel}
          </a>
        </li>
      </ul>
    </aside>
  );
}
