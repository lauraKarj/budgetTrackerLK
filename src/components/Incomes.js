import React from 'react';
import { useFetcher } from 'react-router-dom';
import { fetchUserData } from '../functions';

/**
 * Component for creating a new income base.
 * 
 * This component allows users to create new income bases.
 * It provides a form to input a name for a income base.
 * 
 * @returns {JSX.Element} The form for creating new income base.
*/

function Incomes() {
    const fetcherIncome = useFetcher();
    const isSubmitting = fetcherIncome.state === "submitting";
    const prevBases = fetchUserData('incomeBases');

    return (
    <div className='addIncomes'>
      <h2>Create base for incomes:</h2>
      <fetcherIncome.Form method="post" className='incomeForm' id='incomeForm'>
        <label htmlFor="nameIncome">Base name:</label>
        <input type="text" id="nameIncome" name="nameIncome" placeholder='Year 2024 e.g.'required/>
        <input type='hidden' name='_action' value="createIncomeBase"></input>
        <button type='submit' className='themeButton' disabled={isSubmitting}>
            Add income base
        </button>
      </fetcherIncome.Form>
      {prevBases && <p>* Check all your existing income bases <a href='/bases'>here</a></p>}
    </div>
    )
}

export default Incomes
