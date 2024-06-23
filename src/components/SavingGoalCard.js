import React from 'react'
import { calcSavings } from '../functions';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetcher } from 'react-router-dom';

/**
 * Component to create card base for saving goals.
 * 
 * This component allows users view their different saving goals easily.
 * Card contains saving goal name, goal amount, how much is already saved and how much is left.
 * Card shows goal date for compliting if given by user. Has visualization about goal and
 * shows if goal has been completed. 
 * It provides two buttons: view deposits for saving goal and option to delete budget.
 * 
 * @returns {JSX.Element} Card element.
*/

function SavingGoalCard({savingGoal}) {
  const [isCompleted, setIsCompleted] = useState(false);
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const {name, goal, date, id} = savingGoal;
  const savedAmounts = calcSavings(id);
  let amountLeft = goal-savedAmounts;

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
  <div className={isCompleted ? 'savingCard complete' : 'savingCard'}>
    <h3>{name}</h3>
    <p className='cardInfo'>Goal {goal}€</p>
    <progress variant="determinate" value={(savedAmounts / goal)} className='progress'/>
    <p className='cardfooter'>Already saved: {savedAmounts}€ <br/> <b>Amount left: {amountLeft}€</b>
    {date && <i className='goalDate'>*Goal date {date}</i>}</p>
    <div className='cardButtonArea'>
    <fetcher.Form method='post' onSubmit={(event) =>{
        // eslint-disable-next-line no-restricted-globals
        if (!confirm(`You are deleting saving goal "${name}" permanently, are you sure?`)) {
          event.preventDefault();
        }}}>
        <input type='hidden' name='_action' value="deleteSavingGoal"></input>
        <input type='hidden' name='goalId' value={id} />
        <input type='hidden' name='goalName' value={name} />
        <button type='submit' className='themeButton' disabled={isSubmitting}>Delete goal</button>
      </fetcher.Form>
      <Link to={`/deposits/${id}`} className='themeButton .cardButton'>
          <span>View deposits</span>
      </Link>
      </div>
  </div>
)
}

export default SavingGoalCard
