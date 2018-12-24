import React, { Component } from 'react'
import GoalContainer from "../goals/GoalContainer"
import { connect } from "react-redux"
import { Button } from 'semantic-ui-react';
import { createSession } from "../store/actions/userActions"

class Home extends Component {
  clickHandler = e => {
    this.props.history.push(`/${e.target.name}`)
  }

  componentDidMount(){
    const userToken = localStorage.getItem("token")
    if(userToken) {
      fetch(`http://localhost:3000/api/v1/profile`, {
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json",
          "Authorization": `${userToken}`
        }
      })
      .then(res => res.json())
      .then(res => {
        if (res.message){
          alert(res.message)
        }
        this.props.login(res.user)
      })
      .catch(console.error)
    } else {
      localStorage.clear()
    }
  }

  homeRender = () => {
    if (this.props.user.id) {
      return <GoalContainer history={this.props.history}/>
    } else {
      return (<div>
        <div id="welcome">
              <Button name="login" onClick={e => this.clickHandler(e)} color="blue">Login/Sign Up</Button>
              <Button name="doctors" onClick={e => this.clickHandler(e)} color="blue">Find A Doctor</Button>
        </div>
      </div>)
    }
  }

  render() {
    return (
      <div>
        <h1>Welcome to Good Work</h1>
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

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(createSession(user))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
