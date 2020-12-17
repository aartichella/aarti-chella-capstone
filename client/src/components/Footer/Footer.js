import React from 'react';
import './Footer.scss';
import logo from '../../assets/images/logo.png';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={logo} alt="logo" className="logo"/>
                <h1 className="footer__logo-text">Errand-Run</h1>
            </div>
            <div className="footer-address">
                <p className="address__title">Office Address</p>
                <p className="address__text">123 Queen Street</p>
                <p className="address__text">Toronto</p>
            </div>

            <div className="footer-contact">
            <p className="address__title">Contact Us</p>
                <p className="address__text">Need Assitance</p>
                <p className="address__text">+1 (123)-234-1234</p>
            </div>
            
        </div>
    );
};

export default Footer;