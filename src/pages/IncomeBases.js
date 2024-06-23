import React from 'react';
import { fetchUserData } from '../functions';
import BaseAction from '../components/BaseAction';

/**
 * Function to display individual page for user's income bases showed in a table format.
 * Fetches the user's income bases from local storage and displays them in a table. 
 * The table includes columns for the base name, creation date, and a delete action.
 * If no income bases exist, a notice message is displayed.
 * 
 * @returns The income bases page component.
 */

function IncomeBases() {
    const bases = fetchUserData('incomeBases');

    return ( 
      <div className='recent'>
          { bases && bases.length >= 1 ? (
            <div className='incomePage'>
              <h1>Your income bases</h1>
              <table className='expenseTable'>
                <thead className='tableHeader'>
                  <tr>{['Base name', 'Created at', 'Delete base'].map((current, index)=>
                    <th key={index}>{current}</th>)}</tr>
                </thead>
                <tbody className='tableBody'>
                  {bases.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB - dateA;
                  }).map((base) => 
                    <tr key={base.id}><BaseAction action={base}/></tr>)}
                </tbody>
              </table>
            </div>
          ) : ( 
            <div>           
            <h1>Your income bases</h1>
            <p>You haven't any income bases yet. <br/> Return to <a href='/'>main page</a> to create one.</p>
            </div>
          )}
      </div>
    )
}

export default IncomeBases
