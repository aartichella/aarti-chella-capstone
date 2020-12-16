import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddTask from '../AddTask/AddTask';
import './UserLanding.scss';

class UserLanding extends Component{
    constructor(props){
        super(props);
        this.state ={
            ordersList: [],
            trackData:'',
            loggedUser:{}
        }
    }
    
    componentDidMount(){
        console.log(this.props.location.state.loggedUser);
        const userId = this.props.location.state.loggedUser.id;
        this.setState({
            loggedUser: this.props.location.state.loggedUser
        });
        // get tasks for the user from nodejs
        axios.get(`http://localhost:8080/users/${userId}/tasks`)
            .then(data => {
                console.log('tasks for user', data);
                this.setState({
                    ordersList: data.data
                })
            });
    }
    handleAddTask = (taskObj) => {
        const userId = this.props.location.state.loggedUser.id;
        axios.post(`http://localhost:8080/users/${userId}/addTask`,taskObj)
            .then(data => {
                console.log('addedtasks for user', data);
                this.setState(state =>({
                    ordersList: [...state.ordersList, data.data]
                }))
            });
    }
    render(){
        if(this.state.loggedUser){
        return (
            <div className="landing-wrapper">
                <div className="landing">
                    <h1 className="landing__title">Orders and Details</h1>
                    <div className="landing__user">
        <p className="landing__user-address">Delivery Address : {this.state.loggedUser.address}</p>
                    </div>
                </div>
                <div className="task-container">
                    <AddTask userID={this.state.loggedUser.id} onTaskAdd={this.handleAddTask}/>
                    <div className="task-list">   
                        <div className="task-list__header">
                            <p className="order-number">Order Number</p>
                            <p className="store-name">Pickup Location</p>
                            <p className="delivery-date">Delivery Date</p>
                            <p className="delivery-status">Status</p>
                            <p className="track-button">Tracking Details</p>

                        </div>
                        {this.state.ordersList.map(data=> (
                                <div key={data.taskId} className="task-list__table">
                                    
                                    <p className="order-number">{data.orderNumber}</p>
                                    <p className="store-name">{data.storeName}</p>
                                    <p className="delivery-date">{data.deliveryDate}</p>
                                    <p className="delivery-status">{data.deliveryStatus}</p>
                                    <Link to={
                                        {   pathname:`/user/track/${data.taskId}`,
                                            state:{
                                                trackData: data
                                            }
                                        }
                                    } className="track-button">
                                    <button>T R A C K</button>
                                    </Link>
                                </div>
                            )
                        )
                    }
                    </div>
                </div>
            </div>
        );
        }
        else{
            return(
                <div>Loading..</div>
            );
        }
    }
};

export default UserLanding;