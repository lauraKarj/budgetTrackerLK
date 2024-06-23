import React , {useState} from 'react'
import { NavLink } from 'react-router-dom'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DeleteUser from '../dropdownElements/DeleteUser';
import { fetchUserData } from '../functions';
import { useRef, useEffect } from 'react';
/**
 * Function returns a navigation bar element. Includes app name -element to navigate back to main page.
 * Has profile element which contains dropdown element.
 * Offers user to navigate to main page and delete the user.
 * 
 * @returns The navigation bar component.
 */

const NavBar = () => {
    // Use state to track users mouse actions.
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const username = fetchUserData('userName');
    let dropdownRef = useRef(null);

    useEffect(() => {
        let handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
    <nav>
    <NavLink to="/" aria-label='homepage'>
        <HomeRoundedIcon></HomeRoundedIcon>
        <span>Budget Tracker by LK</span>
    </NavLink>
    {
        username && (
        <div className='menuContainer'>
            <div className='triggerMenu' onClick={()=>{setDropdownOpen(!dropdownOpen)}}>
                <img src={'https://i.pinimg.com/564x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg'} 
                alt='avatar' id='profilepic'></img>
            </div>
            <div className={`dropdownMenu ${dropdownOpen? 'active' : 'inactive'}`} ref={dropdownRef}>
                <h3>{username}</h3>
                <ul>
                    <li><NavLink to='/updateUsername' onClick={() => 
                        setDropdownOpen(false)}>Change username</NavLink></li>
                    <li><NavLink to='/changePassword' onClick={() => 
                        setDropdownOpen(false)}>Change password</NavLink></li>
                    <li><DeleteUser onClick={() => setDropdownOpen(false)}></DeleteUser></li>
                </ul>
            </div>
        </div>
    )}
    </nav>
)
}

export default NavBar
