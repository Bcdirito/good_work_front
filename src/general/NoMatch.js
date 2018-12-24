import wrongMap from "../media/noMatchMap.jpeg"
import React, { Component } from 'react'

export default class NoMatch extends Component {
  render() {
    return (
      <div>
        <div className="header"><h1>My Friend, You Seem To Have Gotten Lost</h1></div>
        <br></br>
        <div id="wrongPlace"></div><img src={wrongMap} alt="no match"></img>
    </div>  
    )
  }
}