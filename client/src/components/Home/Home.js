import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss'
import hero from '../../assets/images/hero.jpeg';
import Works from '../Works/Works';

const Home = () => {
    return (
        <div className="home-wrapper">
        <div className="home">
            <div className="home__right">
                <h1 className="home__title">Errand Run</h1>
                <p className="home__tagline">Connecting you with the things you need to get done! Delivering groceries now - open to more errands in the future.</p>

                <div className="home__button-tray">
                    <Link to="/user/login"><button className="home__login-button">U S E R</button></Link>
                    <Link to="/volunteer/login"><button className="home__login-button--vol">V O L U N T E E R</button></Link>
            
                </div>
            </div>

            <div className="home__left">
                <img src={hero} alt="grocery" className="home__image"/>
            </div>
        </div>
        <Works />
        </div>
    );
};

export default Home;