import React, { Component } from 'react'
import NavContainer from "../navigation/NavContainer"

export default class NoMatch extends Component {
  render() {
    return (
      <div className="noMatch">
        <NavContainer />

        <h1 className="lost">My Friend, You Seem To Have Gotten Lost</h1>
        
    </div>  
    )
  }
}