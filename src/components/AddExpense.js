import React from 'react';
import { useFetcher } from 'react-router-dom';

/**
 * Component for adding a new expense.
 * 
 * This component allows users to add a new expenses for a specific budgets.
 * It provides a form to input the name for expense, expenses amount and select budget.
 * 
 * @param {Object[]} prevbudgets - An array of previous budgets including name and ID of them.
 * @returns {JSX.Element} The form for adding a new expense.
*/

function AddExpense({prevbudgets}) {
    const fetcherExpense = useFetcher();
    const isSubmittingExpense = fetcherExpense.state === "submitting";
    return (
    <div className='newExpense'>
      <h2>Add new expense:</h2>
      <fetcherExpense.Form method="post" className='expenseForm' id='expenseForm'>
        <label htmlFor="expenseName">Expense's name:</label>
        <input type="text" id="expenseName" name="expenseName" placeholder='Rent, groceries e.g.'required/>

        <label htmlFor="expenseAmount">Amount:</label>
        <input type="number" id="expenseAmount" name="expenseAmount" min="0" placeholder='50€ e.g.' step={0.1} required/>

        <label htmlFor="newExpenseCateg">Budget Category:</label>
        <select name="newExpenseCateg" id="newExpenseCateg" required>
            { prevbudgets.map((budget) => {
                  return (
                    <option key={budget.id} value={budget.id}>
                      {budget.name}
                    </option>
                  )
                })
            }
        </select>

        <input type='hidden' name='_action' value="createNewExpense"></input>
        <button type='submit' className='themeButton' disabled={isSubmittingExpense}>
            Add expense
        </button>
      </fetcherExpense.Form>
    </div>
  )
}

export default AddExpense
