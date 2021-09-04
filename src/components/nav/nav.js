import React, {useRef} from 'react';
import '../../styles/nav/nav.scss'

const Nav = () => {
    const menuRef = useRef();
    const toggleMenu = () => {
        menuRef.current.classList.toggle('menuOpen');

    }
    return (
        <header>

            <i className='fa fa-bars' onClick={toggleMenu}></i>
            <h1>Popcorn Time</h1>
            <ul id='menu' ref={menuRef}>
                <i className='fa fa-close' onClick={toggleMenu}></i>
                <li>
                    <h2>Movies</h2>
                    <ul className='dropdownMenus'>
                        <li>Popular</li>

                    </ul>
                </li>

                <li>
                    <h2>TV</h2>
                    <ul className='dropdownMenus'>
                        <li>Popular</li>

                    </ul>
                </li>

                <li><h2>Advance Search</h2></li>
            </ul>

            <input type='search' />
            
            
        </header>
    )
}

export default Nav
