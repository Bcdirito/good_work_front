import React, { Component } from 'react'
import { connect } from "react-redux"

class NavContainer extends Component {
  render() {
    return (
      <nav role="navigation">
        <div id="menuToggle">
          
          <input type= "checkbox" />
          
          <span></span>
          <span></span>
          <span></span>
          
        
          <ul id="menu">
            <a href="/"><li>Home</li></a>
            <a href="/goals"><li>Goals</li></a>
            <a href="/partners"><li>Partners</li></a>
            <a href="/doctors"><li>Doctors</li></a>
            <a href="/login"><li>{this.props.user.id ? "Logout" : "Login"}</li></a>
          </ul>
        </div>
      </nav>
    )
  }
}

 const mapStateToProps = state => {
   return {
     user: state.user
   }
 }

export default connect(mapStateToProps)(NavContainer)