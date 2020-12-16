import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss'
import hero from '../../assets/images/hero.jpeg';

const Home = () => {
    return (
        <div className="home">
            <div className="home__right">
                <h1 className="home__title">Errand Run</h1>
                <p className="home__tagline">Grocery Delivery service. Helping people stay home More.</p>

                <div className="home__button-tray">
                    <Link to="/user/login"><button className="home__login-button">U S E R</button></Link>
                    <Link to="/volunteer/login"><button className="home__login-button">V O L U N T E E R</button></Link>
            
                </div>
            </div>

            <div className="home__left">
                <img src={hero} alt="grocery" className="home__image"/>
            </div>
        </div>
    );
};

export default Home;