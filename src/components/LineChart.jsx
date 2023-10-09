import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // Import ChartJS from chart.js/auto
import "chartjs-plugin-zoom"; // Import the zoom plugin
import zoomPlugin from "chartjs-plugin-zoom";

function LineChart({
  array,
  selectedColumn,
  secondSelectedColumn,
  lineChartRef,
}) {
  const [chartData, setChartData] = useState(null);

  // Register the zoom plugin
  ChartJS.register(zoomPlugin);

  useEffect(() => {
    if (array.length > 0 && selectedColumn) {
      // Extract the values of the selected column
      const values1 = array
        .map((item) => parseFloat(item[selectedColumn]))
        .filter((value) => !isNaN(value));

      let values2 = [];

      if (array.length > 0 && selectedColumn && secondSelectedColumn) {
        values2 = array
          .map((item) => parseFloat(item[secondSelectedColumn]))
          .filter((value) => !isNaN(value));
      }

      // Create the chart data
      const labels = values1.map((_, index) => `Data Point ${index + 1}`);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: selectedColumn,
            data: values1,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderWidth: 2,
            fill: false,
            yAxisID: "linear",
          },
          // Conditionally render the secondSelectedColumn block
          secondSelectedColumn && {
            label: secondSelectedColumn,
            data: values2,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            borderWidth: 2,
            fill: false,
            yAxisID: "linear",
          },
        ].filter(Boolean), // Filter out falsy values (in case secondSelectedColumn is undefined)
      });
    }
  }, [array, selectedColumn, secondSelectedColumn]);

  const chartContainerStyle = {
    width: "100%",
    height: "600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="mt-5 " style={chartContainerStyle} ref={lineChartRef}>
      {chartData && (
        <Line
          data={chartData}
          className="bg-white rounded px-2"
          options={{
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Data Points",
                },
              },
              y: {
                position: "left",
                title: {
                  display: true,
                  text: "Value",
                },
                ticks: {
                  display: false,
                },
              },
            },
            plugins: {
              title: {
                display: true,
                text: "Value Chart",
              },
              legend: {
                display: true,
                position: "top",
              },
              zoom: {
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  mode: "x",
                  speed: 100,
                },
                pan: {
                  enabled: true,
                  mode: "x",
                  speed: 0.5,
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default LineChart;
