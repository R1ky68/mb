import React from "react";
import { Link } from 'react-router-dom';
import './style/Header.css';

function Header() {
    return (
        <header>
            <div>
                <h1 id='logo'><Link to='/'>MB</Link></h1>
            </div>
            <ul className="nav-list">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/'>Strumenti</Link></li>
                <div className='dropdown-container'>
                    <button>Calcolatori</button>
                    <ul className='dropdown-menu'>
                        <li><Link to='/punta-banca'>Punta-Banca</Link></li>
                        <li><Link to='/punta-punta'>Punta-Punta</Link></li>
                        <li><Link to='/multi-tool'>Multi-tool</Link></li>
                        <li><Link to='/casino'>Casinò</Link></li>
                    </ul>
                </div>

            </ul>
            <div className="burger" onClick={() => {
                document.querySelector(".nav-list").classList.toggle("show");
                document.querySelector("body").classList.toggle("dont-scroll");
            }}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </header>
        );     
};

export default Header;