import React from 'react';
import './Track.scss';
import axios from 'axios';
import DeliveryMap from '../DeliveryMap/DeliveryMap';


const Track = (props) => {
    const acceptTask =(taskId) =>{
        const volId = props.location.state.volunteer.id;
        axios.put(`http://localhost:8080/volunteers/${taskId}/accept`, {volId})
            .then(data => {
                console.log('volunteer Task accept',data);
                props.history.push({
                    pathname: '/volunteer/landing',
                    state:{
                        loggedVol: props.location.state.volunteer
                    }
                })
            })
    }
    const trackData= props.location.state.trackData;
    
    const message =<i>Yet to be assigned...</i>
    return (
        <div className="order-details">
            <div className="details-info-container">
                <h2 className="details-info__title">Tracking Details</h2>
                <div className="details-info">
                    
                    <label className="details-info__label">Store Name</label>
                    <p className="details-info__text">{trackData.storeName}</p>

                    <label className="details-info__label">Store Address</label>
                    <p className="details-info__text">{trackData.storeAddress}</p>

                    <label className="details-info__label">Order Number</label>
                    <p className="details-info__text">{trackData.orderNumber}</p>

                    <label className="details-info__label">Volunteer Name</label>
                    <p className="details-info__text">{trackData.volunteerName? trackData.volunteerName: message }</p>

                    <label className="details-info__label">Delivery Status</label>
                    <p className="details-info__text">{trackData.deliveryStatus}</p>

                    <label className="details-info__label">Delivery Time</label>
                    <p className="details-info__text">{trackData.deliveryTime}</p>

                    <button className="details-info__button" onClick={()=>props.history.goBack()}>B A C K</button>
                    <button className={(props.location.state.type && (trackData.volunteerId))? "no-show" :"details-info__button--green" } onClick={()=>acceptTask(trackData.taskId)}>A C C E P T</button>
                </div>
            </div>
            <div className="order-map">
                <DeliveryMap data={trackData}/>
            </div>
        </div>
    );
};

export default Track;