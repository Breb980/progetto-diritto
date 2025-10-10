/* Functions for export the inputGroup construct */
import React from "react";
import styles from "@/styles/inputGroup.module.css";

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
