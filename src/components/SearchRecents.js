import React , {useState} from 'react'
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { useRef, useEffect } from 'react';

/**
 * Function returns a navigation menu element. Triggered by clinking floating button.
 * Offers user to navigate between recent -pages and back to main page.
 * 
 * @returns The search / navigation menu component.
 */

const SearchRecents = () => {
    // Use state to track users mouse actions.
    const [searchOpen, setSearchOpen] = useState(false);
    let searchRef = useRef(null);

    useEffect(() => {
        let handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
    <div className='searchContainer'>
        <div className='triggerSearch' onClick={()=>{setSearchOpen(!searchOpen)}}>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab color="primary" aria-label="add" className='floatButton' 
                    sx={{ position: 'fixed', bottom: 16, right: 4, zIndex: 1000, backgroundColor: '#D4C0DD',
                    '&:hover': { backgroundColor: '#C6B3CE'}}}>
                    <AddIcon/>
                </Fab>
            </Box>
        </div>
        <div className={`searchMenu ${searchOpen? 'active' : 'inactive'}`} ref={searchRef}>
            <h3>Search</h3>
            <ul onClick={()=>{setSearchOpen(!searchOpen)}}>
                <li><a href='/incomes'>Recent incomes</a></li>
                <li><a href='/expenses'>Recent expenses</a></li>
                <li><a href='/deposits'>Recent deposits</a></li>
                <li><a href='/'>Back to main</a></li>
            </ul>
        </div>
    </div>
  )
}

export default SearchRecents
