import React from 'react'
import { useFetcher } from 'react-router-dom'

/**
 * Component for creating a new saving goal.
 * 
 * This component allows users to create new saving goals.
 * It provides a form to input goal name, goal amount and optional 'completed by' -date.
 * 
 * @returns {JSX.Element} The form for creating new saving goal.
*/

function AddNewSavingGoal() {
   const fetcherSavings = useFetcher();
   const isSubmittingSaving = fetcherSavings.state === "submitting";

    return (
    <div className='newSaving'>
      <h2>Create new saving goal:</h2>
      <fetcherSavings.Form method="post" className='savingForm' id='savingForm'>
        <label htmlFor="savings-name">Saving goal's name:</label>
        <input type="text" id="savings-name" name="savingsName" placeholder='New car, phone e.g.'required/>
        <label htmlFor="saving-goal">Saving goal:</label>
        <input type="number" id="saving-goal" name="savingGoal" placeholder='50 000€ e.g.' min="0" step={0.1} required/>
        <label htmlFor="ready-date">Completed by:</label>
        <input type="date" id="ready-date" name="readyDate"></input> 
        <input type='hidden' name='_action' value={"createNewSaving"}></input>
        <button type='submit' className='themeButton' disabled={isSubmittingSaving}>
            Add saving goal
        </button>
      </fetcherSavings.Form>

    </div>
  )
}

export default AddNewSavingGoal
