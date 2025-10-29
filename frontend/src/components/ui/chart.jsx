import { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; //auto define for "new Chart..."

export default function ChartDisplay({ labels = [], data = [], title = "Statistiche", typology="bar" }) {
    const canvasRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");

        // destroy old chart if exist (for no have duplications)
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
        type: typology,
        data: {
            labels,
            datasets: [
                {
                label: title,
                data,
                backgroundColor: ["#4F46E5", "#22C55E", "#F59E0B"],
                borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true },
            },
            //indexAxis: 'y', per grafico orizzontale
        },
        });
    // cleanup
        return () => chartInstance.current.destroy();
    }, [labels, data, title, typology]);

    return (
        <div style={{ width: "600px", height: "400px", margin: "auto" }}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

// backgroundColor: [
//       'rgba(255, 99, 132, 0.2)',
//       'rgba(255, 159, 64, 0.2)',
//       'rgba(255, 205, 86, 0.2)',
//       'rgba(75, 192, 192, 0.2)',
//       'rgba(54, 162, 235, 0.2)',
//       'rgba(153, 102, 255, 0.2)',
//       'rgba(201, 203, 207, 0.2)'
//     ],
//     borderColor: [
//       'rgb(255, 99, 132)',
//       'rgb(255, 159, 64)',
//       'rgb(255, 205, 86)',
//       'rgb(75, 192, 192)',
//       'rgb(54, 162, 235)',
//       'rgb(153, 102, 255)',
//       'rgb(201, 203, 207)'
//     ],