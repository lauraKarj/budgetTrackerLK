import React from "react";
import { fetchUserData } from "../functions";
import { useFetcher } from "react-router-dom";

/**
 * Function to help track users actions by type and create table rows. 
 * 
 * @param {action, type} - Action includes all details of element which the row includes,
 *                         Type tells which type of data the element is part of example budget, saving goal, etg. 
 * @returns {element} - Table row element including form.
 */
const RecentAction = ({action, type}) => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const date = new Date(action.date).toLocaleDateString();
    const data = fetchUserData(type) ?? [];

    let category = '';
    let actionType = '';

    for (const element of data) {
        if (action.budgetId === element.id ) {
            category += element.name;
            actionType = 'deleteExpense';
        }
        if (action.incomeBaseId === element.id) {
            category += element.name;
            actionType = 'deleteIncome';
        }
        if (action.savingGoalId === element.id) {
            category += element.name;
            actionType = 'deleteDeposit';
        }
    }

    return (
        <>
            <td>{category}</td>
            <td>{action.name ?? action.comment}</td>
            <td>{action.amount}€</td>
            <td>{date}</td>
            <td className="delete">
                <fetcher.Form method='post'>
                    <input type="hidden" name='_action' value={actionType}></input>
                    <input type="hidden" name='actionId' value={action.id}></input>
                    <button type='submit' className='delAction' disabled={isSubmitting}>Delete</button>
                </fetcher.Form>
            </td>
        </>
    )
}

export default RecentAction