import styles from "@/styles/layout.module.css"; 

export default function Sidebar({ sidebarOpen }) {
  return (
    <aside className={`${styles.sidebar} ${sidebarOpen === "open" ? styles.open : styles.closed}`}>
      <div>
        <h2>Grafici</h2>
        <nav>
          <a href="/chartBar">Barra</a>
          <a href="/chartPie">Torta</a>
          <a href="/chartCheat">Barra Truccata</a>
          <a className={styles.linkhome} href="/">Torna alla Home</a>
        </nav>
      </div>
    </aside>
  );
}