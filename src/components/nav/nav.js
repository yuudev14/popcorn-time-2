import React, {useRef} from 'react';
import '../../styles/nav/nav.scss'

const Nav = () => {
    const menuRef = useRef();
    const tvRef = useRef();
    const movieRef = useRef();
    const toggleMenu = () => {
        menuRef.current.classList.toggle('menuOpen');

    }

    const toggleDropDown = (ref) => {
        ref.current.classList.toggle('openDropDownMenu')

    }
    return (
        <header>

            <i className='fa fa-bars' onClick={toggleMenu}></i>
            <h1>Popcorn Time</h1>
            <ul id='menu' ref={menuRef}>
                <i className='fa fa-close' onClick={toggleMenu}></i>
                <li>
                    <h2 onClick={() => toggleDropDown(movieRef)}>Movies</h2>
                    <ul className='dropdownMenus' ref={movieRef} onClick={toggleMenu}>
                        <li>Popular</li>
                        <li>Popular</li>
                        <li>Popular</li>
                        <li>Popular</li>

                    </ul>
                </li>

                <li>
                    <h2 onClick={() => toggleDropDown(tvRef)}>TV</h2>
                    <ul className='dropdownMenus' ref={tvRef} onClick={toggleMenu}>
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
