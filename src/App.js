import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import NoMatch from "./general/NoMatch"
import Home from "./general/Home"
import Goal from "./goals/Goal"
import Partner from "./general/Partner"
import './App.css';
import "./css/menu.css"
import LoginPage from './general/LoginPage';
import { connect } from "react-redux"
import { createSession } from "./store/actions/userActions"
import GoalContainer from './goals/GoalContainer';
import DoctorPage from './doctors/DoctorPage';

class App extends Component {

  componentDidMount() {
    const userToken = localStorage.getItem("token")
    if(userToken) {
      fetch(`https://git.heroku.com/good-work-backend.git/api/v1/profile`, {
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json",
          "Authorization": `${userToken}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.message){
          alert(data.message)
        }
        this.props.login(data.user)
      })
      .catch(console.error)
    } else {
      localStorage.clear()
    }
  }

  render() {
    return (
      <div className="App">
          <Switch>
            <Route exact path="/" render={(props) => (
              <Home {...props}/>
            )}/>
            <Route exact path="/login" render={(props) => (
              <LoginPage {...props} />
            )} />
            <Route exact path="/goals" render={(props) => (
              <GoalContainer {...props} />
            )} />
            <Route exact path="/goals/:id" render={(props) => (
              <Goal {...props} />
            )} />
            <Route exact path="/partners" render={(props) => (
              <Partner {...props} />
          )} />
            <Route exact path="/doctors" render={(props) => (
                <DoctorPage {...props} />
            )} />
            <Route component={NoMatch}/>
          </Switch>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(createSession(user))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));