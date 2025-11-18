import React, { useState } from "react";
import { useRouter } from "next/router"; 
import styles from "@/styles/layout.module.css"; 
import Button from "@/components/ui/button";
import { useAuth } from "@/utils/authContext";
import Sidebar from "@/components/ui/sidebar";

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

      {/* Header */}
      <header className={styles.header}>
        <Button label={sidebarOpen ? "Hide Sidebar" : "Show Sidebar"} click={toggleSidebar} variant="sidebutton"/>
      
        <div>
          {isAuthenticated ? (
            <Button label="Vota" variant="primary" click={() => router.push("/vote")}/>
          ) : (
            <p>Accedi per poter votare</p>
          )}
        </div>
        
        <div> 
          {!isAuthenticated ? (
          // className={styles.profile} nel div? TODO
          // Caso 1: utente non loggato
            <Button
              label="Accedi"
              click={() => router.push("/login")}
              variant="primary"
            />
          ) : user ? (
            // Caso 2: utente autenticato e dati caricati
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
            // Caso 3: autenticato ma dati non ancora caricati
            <p>Caricamento...</p>
          )}
        </div>

      </header>

      {/* Sidebar + Body */}
      <div className={styles.body}>
        <Sidebar sidebarOpen={sidebarOpen} />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
