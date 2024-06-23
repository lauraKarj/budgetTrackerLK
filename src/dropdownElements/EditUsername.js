import React from 'react';
import Toastify from 'toastify-js';
import { getUsername, setUsername } from '../functions';
import { useState, useEffect } from 'react';
import { useNavigate, useFetcher } from 'react-router-dom';

/**
 * Function to edit the current username stored in local storage.
 * This function component renders a form for the user to update their username. It fetches the current username 
 * on mount, and allows the user to input a new username. Upon submission, the username is updated in local storage.
 * 
 * @returns {JSX.Element} - A form component that allows the user to update their username.
 */

function EditUsername() {
  const [newUsername, setNewUsernameState] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const navigate  = useNavigate();

  // Get current username
  useEffect(() => {
    setCurrentUsername(getUsername());
  }, []);

  // Update username with new name after form is sended 
  const handleSubmit = (event) => {
    event.preventDefault();
    setUsername(newUsername);
    setCurrentUsername(newUsername);
    Toastify({ text: `Username updated successfully, Hi ${newUsername}!`, duration: 3000,
                style: { background: "purple" }}).showToast();
    navigate('/');
    document.getElementById('editUsername').reset(); 
  };

  return (
    <div className='changeNamePage'>
      <h2>Change your username:</h2>
      <fetcher.Form method="post" className='editUsername' id='editUsername' onSubmit={handleSubmit}>
        <input
          type="text"
          id="newUsername"
          placeholder='New username'
          value={newUsername}
          onChange={(e) => setNewUsernameState(e.target.value)} required/>
        <button type='submit' className='themeButton' disabled={isSubmitting}>
            Update username
        </button>
      </fetcher.Form>    
      <p className='currentName'>* Current Username: {currentUsername}</p>
    </div>
  )
}

export default EditUsername
