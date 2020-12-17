import React from 'react';
import './Works.scss';
import img1 from '../../assets/images/gro1.jpg';
import img2 from '../../assets/images/gro2.jpg';
import img3 from '../../assets/images/gro3.jpg';
const infoList=[
    {   
        id:img1,
        title:"Step 1",
        info:"As a user, sign up for the website first and then login using your username and password"
    },
    {   
        id:img2,
        title:"Step 2",
        info:"Place an order in your local grocery store. Update the order number in your dashboard along with other details"
    },
    {   
        id:img3,
        title:"Step 3",
        info:"Sit back and wait for your groceries to be delivered to your doorstep."

    }
]
const Works = () => {
    return (
        <div className="info-wrap">
            <div className="info-wrap__title-wrap">
                <h1 className="info-wrap__title">How it Works?</h1>
                <p className="info-wrap__text"> We are committed to provinding you a great experience when using the website. You can follow the foollowing instructions to seemlessly begin using Errand Help! </p>
            </div>
            <div className="info-card__wrapper">
            {infoList.map(data=>(
                <div className="info-card" key={data.id}>
                    <div className="info-card__inner">
                        <div className="info-card__front">
                            <img src={data.id} alt="grocery" className="image"/>
                        </div>
                        <div className="info-card__back">
                            <h1 className="info-card__title">{data.title}</h1>
                            <p className="info-card__text">{data.info}</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>

        </div>
    );
};

export default Works;