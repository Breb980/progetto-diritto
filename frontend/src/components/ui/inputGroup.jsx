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
