import api from "@/utils/api";
import { useState, useEffect } from "react";

import Layout from "@/components/layouts/layout";


/**
 * generic page for visualize any content of text page
 * @param {string} api_url - endpoint to call 
 * @param {string} title - page title
 */
export default function TextPage({ api_url, title, subtitle }) {

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
        <h1 style={{ paddingBottom: "15px" }}>{title}</h1>

        {subtitle && (<h2><p>{subtitle}</p></h2>)}

        {textData.map((item, index) => (
          <div key={index}>
            <h3><p>{item.label}</p></h3>
            <div style={{ marginLeft: "20px" }}>
              {item.text}
            </div>
            <br />
          </div>
        ))}
      </div>
    </Layout>
  );
}