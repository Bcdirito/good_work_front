import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { Menu } from "semantic-ui-react"
import { connect } from "react-redux"

class NavBar extends Component {
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

          <Menu.Menu position="right">
            <Menu.Item>
              <NavLink to="/login" onClick={this.props.logout}>{this.props.user.keys === undefined ? "Login" : "Logout "}</NavLink>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: user => dispatch({type: "LOGOUT_USER", user})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)