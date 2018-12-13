import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import Navbar from "./components/general/Navbar"
import NoMatch from "./components/general/NoMatch"
import Home from "./components/general/Home"
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar />
        <Switch>
          <Route exact path="/" render={(props) => (
            <Home {...props}/>
          )}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default App;
