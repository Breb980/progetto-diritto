import api from "@/utils/api";
//useState: memorize local state in the page
import { useState, useEffect } from "react";

import Button from "@/components/ui/button";
import Layout from "@/components/layouts/layout";
import Chart from "@/components/charts/chart";
import styles from "@/styles/chart.module.css";



/**
 * generic page for visualize any type of chart
 * @param {string} type - chart type (es. "bar", "pie", "line")
 * @param {string} title - chart title
 */
export default function ChartPage({ type = "bar", title = "Statistiche voti" }) {

  const [chartData, setChartData] = useState({ labels: [], data: [] });
  
  const fetchData = async () => {
      try {
        const res = await api.get("/vote/stats"); 

        const labels = res.data.results.map(r => r.choice);
        const data = res.data.results.map(r => r.count);
        ///console.log("labels", labels);
        ///console.log("data", data);
        setChartData({ labels, data });
      } catch (err) {
        console.error("Errore caricamento dati:", err);
      }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // if the try went well, RETURN the users list 
    return (
      <Layout>
          <div style={{ padding: "20px" }}>
              <div className={styles.headchart}>
                <h1>{title}</h1>
                <Button label="Aggiorna grafico" click={fetchData} variant="primary" />
              </div>
              <Chart labels={chartData.labels} data={chartData.data} title="Voti per candidato" typology={type} />
          </div>
      </Layout>
    );

}