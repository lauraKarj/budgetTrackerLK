import React from 'react'
import { fetchUserData } from '../functions'
import { Line } from 'react-chartjs-2';

/**
* Function to create a linear chart element based on the given income data and base ID.
* 
* Takes an array of income data objects and displays a linear chart
* representing the cumulative sum of incomes over time. Uses the Chart.js library 
* for rendering the chart.
* 
* @param {Object[]} incomeData - An array of income data objects.
* @param {string} baseId - The ID of the income base to handle.
* 
* @returns {JSX.Element} A linear chart component displaying the cumulative sum of incomes.
 */

function IncomeBaseLinear({baseId, incomeData}) {
    const bases = fetchUserData('incomeBases');
    // Collect incomes from selected base.
    const baseIncomes = [];
    let baseName = '';
    let baseAmount = 0;

    for (const base of bases) {
        if (base.id === baseId) {
            baseName = base.name;
        }
    }

    // Check that user has incomes and if more than one, sort them by oldest to newest
    if (incomeData && incomeData.length > 1) {
        incomeData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA - dateB; // Sort in descending order
        });
      }
    
    // Array for saving regressive amounts.
    const amountsRegressive = [0];
    let cumulativeSum = baseAmount;

    // Calculate values to draw by starting from oldest income to adding next to previous.
    for (const income of incomeData ) {
        if (income.incomeBaseId === baseId) {
            baseIncomes.push(income);
            cumulativeSum += income.amount;
            amountsRegressive.push(cumulativeSum);
        }
    }

    const data = {
        labels: amountsRegressive,
        datasets: [{
            label: `${baseName}`,
            data: amountsRegressive,
            fill: false,
            backgroundColor: 'rgba(206, 155, 219, 0.5)',
            borderColor: 'rgba(206, 155, 219, 0.8)',
            tension: 0.1
        }]
    };

    const config = {
        type: 'line',
        data: data,
      };

  return (
    <div className='chartArea'>
        <h2>Incomes for {baseName}</h2>
        <Line data={data} options={config}/>
    </div>
  )
}

export default IncomeBaseLinear