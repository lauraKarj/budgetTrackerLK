import React from 'react';
import { useFetcher } from 'react-router-dom';

/**
 * Function to help create table rows and option to delete income bases. 
 * 
 * @param {Object} - Action includes all details of element which the row includes.
 * @returns {element} - Table row element including form for deleting.
 */
function BaseAction({action}) {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    let actionType = 'deleteBase';
    const date = new Date(action.date).toLocaleDateString();

    return (
        <>
            <td>{action.name}</td>
            <td>{date}</td>
            <td className="delete">
                <fetcher.Form method='post' onSubmit={(event) =>{
                    // eslint-disable-next-line no-restricted-globals
                    if (!confirm(`You are deleting income base "${action.name}" and all the incomes related to it permanently, are you sure?`)) {
                        event.preventDefault();
                    }}}>
                    <input type="hidden" name='_action' value={actionType}></input>
                    <input type="hidden" name='actionId' value={action.id}></input>
                    <button type='submit' className='delAction' disabled={isSubmitting}>Delete</button>
                </fetcher.Form>
            </td>
        </>
    )
}

export default BaseAction
