import React, { useState } from "react";
import { useRouter } from "next/router"; 
import styles from "@/styles/layout.module.css"; 
import Button from "@/components/ui/button";
import { useAuth } from "@/utils/authContext";

/**
 * Provider that create the layout structure
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components to be wrapped by this provider
 * @returns {JSX.Element}
 * */
export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const { isAuthenticated, user, logout} = useAuth();

  return (
  <div className={styles.layoutContainer}>
   {/*<button onClick={toggleSidebar} className={`${buttons.btn} ${buttons["secondary"]} ${buttons["medium"]}`}>
      {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
    </button>*/}
  {/* Header */}
  <header className={styles.header}>
    <Button label={sidebarOpen ? "Hide Sidebar" : "Show Sidebar"} click={toggleSidebar} variant="secondary"/>
    
    <div>
      {isAuthenticated ? (
        <Button label="Vota" variant="primary" click={() => router.push("/vote")}/>
  ) : (
    <p>Accedi per poter votare</p>
  )}
</div>

    <div className={styles.profile}>
  {!isAuthenticated ? (
    // Caso: utente non loggato
    <Button
      label="Accedi"
      click={() => router.push("/login")}
      variant="primary"
    />
  ) : user ? (
    // Caso: utente autenticato e dati caricati
    <div>
      <span style={{ fontWeight: "bold", color: "#000000ff", fontSize: "1rem" }}>
      {`${user.name} ${user.surname}`} </span>
      <Button
        label="Disconnettiti"
        click={logout}
        variant="primary"
        style={{ marginLeft: "10px" }}
      />
    </div>
  ) : (
    // Caso: autenticato ma dati non ancora caricati
    <p>Caricamento...</p>
  )}
</div>

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
