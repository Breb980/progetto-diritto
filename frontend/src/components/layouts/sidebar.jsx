import styles from "@/styles/layout.module.css"; 

export default function Sidebar({ sidebarOpen }) {
  return (
    <aside className={`${styles.sidebar} ${sidebarOpen === "open" ? styles.open : styles.closed}`}>
      <div>
        <nav>
          <a className={styles.linkhome} href="/">Torna alla Home</a>
        </nav>
        <br />
        <h2>Grafici</h2>
        <nav>
          <a href="/chartBar">Barra</a>
          <a href="/chartPie">Torta</a>
          <a href="/chartCheat">Barra Truccata</a>
        </nav>
        <br />
        <h2>Informazioni</h2>
        <nav>
          <a href="/candidates">Candidati</a>
          <a href="/informations">Documentazione</a>
        </nav>
      </div>
    </aside>
  );
}