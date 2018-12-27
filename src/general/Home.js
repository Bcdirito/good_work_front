import React, { Component } from 'react'
import GoalContainer from "../goals/GoalContainer"
import Profile from "./Profile"
import { connect } from "react-redux"
import { Button } from 'semantic-ui-react';

class Home extends Component {
  clickHandler = e => {
    console.log("clicked")
    this.props.history.push(`/${e.target.name}`)
  }

  homeRender = () => {
    if (this.props.user.id) {
      return <Profile history={this.props.history}/>
    } else {
      return (<div>
        <div>
              <Button name="login" onClick={e => this.clickHandler(e)} color="blue">Login/Sign Up</Button>
              <Button name="doctors" onClick={e => this.clickHandler(e)} color="blue">Find A Doctor</Button>
        </div>
      </div>)
    }
  }

  render() {
    return (
      <div className="welcome">
        <h1 id="greeting">{this.props.user.name ? `Hello, ${this.props.user.name}`: "Welcome to Good Work"}</h1>
        {this.homeRender()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps)(Home)
