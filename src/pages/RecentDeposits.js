import React from 'react';
import { fetchUserData } from '../functions';
import RecentAction from '../components/RecentAction';
import { useParams } from 'react-router-dom';

/**
 * Function returns a page for recent deposits. Checks first if user has any deposits.
 * Includes table element about deposits details.
 * 
 * @returns The recent deposits page component.
 */

const RecentDeposits = () => {
  // Get saving goal id from the current url
  const { id: savingGoalId } = useParams();
  const data = fetchUserData('deposits') ?? [];
  // Filter deposits that belongs to selected saving goal
  const deposits = savingGoalId ? data.filter(deposit => deposit.savingGoalId === savingGoalId) : data;

    return (
    <div className='recent'>
      <h1>Your recent deposits</h1>
      { deposits && deposits.length >= 1 ? (
        <div>      
          <table className='expenseTable'>
            <thead className='tableHeader'>
              <tr>{['Saving goal', 'Additional Comment', 'Amount','Date'].map((current, index)=>
                <th key={index}>{current}</th>)}</tr>
            </thead>
            <tbody className='tableBody'>
              {deposits.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
              }).map((deposit) => 
                <tr key={deposit.id}><RecentAction action={deposit} type={'savings'}></RecentAction></tr>)}
            </tbody>
          </table>
        </div>
      ) : (
        <div><p>You haven't done any deposits yet. <br/> Return to <a href='/'>main page</a> to add some.</p></div>
      )}
    </div>
    )
  }
  
  export default RecentDeposits