import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ReportGeneration = () => {
  const [timePeriod, setTimePeriod] = useState("week");
  const [data, setData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: 'Expenses',
        data: [12, 19, 3, 5, 2, 3, 7],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  });

  const handleTimePeriodChange = (e) => {
    const period = e.target.value;
    setTimePeriod(period);

    // Update data based on the selected time period
    if (period === "week") {
      setData({
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: 'Expenses',
            data: [12, 19, 3, 5, 2, 3, 7],
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      });
    } else if (period === "month") {
      setData({
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          {
            label: 'Expenses',
            data: [50, 100, 150, 200],
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      });
    } else if (period === "year") {
      setData({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: 'Expenses',
            data: [300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400],
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      });
    }
  };

  return (
    <div>
      <h2>Report Generation</h2>
      <div>
        <label htmlFor="timePeriod">Select Time Period: </label>
        <select id="timePeriod" value={timePeriod} onChange={handleTimePeriodChange}>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>
      <div>
        <Line data={data} />
      </div>
    </div>
  );
};

export default ReportGeneration;