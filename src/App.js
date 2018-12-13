import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
// import NavBar from "./components/general/NavBar"
import NoMatch from "./components/general/NoMatch"
import Home from "./components/general/Home"
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
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
