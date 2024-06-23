import React from 'react'
import { fetchUserData } from '../functions';
import RecentAction from '../components/RecentAction';
import IncomeBarPlot from '../chartElements/IncomeBarPlot';
import IncomeBaseLinear from '../chartElements/IncomeBaseLinear';
import { useState } from 'react'

/**
 * Function returns a page for recent incomes. 
 * Checks if user has any incomes. Offers user to see stats and visualizations of recent incomes.
 * Includes table element about incomes details.
 * 
 * @returns The recent incomes page component.
 */

const RecentIncomes = () => {
    const incomes = fetchUserData('incomes');
    const bases = fetchUserData('incomeBases');
    const [activeBase, setActiveBase] = useState('closed');

    return ( 
      <div className='recent'>
          { incomes && incomes.length >= 1 ? (
            <div className='incomePage'>
              <div>
                <h1>See stats for your incomes</h1>
                <button onClick={() => setActiveBase('all')} className='statButton'>All</button>
                {bases.map(base => (<button key={base.id} onClick={() => setActiveBase(base.id)}
                  className='statButton'>{base.name}</button>))}
                <button className='statButton' onClick={() => setActiveBase('closed')}>Close stats</button>
                <div>
                  { activeBase === 'closed' || activeBase === 'all' ? (
                    activeBase === 'all' ? (
                      <IncomeBarPlot incomeData={incomes}></IncomeBarPlot>) : (null)
                  ) : (
                    <IncomeBaseLinear baseId={activeBase} incomeData={incomes}/>
                  )}
                </div>
              </div>

              <h1>Your recent incomes</h1>
              <table className='expenseTable'>
                <thead className='tableHeader'>
                  <tr>{['Income base', 'Name', 'Amount','Date'].map((current, index)=>
                    <th key={index}>{current}</th>)}</tr>
                </thead>
                <tbody className='tableBody'>
                  {incomes.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB - dateA;
                  }).map((income) => 
                    <tr key={income.id}><RecentAction action={income} type={'incomeBases'}></RecentAction></tr>)}
                </tbody>
              </table>
            </div>
          ) : ( 
            <div>           
            <h1>Your recent incomes</h1>
            <p>You haven't any incomes yet. <br/> Return to <a href='/'>main page</a> to add some.</p>
            </div>
          )}
      </div>
    )
  }
  
  export default RecentIncomes