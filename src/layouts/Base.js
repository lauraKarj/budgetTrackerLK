import React from 'react';
import { fetchUserData } from '../functions';
import { Outlet, useLoaderData } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchRecents from '../components/SearchRecents';

/**
 * Loader function for the base component.
 * This function fetches user data from local storage and prepares it for rendering on the base.
 * @returns {Object} An object containing the user data retrieved from local storage.
 */
export function loadBase() {
  const userName = fetchUserData("userName");
  return { userName }
}

// This Base includes layout of the app and shows it
const Base = () => {
    const { userName } = useLoaderData()

    // Outlet for control children elements
    return (
      <div className='layout'>
        <NavBar/>
        { userName && <SearchRecents></SearchRecents> }
        <main>
        <Outlet></Outlet>
        </main>
      </div>
    )
}

export default Base
