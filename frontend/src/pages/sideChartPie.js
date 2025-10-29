import axios from "axios";
//useState: memorize local state in the page
import { useState, useEffect} from "react";

import Button from "@/components/ui/button";
import Layout from "@/components/layouts/layout";
import Chart from "@/components/ui/chart";


//GETTER from backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://backend:5000";

/** Homepage
 *  
 *  @returns {JSX.Element}
*/
export default function PieHome() {

  const [chartData, setChartData] = useState({ labels: [], data: [] });
  
  const fetchData = async () => {
      try {
        const res = await axios.get(API_URL + "/vote/stats"); 

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
            <h1>Grafico a torta</h1>
            <Chart labels={chartData.labels} data={chartData.data} title="Voti per paese" typology="pie" />
            <Button label="Aggiorna grafico" click={fetchData} variant="primary"/>
        </div>
    </Layout>
  );
}