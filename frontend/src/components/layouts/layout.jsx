import React, { useState } from "react";
import styles from "@/styles/layout.module.css"; 
import buttons from "@/styles/button.module.css";


export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
  <div className={styles.layoutContainer}>
  {/* Header */}
  <header className={styles.header}>
    <button onClick={toggleSidebar} className={`${buttons.btn} ${buttons["secondary"]} ${buttons["medium"]}`}>
      {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
    </button>
    <button onClick={""} className={`${buttons.btn} ${buttons["primary"]} ${buttons["medium"]}`}>
      {"Vota"}
    </button>
    <button onClick={""} className={`${buttons.btn} ${buttons["primary"]} ${buttons["medium"]}`}>
      {"Accedi"}
    </button>
    <div className={styles.profile}>Profile</div>
  </header>

  {/* sidebar + body */}
  <div className={styles.body}>
    <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}>
      <div className={styles.sidebarLogo}>Logo</div>
      <nav className={styles.sidebarNav}>
        <ul>
          <li>Dashboard</li>
          <li>Users</li>
          <li>Settings</li>
        </ul>
      </nav>
    </aside>

    <main className={styles.content}>
      {children}
    </main>
  </div>
</div>

  );
}
