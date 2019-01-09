import React, { Component } from 'react'
import {connect} from "react-redux"
import {getDoctors} from "../store/actions/doctorActions"
import {Button} from "semantic-ui-react"
import NavContainer from "../navigation/NavContainer"

class DoctorPage extends Component {

  state = {
    state: "NY",
    city: "New York"
  }

  clickHandler = () => {
    const state = this.state.state.toLocaleLowerCase()
    const city = this.state.city.toLocaleLowerCase().split(" ").join("-")
    const location = state.concat('-', city)
    this.props.fetchDoctors(location)
  }

  render() {
    return (
      <div>
        <NavContainer />
        <Button onClick={this.clickHandler}>Fetch Doctors</Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    doctors: state.doctors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDoctors: (location) => dispatch(getDoctors(location))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorPage)