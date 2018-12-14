import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import NavBar from "./components/general/NavBar"
import NoMatch from "./components/general/NoMatch"
import Home from "./components/general/Home"
import './App.css';
import LoginPage from './components/general/LoginPage';

class App extends Component {
  render() {
    return (
      <div className="App">
      <NavBar />
        <Switch>
          <Route exact path="/" render={(props) => (
            <Home {...props}/>
          )}/>
          <Route exact path="/login" component={LoginPage} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default App;
