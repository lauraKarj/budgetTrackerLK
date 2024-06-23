import React from 'react';
import { Form } from 'react-router-dom';
import { useFetcher } from 'react-router-dom';

/**
 * Function returns a registration page. 
 * Offers user to register to the application with form element.
 * 
 * @returns The registration page component.
 */

const Register = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  return (
    <div className='registration'>
        <section className='welcometext'>
            <h2>Welcome to use our budgeting app!</h2>
            <p>Budgeting will never be easier than it is now.</p>
        </section>
        
      <Form method='post'>
        <input type='text' placeholder='Create username' name='userName' required ></input>
        <input type='password' name='password' minLength={8} placeholder='Set password' required></input>
        <input type='hidden' name='_action' value={'newUser'}></input>
        <div className='buttonArea'>
            <button type='reset' value='Reset' className='themeButton'>Reset</button>
            <button type='submit' className='themeButton' value='Submit' disabled={isSubmitting}>Sign up</button>
        </div>
      </Form>
    </div>
  )
}

export default Register
