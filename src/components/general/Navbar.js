import React, { Component } from 'react'
import {NavLink} from "react-router-dom"
export default class NavBar extends Component {
  render() {
    return (
      <div>
        <NavLink to="/" className="nav-item">Home</NavLink>
        <NavLink to="/doctors" className="nav-item">Doctors</NavLink>
        <NavLink to="/groups" className="nav-item">Groups</NavLink>
      </div>
    )
  }
}
