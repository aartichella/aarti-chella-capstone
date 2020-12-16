import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './VolunteerLanding.scss';

class VolunteerLanding extends Component{
    constructor(props){
        super(props);
        this.state ={
            ordersList: [],
            trackData:'',
            loggedVol:{},
            isUpdated:false
        }
    }
    componentDidMount(){
        console.log("back here honey");
        const volId = this.props.location.state.loggedVol.id;
        this.setState({
            loggedVol: this.props.location.state.loggedVol
        });
        // get tasks for the user from nodejs
        axios.get(`http://localhost:8080/volunteers/${volId}/tasks`)
            .then(data => {
                console.log('tasks for volunteer', data);
                this.setState({
                    ordersList: data.data
                })
            });
    }
    
    render(){
        if(this.state.loggedVol){
            return(
                <div className="vol-wrapper">
                    <h1 className="landing__title">Volunteer Task List</h1>
                    <div className="landing__user">
                        <p className="landing__user-address">Name : {this.state.loggedVol.name}</p>
                    </div>
                    <div className="vol-task">
                    <div className="task-list__header">
                            <p className="order-number">Order Number</p>
                            <p className="store-name">Pickup Location</p>
                            <p className="delivery-date">Delivery Date</p>
                            <p className="delivery-status">Status</p>
                            <p className="track-button">Tracking Details</p>

                    </div>
                    <div >   
                        {this.state.ordersList.map(data=> (
                            
                            <div key={data.taskId} className="task-list__table">
                                <p className="order-number">{data.orderNumber}</p>
                                <p className="store-name">{data.storeName}</p>
                                <p className="delivery-date">{data.deliveryDate}</p>
                                <p className="delivery-status">{data.deliveryStatus}</p>
                                <Link to={
                                    {   pathname:`/user/track/${data.taskId}`,
                                        state:{
                                            trackData: data,
                                            type:'volunteer',
                                            volunteer: this.state.loggedVol
                                        }
                                    }
                                } className={data.volunteerId?"track-button":"view-button"}>
                                    <button>{data.volunteerId ?"A C C E P T E D" :"V I E W"}</button>
                                </Link>
                            </div>
                            ))
                        }
                    </div>
                    </div>
                </div>
            )
        }
        else{
            return(
            <div>Loading..</div>
            )
        }
    }

};

export default VolunteerLanding;
