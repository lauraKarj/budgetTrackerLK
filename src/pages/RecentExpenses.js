import React from 'react';
import { fetchUserData } from '../functions';
import RecentAction from '../components/RecentAction';
import { useParams } from 'react-router-dom';

/**
 * Function returns a page for recent expenses. Checks first if user has any expenses.
 * Includes table element about expenses details.
 * 
 * @returns The recent expenses page component.
 */
const RecentExpenses = () => {
  // Get budget id from the current url
  const { id: budgetId } = useParams();
  const data = fetchUserData('expenses') ?? [];
  
  // Filter expenses that belongs to the selected budget
  const expenses = budgetId ? data.filter(expense => expense.budgetId === budgetId) : data;

    return (
      <div className='recent'>
          <h1>Your recent expenses</h1>
          { expenses && expenses.length >= 1 ? (
            <div>      
              <table className='expenseTable'>
                <thead className='tableHeader'>
                  <tr>{['Category', 'Name', 'Amount','Date'].map((current, index)=>
                    <th key={index}>{current}</th>)}</tr>
                </thead>
                <tbody className='tableBody'>
                  {expenses.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB - dateA;
                  }).map((expense) => 
                    <tr key={expense.id}><RecentAction action={expense} type={'budgets'}></RecentAction></tr>)}
                </tbody>
              </table>
            </div>
          ) : (
            <div><p>You haven't any expenses yet. <br/> Return to <a href='/'>main page</a> to add some.</p></div>
          )}
      </div>
    )
  }
  
  export default RecentExpenses