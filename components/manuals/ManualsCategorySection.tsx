"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useRef, useState, type ReactNode, type Ref } from "react";
import type {
  ProductManualGroup,
  ProductManualItem,
  ProductManualSection,
} from "@/types/product-manual";
import { cn } from "@/lib/utils";

import styles from "./ManualsSection.module.css";

const collapseTransition = { duration: 0.25, ease: "easeOut" as const };

type ManualsCategorySectionProps = {
  section: ProductManualSection;
  emptyLabel: string;
  downloadManualTemplate: string;
};

export function ManualsCategorySection({
  section,
  emptyLabel,
  downloadManualTemplate,
}: ManualsCategorySectionProps) {
  const defaultGroupId = section.groups[0]?.id ?? "";
  const [activeGroupId, setActiveGroupId] = useState(defaultGroupId);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const groupRefs = useRef(new Map<string, HTMLDivElement>());

  const activeGroup = useMemo(
    () => section.groups.find((group) => group.id === activeGroupId) ?? section.groups[0],
    [activeGroupId, section.groups],
  );

  const visibleItems = activeGroup?.items ?? [];

  const toggleItem = (slug: string) => {
    setOpenSlug((current) => (current === slug ? null : slug));
  };

  const handleGroupChange = (group: ProductManualGroup) => {
    if (group.id === activeGroupId) {
      return;
    }

    setActiveGroupId(group.id);
    setOpenSlug(null);

    if (window.matchMedia("(max-width: 639px)").matches) {
      requestAnimationFrame(() => {
        groupRefs.current
          .get(group.id)
          ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }
  };

  const setGroupRef = (groupId: string) => (node: HTMLDivElement | null) => {
    if (node) {
      groupRefs.current.set(groupId, node);
      return;
    }

    groupRefs.current.delete(groupId);
  };

  if (section.groups.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby={`manuals-${section.slug}`}>
      <h2 id={`manuals-${section.slug}`} className={styles.sectionTitle}>
        {section.name}
      </h2>

      <div className={styles.mobileLayout} aria-label={section.name}>
        {section.groups.map((group) => (
          <ManualsMobileGroupBlock
            key={group.id}
            ref={setGroupRef(group.id)}
            group={group}
            isActive={activeGroupId === group.id}
            openSlug={openSlug}
            emptyLabel={emptyLabel}
            downloadManualTemplate={downloadManualTemplate}
            onActivate={() => handleGroupChange(group)}
            onToggleItem={toggleItem}
          />
        ))}
      </div>

      <div className={styles.desktopLayout}>
        <div className={styles.filters} role="tablist" aria-label={section.name}>
          {section.groups.map((group) => (
            <GroupPill
              key={group.id}
              group={group}
              isActive={activeGroupId === group.id}
              onClick={() => handleGroupChange(group)}
            />
          ))}
        </div>

        <ManualsGroupList
          items={visibleItems}
          openSlug={openSlug}
          onToggle={toggleItem}
          emptyLabel={emptyLabel}
          downloadManualTemplate={downloadManualTemplate}
          className={styles.list}
        />
      </div>
    </section>
  );
}

type ManualsMobileGroupBlockProps = {
  group: ProductManualGroup;
  isActive: boolean;
  openSlug: string | null;
  emptyLabel: string;
  downloadManualTemplate: string;
  onActivate: () => void;
  onToggleItem: (slug: string) => void;
};

const ManualsMobileGroupBlock = ({
  ref,
  group,
  isActive,
  openSlug,
  emptyLabel,
  downloadManualTemplate,
  onActivate,
  onToggleItem,
}: ManualsMobileGroupBlockProps & {
  ref?: Ref<HTMLDivElement>;
}) => {
  const panelId = `manuals-group-panel-${group.id}`;

  return (
    <div ref={ref} className={styles.mobileGroup}>
      <button
        id={`manuals-mobile-tab-${group.id}`}
        type="button"
        aria-expanded={isActive}
        aria-controls={panelId}
        className={cn(
          styles.filterButton,
          styles.mobilePill,
          isActive && styles.filterButtonActive,
        )}
        onClick={onActivate}
      >
        {group.name}
      </button>

      <AnimatedCollapse
        isOpen={isActive}
        id={panelId}
        aria-labelledby={`manuals-mobile-tab-${group.id}`}
      >
        <ManualsGroupList
          items={group.items}
          openSlug={openSlug}
          onToggle={onToggleItem}
          emptyLabel={emptyLabel}
          downloadManualTemplate={downloadManualTemplate}
          className={cn(styles.list, styles.listMobile)}
        />
      </AnimatedCollapse>
    </div>
  );
};

type GroupPillProps = {
  group: ProductManualGroup;
  isActive: boolean;
  onClick: () => void;
};

function GroupPill({ group, isActive, onClick }: GroupPillProps) {
  return (
    <button
      id={`manuals-desktop-tab-${group.id}`}
      type="button"
      role="tab"
      aria-selected={isActive}
      className={cn(styles.filterButton, isActive && styles.filterButtonActive)}
      onClick={onClick}
    >
      {group.name}
    </button>
  );
}

type AnimatedCollapseProps = {
  isOpen: boolean;
  id?: string;
  className?: string;
  "aria-labelledby"?: string;
  children: ReactNode;
};

function AnimatedCollapse({
  isOpen,
  id,
  className,
  "aria-labelledby": ariaLabelledBy,
  children,
}: AnimatedCollapseProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen ? (
        <motion.div
          id={id}
          role={ariaLabelledBy ? "region" : undefined}
          aria-labelledby={ariaLabelledBy}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={collapseTransition}
          className={cn(styles.animatedPanel, className)}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

type ManualsGroupListProps = {
  items: ProductManualItem[];
  openSlug: string | null;
  onToggle: (slug: string) => void;
  emptyLabel: string;
  downloadManualTemplate: string;
  className?: string;
};

function ManualsGroupList({
  items,
  openSlug,
  onToggle,
  emptyLabel,
  downloadManualTemplate,
  className,
}: ManualsGroupListProps) {
  if (items.length === 0) {
    return (
      <p className={styles.empty} role="status">
        {emptyLabel}
      </p>
    );
  }

  return (
    <ul className={className}>
      {items.map((item) => (
        <ManualsAccordionItem
          key={item.id}
          item={item}
          isOpen={openSlug === item.slug}
          onToggle={() => onToggle(item.slug)}
          downloadLabel={downloadManualTemplate.replace("{product}", item.name)}
        />
      ))}
    </ul>
  );
}

type ManualsAccordionItemProps = {
  item: ProductManualItem;
  isOpen: boolean;
  onToggle: () => void;
  downloadLabel: string;
};

function ManualsAccordionItem({
  item,
  isOpen,
  onToggle,
  downloadLabel,
}: ManualsAccordionItemProps) {
  const panelId = `manual-panel-${item.id}`;

  return (
    <li className={styles.item}>
      <button
        type="button"
        className={cn(styles.trigger, isOpen && styles.triggerOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className={styles.toggleIcon} aria-hidden>
          {isOpen ? "−" : "+"}
        </span>
        <span className={styles.itemName}>{item.name}</span>
      </button>

      <AnimatedCollapse isOpen={isOpen} id={panelId}>
        <div className={styles.panel}>
          <a
            href={item.pdf.src}
            download={item.pdf.filename}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.downloadLink}
            aria-label={downloadLabel}
          >
            <Image
              src="/images/manuals/pdf-icon.png"
              alt=""
              width={48}
              height={48}
              className={styles.pdfIcon}
              aria-hidden
            />
          </a>
        </div>
      </AnimatedCollapse>
    </li>
  );
}
