"use client";

import styles from "@/components/registro/RegistroPage.module.css";

type RegistroRadioGroupProps<T extends string> = {
  name: string;
  legend: string;
  value: T | "";
  options: readonly T[];
  getLabel: (value: T) => string;
  onChange: (value: T) => void;
};

export function RegistroRadioGroup<T extends string>({
  name,
  legend,
  value,
  options,
  getLabel,
  onChange,
}: RegistroRadioGroupProps<T>) {
  return (
    <fieldset className={styles.fieldGroup}>
      <legend className={styles.label}>{legend}</legend>
      <ul className={styles.optionList}>
        {options.map((option) => {
          const inputId = `${name}-${option}`;

          return (
            <li key={option} className={styles.optionItem}>
              <input
                id={inputId}
                type="radio"
                name={name}
                className={styles.optionInput}
                checked={value === option}
                onChange={() => onChange(option)}
              />
              <label htmlFor={inputId}>{getLabel(option)}</label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
