import React from 'react'
import { useRouteError, useNavigate } from 'react-router-dom'

/**
 * Function returns a customised error page based on the error message 
 * or status code. Offers user two options: go back to the previous page
 * or return to homepage/registeration page if user is not created yet.
 * 
 * @returns The error page component.
 */

const ErrorPage = () => {
  // Catch error message | status
  const error = useRouteError();
  // Get previous page where to go back if needed
  const navigate = useNavigate();

  return (
    <div className='error'>
      <h1>Oopsie, error was found...</h1>
      <p>{error.message || error.statusText}</p>
      <div className='buttonArea'>
        <button className='themeButton' onClick={() => navigate(-1)}>Back to previous page</button>
        <a href='/'><button className='themeButton' id='homeButton'>Homepage</button></a>
      </div>
    </div>
  )
}

export default ErrorPage
