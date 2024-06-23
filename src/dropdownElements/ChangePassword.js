import React from 'react';
import { useFetcher, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPassword, setPassword } from '../functions';
import Toastify from 'toastify-js';

/**
 * Function to change the user's password stored in local storage and update the UI accordingly.
 * Renders a form for the user to update their password. It fetches the current password 
 * on mount, and allows the user to input a new password twice for confirmation. Upon submission, if the passwords
 * match, the password is updated in local storage. If the passwords do not match, an alert is shown.
 * 
 * @returns {JSX.Element} - A form component that allows the user to update their password.
 */
function ChangePassword() {
  const [newPW, setNewPWState] = useState('');
  const [newPWrepeat, setNewPWrepeatState] = useState('');
  const [currentPW, setCurrentPW] = useState('');
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const navigate  = useNavigate();

  // Get current password
  useEffect(() => {
    setCurrentPW(getPassword());
  }, []);

  // Update password with new after form is sended 
  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPW === newPWrepeat) {
        setPassword(newPW);
        setCurrentPW(newPW);
        Toastify({ text: `Password updated successfully!`, duration: 3000, 
                    style: { background: "purple" }}).showToast();
        navigate('/');
        document.getElementById('editPW').reset();
    }
    else {
        alert("Passwords doesn't match, try again!");
    }
  };

  return (
    <div className='changeNamePage'>
      <h2>Set a new password:</h2>
      <fetcher.Form method="post" className='editUsername' id='editPW' onSubmit={handleSubmit}>
        <input
          type="password"
          id="newPW"
          placeholder='New password'
          value={newPW}
          onChange={(e) => setNewPWState(e.target.value)} required/>
        <input
          type="password"
          id="newPWrepeat"
          placeholder='Repeat password'
          value={newPWrepeat}
          onChange={(e) => setNewPWrepeatState(e.target.value)} required/>
        <p className='pwHox'>Remember, passwords must match!</p>
        <button type='submit' className='themeButton' disabled={isSubmitting}>
            Update password
        </button>
      </fetcher.Form>
    </div>
  )
}

export default ChangePassword
