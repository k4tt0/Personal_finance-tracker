import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { db } from '../config/firebaseConfig';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore'; 

const ReportGeneration = () => {
  const [timePeriod, setTimePeriod] = useState("week");
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Expenses',
        data: [],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  });

  useEffect(() => {
    fetchData(); // Fetch data whenever the component mounts or time period changes
  }, [timePeriod]);

  // Function to fetch data from Firestore based on time period
  const fetchData = async () => {
    const expensesRef = collection(db, 'expenses');
    const currentDate = new Date();
    let startDate;

    // Set the start date based on the selected time period
    if (timePeriod === "week") {
      startDate = new Date(currentDate.setDate(currentDate.getDate() - 7)); // Last 7 days
    } else if (timePeriod === "month") {
      startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1)); // Last month
    } else if (timePeriod === "year") {
      startDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1)); // Last year
    }

    const q = query(
      expensesRef,
      where('date', '>=', Timestamp.fromDate(startDate)) // Fetch expenses after the start date
    );

    try {
      const querySnapshot = await getDocs(q);
      const expenseData = [];
      querySnapshot.forEach((doc) => {
        expenseData.push(doc.data());
      });

      
      formatChartData(expenseData);
    } catch (error) {
      console.error("Error fetching expenses data: ", error);
    }
  };

  // Function to format the chart data based on the fetched expenses
  const formatChartData = (expenseData) => {
    let labels = [];
    let expenses = [];

    // Process the data for the chart based on the selected time period
    if (timePeriod === "week") {
      labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      expenses = Array(7).fill(0); 
      expenseData.forEach((expense) => {
        const expenseDate = expense.date.toDate(); 
        const dayOfWeek = expenseDate.getDay(); 
        expenses[dayOfWeek] += expense.amount; 
      });
    } else if (timePeriod === "month") {
      labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
      expenses = Array(4).fill(0); 
      expenseData.forEach((expense) => {
        const expenseDate = expense.date.toDate();
        const week = Math.floor(expenseDate.getDate() / 7);
        expenses[week] += expense.amount;
      });
    } else if (timePeriod === "year") {
      labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      expenses = Array(12).fill(0);
      expenseData.forEach((expense) => {
        const expenseDate = expense.date.toDate();
        const month = expenseDate.getMonth(); 
        expenses[month] += expense.amount;
      });
    }

    
    setData({
      labels: labels,
      datasets: [
        {
          label: 'Expenses',
          data: expenses,
          fill: false,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    });
  };

  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value); // Update the time period
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
      <div style={{ width: '100%', height: '50%' }}>
        <Line data={data} />
      </div>
    </div>
  );
};

export default ReportGeneration;
