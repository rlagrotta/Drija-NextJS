"use client";

import { useId } from "react";

import styles from "@/components/registro/RegistroPage.module.css";

type RegistroFileUploadProps = {
  label: string;
  fileName?: string;
  noFileLabel: string;
  tone?: "green" | "blue";
  onChange: (file: File | null) => void;
};

export function RegistroFileUpload({
  label,
  fileName,
  noFileLabel,
  tone = "green",
  onChange,
}: RegistroFileUploadProps) {
  const inputId = useId();

  return (
    <div className={styles.uploadField}>
      <input
        id={inputId}
        type="file"
        accept="image/*,application/pdf"
        className={styles.uploadInput}
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      />
      <label
        htmlFor={inputId}
        className={`${styles.uploadButton} ${
          tone === "blue" ? styles.uploadButtonBlue : styles.uploadButtonGreen
        }`}
      >
        {label}
      </label>
      <span className={styles.uploadFileName}>{fileName ?? noFileLabel}</span>
    </div>
  );
}
