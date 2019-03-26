import React, { Component } from 'react'
import Profile from "./Profile"
import { connect } from "react-redux"
import { Button, Loader} from 'semantic-ui-react';
import NavContainer from "../navigation/NavContainer"


class Home extends Component {
  state = {
    loading: true
  }

  clickHandler = e => {
    this.props.history.push(`/${e.target.name}`)
  }

  componentDidMount = () => {
    if (localStorage.length === 0 && this.props.history.action !== "REPLACE"){
      this.setState({loading: false})
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props){
      this.setState({loading: false})
    }
  }

  homeRender = () => {
    if (this.props.user.id) {
      return <Profile history={this.props.history}/>
    } else {
      return (<div>
        <div>
              <Button name="login" onClick={e => this.clickHandler(e)} className="homeButton">{"Login/Sign Up"}</Button>
              <Button name="doctors" className="homeButton" onClick={e => this.clickHandler(e)} >Find A Doctor</Button>
        </div>
      </div>)
    }
  }

  loadingHandler = () => {
    this.setState({loading: true})
  }

  render() {
    return (
      <div className="welcome">
        <NavContainer />
          <div id="greeting">
            <h1 className="greetingHeader">{this.props.user.name ? `Hello, ${this.props.user.name}`: "Welcome to Good Work"}</h1>
            {this.state.loading === true ? <Loader active inline='centered' size="large" />: this.homeRender()}
          </div>
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
