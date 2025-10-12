/* Button function for build the buttons */
import React from "react";
import styles from "@/styles/button.module.css";

export default function Button({ 
  label, 
  click, 
  variant = "primary", 
  size = "medium", 
  icon 
}) {
  return (
    <button className={`${styles.btn} ${styles[variant]} ${styles[size]}`} onClick={click}>
      {icon && <span className={styles["btn-icon"]}>{icon}</span>}
      {label}
    </button>
  );
}

