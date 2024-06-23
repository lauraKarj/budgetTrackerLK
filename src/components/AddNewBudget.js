import React from 'react'
import { useFetcher } from 'react-router-dom'

/**
 * Component for creating a new budget.
 * 
 * This component allows users to create new budgets.
 * It provides a form to input budget name, limit and optional starting date.
 * 
 * @returns {JSX.Element} The form for creating new budget.
*/

function AddNewBudget() {
    const fetcherBudget = useFetcher();
    const isSubmittingBudget = fetcherBudget.state === "submitting";

    return (
    <div className='newBudget'>
      <h2>Create new budget:</h2>
      <fetcherBudget.Form method="post" className='budgetForm' id='budgetForm'>
        <label htmlFor="budget-name">Budget name:</label>
        <input type="text" id="budget-name" name="budgetName" placeholder='Rent, groceries e.g.'required/>
        <label htmlFor="budget-limit">Budget limit:</label>
        <input type="number" id="budget-limit" name="budgetLimit" min="0" placeholder='1000€ e.g.' 
          step={0.1} required/>
        <label htmlFor="start-date">Starting date:</label>
        <input type="date" id="start-date" name="startDate"></input>
        <input type='hidden' name='_action' value="createNewBudget"></input>
        <button type='submit' className='themeButton' disabled={isSubmittingBudget}>
            Add budget
        </button>
      </fetcherBudget.Form>
    </div>
  )
}

export default AddNewBudget
