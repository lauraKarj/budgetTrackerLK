import React from 'react';
import { useFetcher } from 'react-router-dom';

/**
 * Component for adding a new income to existing base.
 * 
 * This component allows users to add new incomes for a specific income bases.
 * It provides a form to input the name and amount of income and select the income base.
 * 
 * @param {Object[]} prevIncomes - An array of previous incomes bases including name and ID of them.
 * @returns {JSX.Element} The form for adding a new incomes.
*/

function AddIncomes({prevIncomes}) {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    return (
    <div className='newIncome'>
      <h2>Add new income:</h2>
      <fetcher.Form method="post" className='newIncomeForm' id='newIncomeForm'>
        
        <div className='column left'>
        <label id='newIncomenameLabel' htmlFor="newIncomeName">Income's name:</label>
        <input type="text" id="newIncomeName" name="newIncomeName" placeholder='Salary, gift, e.g.'required/>

        </div>

        <div className='column middle'>
        <label id='newIncomeAmountLabel' htmlFor="newIncomeAmount">Amount:</label>
        <input type="number" id="newIncomeAmount" name="newIncomeAmount" min="0" placeholder='500€ e.g.' 
          step={0.1} required/>
          </div>

        <div className='column right'>
        <label id='newIncomeCatLabel' htmlFor="newIncomeCat">Income base:</label>
        <select name="newIncomeCat" id="newIncomeCat" required>
            { prevIncomes.map((incomeBase) => {
                  return (
                    <option key={incomeBase.id} value={incomeBase.id}>
                      {incomeBase.name}
                    </option>
                  )
                })
            }
        </select>
      </div>

        <input type='hidden' name='_action' value="addNewIncome"></input>
        <button type='submit' className='themeButton' disabled={isSubmitting}>
            Add income
        </button>
      </fetcher.Form>
      </div>
    )
}

export default AddIncomes
