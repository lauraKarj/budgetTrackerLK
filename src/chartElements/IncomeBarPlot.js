import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

/**
 * Function creates a bar chart element based on the given income data.
 * 
 * @param {Array} incomeData - An array of income data objects. 
 *                             Each object should have `date` and `amount` properties.
 * @returns {JSX.Element} A bar chart component displaying the income data.
 */

function IncomeBarPlot({incomeData}) {
  // Check that user has incomes and if more than one, sort them by oldest to newest
  if (incomeData && incomeData.length > 1) {
      incomeData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB; // Sort in descending order
      });
  }

  const plotData = {
      labels: incomeData.map(income => new Date(income.date).toLocaleDateString()),
      datasets: [
        {
          label: 'All income bases',
          data: incomeData.map(income => income.amount),
          backgroundColor: 'rgba(206, 155, 219, 0.5)',
          borderColor: 'rgb(206, 155, 219, 0.8)',
          borderWidth: 1,
        },
      ],
    };

  const config = {
    type: 'bar',
    data: plotData,
    options: {
      scales: {
        y: {
         beginAtZero: true
        },
      },
    },    
  };

  return (
    <div className='chartArea'>
      <h2>All incomes</h2>
      <Bar data={plotData} options={config}/>
    </div>
  )
}

export default IncomeBarPlot