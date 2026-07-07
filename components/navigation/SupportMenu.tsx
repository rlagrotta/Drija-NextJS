"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { navMenuRegistry } from "@/lib/navigation/menu-registry";
import { buildSupportNavItems, isSupportNavPath } from "@/lib/support/nav-links";
import { useI18n } from "@/lib/i18n/context";
import { isActivePath } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";

import menuStyles from "./SupportMenu.module.css";
import navStyles from "./Navigation.module.css";

const panelVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

type SupportMenuContextValue = {
  open: boolean;
  toggle: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  panelRef: React.RefObject<HTMLDivElement | null>;
};

const SupportMenuContext = createContext<SupportMenuContextValue | null>(null);

function useSupportMenuContext() {
  const context = useContext(SupportMenuContext);
  if (!context) {
    throw new Error("Support menu components must be used within SupportMenuRoot");
  }
  return context;
}

export function useSupportMenuControl() {
  return useSupportMenuContext();
}

export function useOptionalSupportMenuControl() {
  return useContext(SupportMenuContext);
}

function NavChevron({ open }: { open: boolean }) {
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 border-r-2 border-b-2 border-drija-green transition-transform duration-200",
        open ? "-translate-y-px rotate-[-135deg]" : "translate-y-px rotate-45",
      )}
      aria-hidden
    />
  );
}

export function SupportMenuRoot({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) {
        return;
      }
      close();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [close, open]);

  useEffect(() => {
    return navMenuRegistry.registerSupportMenu(close);
  }, [close]);

  useEffect(() => {
    close();
  }, [close, pathname]);

  return (
    <SupportMenuContext.Provider
      value={{ open, toggle, close, triggerRef, panelRef }}
    >
      {children}
    </SupportMenuContext.Provider>
  );
}

export function SupportMenuTrigger() {
  const pathname = usePathname();
  const { dict } = useI18n();
  const { open, toggle, triggerRef } = useSupportMenuContext();
  const routeActive = isSupportNavPath(pathname);

  const handleToggle = () => {
    navMenuRegistry.closeCategoriesMenu();
    toggle();
  };

  return (
    <button
      ref={triggerRef}
      type="button"
      className={navStyles.navCategoriesTrigger}
      aria-expanded={open}
      aria-haspopup="true"
      aria-label={dict.nav.support}
      onClick={handleToggle}
    >
      <span
        className={cn(
          navStyles.navLink,
          (open || routeActive) && navStyles.navLinkActive,
        )}
      >
        {dict.nav.support}
      </span>
      {open ? (
        <span
          className={cn(
            navStyles.navCategoriesChevron,
            navStyles.navCategoriesChevronOpen,
          )}
          aria-hidden
        />
      ) : null}
    </button>
  );
}

function SupportMenuLinks({
  onNavigate,
  className,
  linkClassName,
}: {
  onNavigate: () => void;
  className?: string;
  linkClassName?: string;
}) {
  const pathname = usePathname();
  const { dict, href } = useI18n();
  const items = buildSupportNavItems(dict, href);

  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            onClick={onNavigate}
            className={cn(
              menuStyles.link,
              linkClassName,
              isActivePath(pathname, item.href) && menuStyles.linkActive,
            )}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SupportMenuPanel() {
  const { open, close, panelRef } = useSupportMenuContext();

  return (
    <AnimatePresence>
      {open ? (
        <div className={menuStyles.panelAnchor}>
          <motion.div
            ref={panelRef}
            className={menuStyles.panelMotion}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={panelVariants}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className={menuStyles.panelInner}>
              <SupportMenuLinks onNavigate={close} />
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

export function SupportMobileAccordion({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const { dict } = useI18n();
  const { open, toggle, close } = useSupportMenuContext();
  const routeActive = isSupportNavPath(pathname);

  const handleToggle = () => {
    navMenuRegistry.closeCategoriesMenu();
    toggle();
  };

  const handleNavigate = () => {
    close();
    onNavigate?.();
  };

  return (
    <li className="border-b border-neutral-100 last:border-b-0">
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between py-3 text-sm font-semibold uppercase",
          open || routeActive ? "text-drija-green" : "text-neutral-700",
        )}
        aria-expanded={open}
        onClick={handleToggle}
      >
        <span>{dict.nav.support}</span>
        <NavChevron open={open} />
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <SupportMenuLinks
              onNavigate={handleNavigate}
              className="space-y-1 pb-4 pl-3"
              linkClassName="!px-0 !py-1.5 !font-semibold !uppercase tracking-wide"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
