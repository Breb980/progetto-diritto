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