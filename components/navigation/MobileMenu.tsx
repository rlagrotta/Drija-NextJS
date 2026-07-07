"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import {
  CategoriesMobileAccordion,
  useOptionalCategoriesMenuControl,
} from "@/components/navigation/CategoriesMegaMenu";
import {
  SupportMobileAccordion,
  useOptionalSupportMenuControl,
} from "@/components/navigation/SupportMenu";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useI18n } from "@/lib/i18n/context";
import { isActivePath } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";

import styles from "./MobileMenu.module.css";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  headerRef: RefObject<HTMLElement | null>;
};

export function MobileMenu({ open, onClose, headerRef }: MobileMenuProps) {
  const pathname = usePathname();
  const { dict, href } = useI18n();
  const [headerOffset, setHeaderOffset] = useState(0);
  const prevOpenRef = useRef(open);
  const closeCategoriesMenu = useOptionalCategoriesMenuControl()?.close;
  const closeSupportMenu = useOptionalSupportMenuControl()?.close;

  useBodyScrollLock(open);

  useEffect(() => {
    if (prevOpenRef.current && !open) {
      closeCategoriesMenu?.();
      closeSupportMenu?.();
    }
    prevOpenRef.current = open;
  }, [closeCategoriesMenu, closeSupportMenu, open]);

  useEffect(() => {
    if (!open) return;

    const measureHeader = () => {
      setHeaderOffset(headerRef.current?.offsetHeight ?? 0);
    };

    measureHeader();

    const headerElement = headerRef.current;
    if (!headerElement) return;

    const resizeObserver = new ResizeObserver(measureHeader);
    resizeObserver.observe(headerElement);
    window.addEventListener("resize", measureHeader);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureHeader);
    };
  }, [headerRef, open]);

  const mobileLinks = [
    { href: href("/blog"), label: dict.nav.blog },
    { href: href("/donde-comprar"), label: dict.nav.whereToBuy },
    { href: href("/contacto"), label: dict.nav.contact },
  ];

  return (
    <AnimatePresence>
      {open ? (
        <motion.nav
          id="mobile-menu"
          aria-label={dict.nav.mobileMenu}
          aria-modal="true"
          className={styles.panel}
          style={{ top: headerOffset }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <div className={styles.scrollArea}>
            <ul className={styles.list}>
              <CategoriesMobileAccordion onNavigate={onClose} />
              <li className={styles.listItem}>
                <Link
                  href={mobileLinks[0].href}
                  className={cn(
                    styles.link,
                    isActivePath(pathname, mobileLinks[0].href) && styles.linkActive,
                  )}
                  onClick={onClose}
                >
                  {mobileLinks[0].label}
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link
                  href={mobileLinks[1].href}
                  className={cn(
                    styles.link,
                    isActivePath(pathname, mobileLinks[1].href) && styles.linkActive,
                  )}
                  onClick={onClose}
                >
                  {mobileLinks[1].label}
                </Link>
              </li>
              <SupportMobileAccordion onNavigate={onClose} />
              <li className={styles.listItem}>
                <Link
                  href={mobileLinks[2].href}
                  className={cn(
                    styles.link,
                    isActivePath(pathname, mobileLinks[2].href) && styles.linkActive,
                  )}
                  onClick={onClose}
                >
                  {mobileLinks[2].label}
                </Link>
              </li>
            </ul>
          </div>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
}
