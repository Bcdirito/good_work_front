import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import NavBar from "./general/NavBar"
import NoMatch from "./general/NoMatch"
import Home from "./general/Home"
import Goal from "./goals/Goal"
import Partner from "./general/Partner"
import './App.css';
import LoginPage from './general/LoginPage';

class App extends Component {

  componentDidMount = () => {
    const userToken = localStorage.getItem("token")
    console.log(userToken)
    if(userToken && userToken !== "undefined") {
      fetch(`http://localhost:3000/api/v1/profile`, {
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json",
          "Authorization": `${userToken}`
        }
      })
      .then(res => res.json())
      .then(res => {
        if (res.message){
          alert(res.message)
        }
        this.props.login(res.user)
      })
      .catch(console.error)
    } else {
      localStorage.clear()
    }
  }

  render() {
    return (
      <div className="App">
      <NavBar />
          <Switch>
            <Route exact path="/" render={(props) => (
              <Home {...props}/>
            )}/>
            <Route exact path="/login" render={(props) => (
              <LoginPage {...props} />
            )} />
            <Route exact path="/goals/:id" render={(props) => (
              <Goal {...props} />
            )} />
            <Route exact path="/partner" render={(props) => (
              <Partner {...props} />
          )} />
            <Route component={NoMatch}/>
          </Switch>
      </div>
    );
  }
  
}



export default App;
