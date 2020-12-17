import React,{Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Login.scss';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            signup_username: '',
            signup_password: '',
            username: '',
            password: '',
            email: '',
            address: '',
            city: ''
        }
    }
    handleUserInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    gobackPage =()=>{
        this.props.history.goBack();
    }
    handleCancelBtn =(e)=>{
        e.preventDefault();
        this.gobackPage();
    }

    handleSubmitForm= (e)=>{
        e.preventDefault();
        const user={
            name:this.state.username,
            password:this.state.password
        }
        if(this.props.type==="user"){
            axios.post('http://localhost:8080/users/login', user)
            .then(data => {
                console.log('user Login',data);
                this.props.history.push({
                    pathname: '/user/landing',
                    state: { loggedUser: data.data, type: 'user' }
                })
            })
        }
        else{
            console.log("Vol is here!!!")
            axios.post('http://localhost:8080/volunteers/login', user)
            .then(data => {
                console.log('volunteer Login',data);
                this.props.history.push({
                    pathname: '/volunteer/landing',
                    state: { loggedVol: data.data, type: 'volunteer' }
                })
            })
        }
        
    }
    handleSignupForm = (e) => {
        e.preventDefault();
        const userObj = {
            name: this.state.signup_username,
            password: this.state.signup_password,
            email: this.state.email,
            address: this.state.address,
            city: this.state.city
        }
        if(this.props.type==="user"){
            axios.post('http://localhost:8080/users/signup', userObj)
            .then(data => {
                console.log('user signedUp');
                this.props.history.push({
                    pathname: '/user/landing',
                    state: { loggedUser: data.data }
                })
            })
        }
        else{
            console.log("Volnteer here");
            axios.post('http://localhost:8080/volunteers/signup', userObj)
            .then(data => {
                console.log('user signedUp');
                this.props.history.push({
                    pathname: '/volunteer/landing',
                    state: { loggedUser: data.data }
                })
            })
        }
    }
    render(){
        console.log(this.props.type);
        let heading;
        if(this.props.type==="user"){
            heading=<h1 className="login__title">User Login</h1>
        }    
        else{
            heading=<h1 className="login__title">Volunteer Login</h1>
        }
        const {signup_username, signup_password, address, city, username, password, email} = this.state
        return (
            <div className="login">
                {heading}
                <div className="forms-wrap">
                    
                        <form onSubmit={this.handleSubmitForm} className="login-form">
                            <p className="login-form__title">Sign In</p>
                            <label className="login-form__label">Enter your username</label>
                            <input type="text" name="username" className="login-form__input" value={username} onChange={this.handleUserInput}/>

                            <label className="login-form__label">Enter your password</label>
                            <input type="password" name="password" className="login-form__input" value={password} onChange={this.handleUserInput}/>

                            <button type="submit" className="login-form__button">L O G I N</button>
                        </form>
            
                  
                        <form onSubmit={this.handleSignupForm} className="signup-form">
                            <p className="login-form__title">Sign Up</p>
                            <label className="login-form__label">Enter your username</label>
                            <input type="text" name="signup_username" className="login-form__input" value={signup_username} onChange={this.handleUserInput}/>

                            <label className="login-form__label">Enter your password</label>
                            <input type="password" name="signup_password" className="login-form__input" value={signup_password} onChange={this.handleUserInput}/>

                            <label className="login-form__label">Enter your email</label>
                            <input type="text" name="email" className="login-form__input" value={email} onChange={this.handleUserInput}/>

                            <label className="login-form__label">Enter your Address</label>
                            <input type="text" name="address" className="login-form__input" value={address} onChange={this.handleUserInput}/>

                            <label className="login-form__label">Enter your City</label>
                            <input type="text" name="city" className="login-form__input" value={city} onChange={this.handleUserInput}/>

                            <button type="submit" className="login-form__button">S I G N U P</button>
                        </form>
                   
                </div>
            </div>
        );
    }
}

export default Login;