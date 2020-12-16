import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import './AddTask.scss';

class AddTask extends Component {

    constructor(props){
        super(props);
        this.state={
            storeName :'',
            storeAddress:'',
            orderNumber:'',
            pickupDate:''
        }
    }

    handleInputChange=(event)=>{
        const target = event.target;
        let value = target.value;
        const name = target.name;
        this.setState({
            [name]:value,
        });
    }

    handleSubmitTask= (e)=>{
        e.preventDefault();
        //this.props.history.push('/profile');
        //this.props.history.goBack();
        const taskObj = {
            userid: this.props.userID,
            storeName: this.state.storeName,
            storeAddress: this.state.storeAddress,
            orderNumber: this.state.orderNumber,
            pickupDate: this.state.pickupDate
        }
        this.setState({
            storeName :'',
            storeAddress:'',
            orderNumber:'',
            pickupDate:''
        });
        this.props.onTaskAdd(taskObj);
    }
    
    render(){
        return (
            <div className="add-task">
                <form onSubmit={this.handleSubmitTask}>
                    <div className="add-task__wrap">
                        <p className="add-task__title">Enter Grocery Store Details</p>
                        <label className="add-task__label">Store Name</label>
                        <input 
                            type="text"
                            placeholder="eg. Loblaws Lakeshore"
                            className="add-task__input"
                            name="storeName"
                            onChange={this.handleInputChange}
                            value={this.state.storeName} />
                        
                        <label className="add-task__label">Store Address</label>
                        <input 
                            type="text"
                            placeholder="100 Lakeshore Blvd"
                            className="add-task__input"
                            name="storeAddress"
                            onChange={this.handleInputChange}
                            value={this.state.storeAddress} />

                        <label className="add-task__label">Order Number</label>
                        <input 
                            type="text"
                            placeholder="PC1234567"
                            className="add-task__input"
                            name="orderNumber"
                            onChange={this.handleInputChange}
                            value={this.state.orderNumber}/>
                        <label className="add-task__label">Pick Up Date</label>
                        <input 
                            type="date"
                            placeholder="MM/DD/YYYY"
                            className="add-task__input"
                            name="pickupDate"
                            onChange={this.handleInputChange}
                            value={this.state.pickupDate}/>

                        <button className="add-task__button">S U B M I T</button>
                    </div>
                </form> 
            </div>
        );
    }
};

export default AddTask;