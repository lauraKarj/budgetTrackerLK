import React from 'react';
import { useFetcher } from 'react-router-dom';

/**
 * Component for adding a new deposit.
 * 
 * This component allows users to add a new saved amount for a specific saving goal.
 * It provides a form to input the amount saved, select the saving goal, and add optional comments.
 * 
 * @param {Object[]} prevsavings - An array of previous saving goals including name and ID of them.
 * @returns {JSX.Element} The form for adding a new deposit.
*/

function AddDeposit({prevsavings}) {
    const fetcherDeposit = useFetcher();
    const isSubmitting = fetcherDeposit.state === "submitting";

    return (
    <div className='newDeposit'>
      <h2>Add new saved amount:</h2>
      <fetcherDeposit.Form method="post" className='depositForm' id='depositForm'>
        <label htmlFor="amountsaved">Amount saved:</label>
        <input type="number" id="amountsaved" name="amountsaved" min="0" placeholder='50€ e.g.' step={0.1} required/>
        <label htmlFor="depositCateg">For saving goal:</label>
        <select name="depositCateg" id="depositCateg" required>
            { prevsavings.map((savings) => {
                  return (
                    <option key={savings.id} value={savings.id}>
                      {savings.name}
                    </option>
                  )
                })
            }
        </select>
        <label htmlFor=''>Additional comments (optional):</label>
        <input type="text" id="depoComment" name="depoComment" placeholder='From salary bonus e.g.'></input>
        <input type='hidden' name='_action' value="createNewDeposit"></input>
        <button type='submit' className='themeButton' disabled={isSubmitting}>
            Add deposit
        </button>
      </fetcherDeposit.Form>
    </div>
  )
}

export default AddDeposit
