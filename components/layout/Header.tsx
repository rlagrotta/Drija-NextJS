"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { LocaleSwitcher } from "@/components/navigation/LocaleSwitcher";
import { MarketSelector } from "@/components/navigation/MarketSelector";
import { MarketBar } from "@/components/navigation/MarketBar";
import {
  CategoriesMegaMenuPanel,
  CategoriesMenuRoot,
} from "@/components/navigation/CategoriesMegaMenu";
import {
  SupportMenuRoot,
} from "@/components/navigation/SupportMenu";
import {
  GlobalSearchPanel,
  GlobalSearchRoot,
  GlobalSearchTrigger,
} from "@/components/search/GlobalSearch";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

import styles from './Header.module.css';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { dict, href } = useI18n();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const closeMobileMenu = () => setOpen(false);

  return (
    <CategoriesMenuRoot>
      <SupportMenuRoot>
      <GlobalSearchRoot>
        <header
        ref={headerRef}
        className={cn(
          styles.hero,
          scrolled && styles.heroScrolled,
          "border-b border-transparent",
        )}
      >
        <MarketBar />

        <div
          className={cn(
            "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8",
            styles.navRow,
          )}
        >
          <Link href={href("/")} className="shrink-0" aria-label={dict.common.homeLabel}>
            <Image
              src="/logo.svg"
              alt="DRIJA"
              width={151}
              height={38}
              priority
              className="h-9 w-auto"
              style={{ width: "auto" }}
            />
          </Link>

          <div className={styles.navCluster}>
            <Navigation />
            <div className={styles.headerTools}>
              <GlobalSearchTrigger />
              <MarketSelector />
              <LocaleSwitcher />
            </div>
          </div>

          <button
            type="button"
            className={styles.menuToggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">
              {open ? dict.common.closeMenu : dict.common.openMenu}
            </span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        <GlobalSearchPanel />
        <CategoriesMegaMenuPanel />
        <MobileMenu
          open={open}
          onClose={closeMobileMenu}
          headerRef={headerRef}
        />
      </header>
      </GlobalSearchRoot>
      </SupportMenuRoot>
    </CategoriesMenuRoot>
  );
}
