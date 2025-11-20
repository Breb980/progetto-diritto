import api from "@/utils/api";
import { useState, useEffect } from "react";

import Layout from "@/components/layouts/layout";
import styles from "@/styles/layout.module.css"; 

/**
 * generic page for visualize any content of text page
 * @param {string} api_url - endpoint to call 
 * @param {string} title - page title
 */
export default function TextPage({ api_url, title, subtitle, children }) {

  const [textData, setTextData] = useState([]);
  
  const fetchData = async () => {
      try {
        const res = await api.get(`${api_url}`); 
        setTextData(res.data.options);
      } catch (err) {
        console.error("Errore caricamento dati:", err);
      }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <div style={{ padding: "20px" }}>

        {/* Title */}
        <h1 style={{ paddingBottom: "15px", color: "#3d3f66" }}>{title}</h1>

        {/* Subtitle */}
        {subtitle && (<h2><p style={{  color: "#555" }}>{subtitle}</p></h2>)}

        {/* List with descriptions  */}
        {textData.map((item, index) => (
          <div key={index} className={styles.contentPage}>
            <h3 style={{ margin: "0 0 10px 0", color: "#222" }}>{item.label}</h3>
            <div style={{ marginLeft: "20px", color: "#444", whiteSpace: "pre-line"}}>
              {item.text}
            </div>
            <br />
          </div>
        ))}
      
      {/* Others block */}
      {children}
      </div>
    </Layout>
  );
}