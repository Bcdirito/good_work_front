import React, { Component } from 'react'
import GoalContainer from "../goals/GoalContainer"
import { connect } from "react-redux"
import { Button } from 'semantic-ui-react';

class Home extends Component {

  clickHandler = e => {
    this.props.history.replace(`/${e.target.name}`)
  }

  homeRender = () => {
    if (this.props.user.length === undefined) {
      return (<div>
                <h1>Welcome to Good Work</h1>
                <div id="welcome">
                      <Button name="login" onClick={e => this.clickHandler(e)} color="blue">Login/Sign Up</Button>
                      <Button name="doctors" onClick={e => this.clickHandler(e)} color="blue">Find A Doctor</Button>
                </div>
              </div>)
    } else {
      return <GoalContainer />
    }
  }

  render() {
    return (
      <div>
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
