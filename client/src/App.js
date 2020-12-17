import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import UserLanding from './components/UserLanding/UserLanding';
import VolunteerLanding from './components/VolunteerLanding/VolunteerLanding';
import AddTask from './components/AddTask/AddTask';
import Track from './components/Track/Track';
import Footer from './components/Footer/Footer';
import './App.scss';


export default function App() {
  return (
    <Router>
      <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/user/landing" component={UserLanding} />
          <Route path="/addTask" component={AddTask} />
          <Route path="/user/login"
            render={(props) => (
              <Login {...props} type="user"/>
            )}
          />
          <Route path="/user/track/:id"
            render={(props) => (
              <Track {...props}/>
            )}
          />

          <Route path="/volunteer/login"
            render={(props) => (
              <Login {...props} type="volunteer"/>
            )}
          />
          <Route path="/volunteer/landing" component={VolunteerLanding} />
          

          <Route path="/">
            <Home/>
          </Route>
        </Switch>
        <Footer/>
    </Router>
  );
}
