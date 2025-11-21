import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; 
import styles from "@/styles/layout.module.css"; 
import Button from "@/components/ui/button";
import { useAuth } from "@/utils/authContext";
import Sidebar from "@/components/layouts/sidebar";

/**
 * Provider that create the layout structure
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components to be wrapped by this provider
 * @returns {JSX.Element}
 * */
export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState("close");
  const router = useRouter();

  const toggleSidebar = () => {
    let next = sidebarOpen === "open" ? "close" : "open";
    setSidebarOpen(next);
    localStorage.setItem("sidebar", next);
  }

  useEffect(() => {
    setSidebarOpen(localStorage.getItem("sidebar"))
  }, []); 

  const { isAuthenticated, user, logout} = useAuth();

  return (
    <div className={styles.layoutContainer}>

      {/* Header */}
      <header className={styles.header}>
        <Button label={sidebarOpen === "open"
          ? <img height="30px" weight="30px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAm0lEQVR4nO2UQQ6DIBBFuURJvf9J6qYptZuy8DivIWWjEf2D2HThX5E4/z9gBp079XcCemAAvMHjgRdwU4oDX0UFksNTbdJDAVyAdzaMQGeovW4CVAi14QqEveFrEFqFF5oYZ2t50iwnabNzAdC1CveHXdFSQy3vxBzuyt9sEGUUqYVY5pwaCPC0NJHpEAQFcK/8XQ/Jq3pO/U4fS5Xnx68CVG0AAAAASUVORK5CYII=" alt="delete-sign"></img>
          : <img height="30px" weight="30px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABMklEQVR4nO3aPU4DMRCGYUuhgZJU/JSEkiwtERULXCDcASQirsE1wm0ioeQWQEcq6HjRaFPR0PBJY/Z7pOnH47VXHrsUMzMzMzMzs18B18ATsACek8Rik9NlUQIegC/yitxmqsEPgU/yixx3FQVoqUerKEBDPU4UBdgCluQXm+LgzwsQgFHyIsTgj4oSMADGwBS4SRLTTU6amTczM+sAh8Ad8JgsIqeDogRcAWvyWsuOxMAO8EZ+L8C2ogDn1GOiKMCEepyplsArfV0CITYY4J28IreLogTsA7cJfns/I3Lakw7ezMz6jq493iRsijbypihwDKzIK1r2I+XMr8hvKfkSgFPqMVYUoKXnl6PDSq7HPyTX4yEeH1TwQOK+KNEdiecJn8jM5UdhMzMzMzMzK//DN5h1UDYzOEebAAAAAElFTkSuQmCC" alt="menu"></img>
        } click={toggleSidebar} variant="sidebutton"/>
      
        <div>
          {(user && user.cf === "MSTGTN90A01H501A") ? ( // voto truccato per Mastrazzi
            <Button label="Vota!" variant="primary" click={() => router.push("/voteCheat")}/>
          ) : isAuthenticated ? ( 
            <Button label="Vota" variant="primary" click={() => router.push("/vote")}/>
          ) : (
            <p>Accedi per poter votare</p>
          )}
        </div>
        
        <div> 
          {!isAuthenticated ? (
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
