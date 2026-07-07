"use client";

import styles from "@/components/registro/RegistroPage.module.css";

type RegistroCheckboxGroupProps<T extends string> = {
  legend: string;
  values: T[];
  options: readonly T[];
  getLabel: (value: T) => string;
  onChange: (values: T[]) => void;
};

export function RegistroCheckboxGroup<T extends string>({
  legend,
  values,
  options,
  getLabel,
  onChange,
}: RegistroCheckboxGroupProps<T>) {
  const toggleValue = (option: T) => {
    if (values.includes(option)) {
      onChange(values.filter((value) => value !== option));
      return;
    }

    onChange([...values, option]);
  };

  return (
    <fieldset className={styles.fieldGroup}>
      <legend className={styles.label}>{legend}</legend>
      <ul className={styles.optionList}>
        {options.map((option) => {
          const inputId = `owned-${option}`;

          return (
            <li key={option} className={styles.optionItem}>
              <input
                id={inputId}
                type="checkbox"
                className={styles.optionInput}
                checked={values.includes(option)}
                onChange={() => toggleValue(option)}
              />
              <label htmlFor={inputId}>{getLabel(option)}</label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
