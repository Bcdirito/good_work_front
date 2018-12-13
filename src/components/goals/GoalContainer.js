import React, { Component } from 'react'
import {connect} from "react-redux"

class GoalContainer extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        This is the GoalContainer
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(GoalContainer)