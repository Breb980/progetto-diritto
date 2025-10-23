/* Functions for export the inputGroup construct */
import React from "react";
import styles from "@/styles/inputGroup.module.css";

/** 
 * 
 * @param {Object} props - All standard input props - only for Input
 * @param {React.ReactNode} props.children - Components to be wrapped by this provider
 * @returns {JSX.Element}
 */

export function InputGroup({ children }) {
  return <div className={styles.group}>{children}</div>;
}

export function InputLeft({ children }) {
  return <div className={styles.left}>{children}</div>;
}

export function InputRight({ children }) {
  return <div className={styles.right}>{children}</div>;
}

export function Input({ ...props }) {
  return <input className={styles.input} {...props} />;
}


/**
 * Select (singola o multipla)
 * @param {Object} props
 * @param {Array<{value: string, label: string}>} props.options - menu options
 * @param {boolean} [props.multiple=false] - if true, enable multiple selection
 * @returns {JSX.Element}
*/
export function InputSelect({options = [], multiple = false, placeholder = "-- Seleziona un'opzione --", ...props }) {
  return (
    <select
      className={`${styles.input} ${styles.select}`}
      multiple={multiple}
      {...props}
    >
      {/* Placeholder for single selection, disable: not selectable, hidden: placeholder hidden*/}
      {!multiple && <option value="" disable hidden>{placeholder}</option>}

      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}