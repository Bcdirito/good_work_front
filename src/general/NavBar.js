import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { Menu } from "semantic-ui-react"
import { connect } from "react-redux"

class NavBar extends Component {

  handleLogout = () => {
    localStorage.clear()
    this.props.logout()
  }

  render() {
    return (
        <Menu id="navbar">
          <Menu.Item>
            <NavLink to="/" className="nav-item">Home</NavLink>
          </Menu.Item>

          <Menu.Item>
            <NavLink to="/doctors" className="nav-item">Doctors</NavLink>
          </Menu.Item>

          {this.props.user.id ?<Menu.Item>
            <NavLink to="/goals" className="nav-item">Goals</NavLink>
          </Menu.Item> : null}

          {this.props.user.id ? <Menu.Item>
            <NavLink to="/partner" className="nav-item">Partner</NavLink>
          </Menu.Item> : null}

          <Menu.Menu position="right">
            <Menu.Item>
                {this.props.user.id === undefined ? <NavLink to="/login">Login</NavLink> : <NavLink to="/" onClick={this.handleLogout}>Logout</NavLink>}
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