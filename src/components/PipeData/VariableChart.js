import React from "react";

import { Line } from "react-chartjs-2";

import "./VariableChart.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function VariableChart({ dateLabels, pipeData, variable, color, icon }) {
  const dataForGraph = {
    labels: dateLabels,
    datasets: [{ label: variable, data: pipeData }],
  };
  return (
    <div className="LineChart">
      <div className="LineChart__title">
        <img src={icon} alt="" className="LineChart__title__logo" />
        <h3 style={{ color }} className="LineChart__title__text">
          {variable}
        </h3>
      </div>
      <div className="LineChart__canvas">
        <Line
          data={dataForGraph}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            elements: {
              line: {
                borderColor: color,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export { VariableChart };
