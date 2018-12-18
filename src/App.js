import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import NavBar from "./general/NavBar"
import NoMatch from "./general/NoMatch"
import Home from "./general/Home"
import Goal from "./goals/Goal"
import './App.css';
import LoginPage from './general/LoginPage';

class App extends Component {
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
            <Route component={NoMatch}/>
          </Switch>
      </div>
    );
  }
}

export default App;
