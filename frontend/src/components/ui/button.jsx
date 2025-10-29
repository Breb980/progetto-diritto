/* Button function for build the buttons */
import React from "react";
import styles from "@/styles/button.module.css";

/**
 * Button component — renders a customizable button element.
 *
 * @param {Object} props - Component properties
  * @param {string} props.label - text view on button
  * @param {function} [props.click] - function execute on click
  * @param {"primary" | "secondary" | "outline"} [props.variant="primary"] - style of button
  * @param {"small" | "medium" | "large"} [props.size="medium"] - dimension of button
  * @param {React.ReactNode} [props.icon] - optional icon view before text (not tested for now)
 * @returns {JSX.Element} - custom `<button>` element
 */
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

