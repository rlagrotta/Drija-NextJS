"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  buildProductSearchIndex,
  createProductSearchIndex,
  searchProducts,
} from "@/lib/search/product-search";
import { useProductSearchCatalog } from "@/hooks/useProductSearchCatalog";
import { useI18n } from "@/lib/i18n/context";

import styles from "@/components/registro/RegistroPage.module.css";

type ProductModelAutocompleteProps = {
  label: string;
  value: string;
  onChange: (value: string, slug?: string) => void;
};

export function ProductModelAutocomplete({
  label,
  value,
  onChange,
}: ProductModelAutocompleteProps) {
  const { locale, href, dict } = useI18n();
  const { catalog, loading } = useProductSearchCatalog(locale, true);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const searchItems = useMemo(() => {
    if (!catalog) return [];
    return buildProductSearchIndex(catalog.products, catalog.categories, href);
  }, [catalog, href]);

  const fuse = useMemo(
    () => createProductSearchIndex(searchItems),
    [searchItems],
  );

  const suggestions = useMemo(
    () => (value.trim().length >= 2 ? searchProducts(fuse, value, 6) : []),
    [fuse, value],
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.fieldGroup} ref={wrapRef}>
      <label className={styles.label} htmlFor="registro-product-model">
        {label}
      </label>
      <div className={styles.autocompleteWrap}>
        <div className={styles.searchFieldWrap}>
          <input
            id="registro-product-model"
            type="text"
            className={`${styles.field} ${styles.searchField}`}
            value={value}
            autoComplete="off"
            onChange={(event) => {
              onChange(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
          />
          <svg
            className={styles.searchIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
        </div>

        {open && suggestions.length > 0 ? (
          <ul className={styles.suggestions} role="listbox">
            {suggestions.map((item) => (
              <li key={item.id} role="option">
                <button
                  type="button"
                  className={styles.suggestionButton}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    onChange(item.name, item.slug);
                    setOpen(false);
                  }}
                >
                  {item.name}
                  <span className={styles.suggestionMeta}>
                    {item.sku} · {item.categoryName}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {loading ? (
        <p className={styles.uploadFileName}>{dict.registroForm.loadingProducts}</p>
      ) : null}
    </div>
  );
}
