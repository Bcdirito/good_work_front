import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { Menu } from "semantic-ui-react"

export default class NavBar extends Component {
  render() {
    return (
        <Menu id="navbar">
          <Menu.Item>
            <NavLink to="/" className="nav-item">Home</NavLink>
          </Menu.Item>

          <Menu.Item>
            <NavLink to="/doctors" className="nav-item">Doctors</NavLink>
          </Menu.Item>

          <Menu.Item>
            <NavLink to="/groups" className="nav-item">Groups</NavLink>
          </Menu.Item>
        </Menu>
    )
  }
}
