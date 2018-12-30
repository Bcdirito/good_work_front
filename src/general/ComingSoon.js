import React, { Component } from 'react'
import NavContainer from "../navigation/NavContainer"

export default class componentName extends Component {
  render() {
    return (
      <div className="doctor">
        <NavContainer />
        <div className="comingSoon">
            <h1>My friend, You've Arrived Here Before We Did</h1>
            <h2>We promise we'll catch up with this soon.</h2>
        </div>
      </div>
    )
  }
}
