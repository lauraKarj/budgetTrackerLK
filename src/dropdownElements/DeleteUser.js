import React from 'react';
import { Form } from 'react-router-dom';

/**
 * Function returns form / button element for deleting user from application.
 */

function DeleteUser() {
  return (
    <Form method='post' action='/logout' onSubmit={(event) => {
        // eslint-disable-next-line no-restricted-globals
        if(!confirm("Are you sure you want to delete user and all the data?")) {
        // If not confirmed, don't log out
        event.preventDefault();
        }}}>
        <button type='submit' className='delUser'>Delete User</button>
    </Form>
  )
}

export default DeleteUser
