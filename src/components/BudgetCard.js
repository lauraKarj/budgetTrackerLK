import React from 'react';
import { calcBudgetExpenses } from '../functions';
import { useState, useEffect } from 'react';
import { Link, useFetcher } from 'react-router-dom';

/**
 * Component to create card base for budgets.
 * 
 * This component allows users view their different budgets easily.
 * Card contains budget name, limit, spent amount and amount left.
 * Card shows starting date if given by user. Has visualization about budget and
 * shows if limit has reached. 
 * It provides two buttons: view budgets expenses and option to delete budget.
 * 
 * @returns {JSX.Element} Card element.
*/

function BudgetCard({budget}) {
    const [isCompleted, setIsCompleted] = useState(false);
    const {name, limit, date, id} = budget;
    const expenses = calcBudgetExpenses(id)
    let amountLeft = limit - expenses;
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";

    if (amountLeft <= 0) {
      amountLeft = 0;
    }

    useEffect(() => {
      if (amountLeft <= 0) {
        setIsCompleted(true);
      } else {
        setIsCompleted(false);
      }
    }, [amountLeft]);

    return (
    <div className={isCompleted ? 'budgetCard complete' : 'budgetCard'}>
      <h3>{name}</h3>
      <p className='cardInfo'>Limit {limit}€</p>
      <progress variant="determinate" value={(expenses / limit)} className='progress'/>
      <p className='cardfooter'>Spent: {expenses}€ <br/> <b>Amount left: {limit-expenses}€</b>
      {date && <i className='budgetdate'>*Set: {date}</i>}</p>   
      <div className='cardButtonArea'>
      <fetcher.Form method='post' onSubmit={(event) =>{
        // eslint-disable-next-line no-restricted-globals
        if (!confirm(`You are deleting budget "${name}" permanently, are you sure?`)) {
          event.preventDefault();
        }}}>
        <input type='hidden' name='_action' value="deleteBudget"></input>
        <input type='hidden' name='budgetId' value={id} />
        <input type='hidden' name='budgetName' value={name} />
        <button type='submit' className='themeButton' disabled={isSubmitting}>Delete budget</button>
      </fetcher.Form>
      <Link to={`/expenses/${id}`} className='themeButton .cardButton'>
          <span>View expenses</span>
      </Link>
      </div>
    </div>
  )
}

export default BudgetCard
