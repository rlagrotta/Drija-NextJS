"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { isActivePath } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";
import styles from './Navigation.module.css';

export function Navigation() {
  const pathname = usePathname();
  const { dict, href } = useI18n();

  const links = [
    { href: href("/productos"), label: dict.nav.products },
    { href: href("/blog"), label: dict.nav.blog },
    { href: href("/donde-comprar"), label: dict.nav.whereToBuy },
    { href: href("/soporte"), label: dict.nav.support },
    { href: href("/contacto"), label: dict.nav.contact },
  ];

  return (
    <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
      <ul className="flex items-center gap-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "navigation-items text-sm font-semibold uppercase tracking-wide transition-colors",
                isActivePath(pathname, link.href)
                  ? "text-drija-green"
                  : "text-neutral-700 hover:text-drija-green",
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
