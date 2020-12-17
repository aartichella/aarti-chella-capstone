import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = () => {
    return (
            <>
            <div className="nav-wrap">
                <div className="navbar">
                <Link to="/" className="navbar__link">
                    <div className="navbar-left">
                        <img src={logo} alt="logo" className="logo"/>
                        <h1 className="navbar__header">Errand-Run</h1>
                    </div>
                    </Link>
                    <div className="navbar-right">
                        <p className="navbar-right__item">Profile</p>
                        <p className="navbar-right__item">List</p>
                        <Link to="/" className="navbar__link">
                        <p className="navbar-right__item">Logout</p>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Header;