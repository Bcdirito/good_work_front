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
              <Button name="login" onClick={e => this.clickHandler(e)}>Login/Sign Up</Button>
              <Button name="doctors" onClick={e => this.clickHandler(e)}>Find A Doctor</Button>
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
