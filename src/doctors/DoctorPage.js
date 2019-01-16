import React, { Component } from 'react'
import {connect} from "react-redux"
import {getDoctors, saveDoctor} from "../store/actions/doctorActions"
import {Button, Loader, Grid, GridRow, Card, Image} from "semantic-ui-react"
import NavContainer from "../navigation/NavContainer"
import DoctorSearchForm from "./DoctorSearchForm"

class DoctorPage extends Component {

  state = {
    loading: false,
    clicked: false
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.doctors.length !== this.props.doctors.length){
      if (typeof this.props.doctors[0] === "string"){
        alert(this.props.doctors[0])
      }
      this.setState({...this.state, loading: false})
    }
  }

  searchHandler = (e, data) => {
    e.preventDefault()
    this.setState({...this.state, clicked: false, loading: true})
    const state = data.state.toLocaleLowerCase()
    const city = data.city.toLocaleLowerCase().split(" ").join("-")
    const location = state.concat('-', city)
    this.props.fetchDoctors(location)
  }

  saveHandler = (doctor) => {

  }

  clickHandler = () => {
    this.setState({...this.state, clicked: true})
  }

  doctorCards = () => {
    let i = 0;
    if (typeof this.props.doctors[0] !== "string"){
      return this.props.doctors.map(doctor => {
        ++i
        console.log(doctor)
        return (<Grid.Column key={i}>
          <Card className="doctorCard">
            <Image src={doctor.profile.image_url} alt=""/>
            <Card.Content>
              <Card.Header id="doctorName" textAlign="center">
              {doctor.profile.first_name} {doctor.profile.last_name}
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <br></br>
              <Button>See More</Button>
              <Button>Save Doctor</Button>
            </Card.Content>
          </Card>
        </Grid.Column>)
      })
    }
  }

  render() {
    return (
      <div className="doctors">
        <NavContainer />
        <h1>Doctors</h1>
        {this.props.doctors.length > 0 || this.props.myDoctors.length > 0 ? <Grid className="doctorGrid">
          <GridRow columns="3">
            {this.props.doctors.length > 0 ? this.doctorCards(): this.myDoctorCard()}
          </GridRow>
        </Grid> : null}
        {this.state.loading === false && this.state.clicked === false ? <Button onClick={this.clickHandler}>Find Doctors</Button> : null}
        {this.state.loading === false && this.state.clicked === true ? <DoctorSearchForm searchHandler={this.searchHandler}/> : null}
        {this.state.loading === true ? <Loader active inline='centered' size="large" /> : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    doctors: state.doctors,
    myDoctors: state.myDoctors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDoctors: (location) => dispatch(getDoctors(location)),
    myDoctor: (user, doctor) => dispatch(saveDoctor(user, doctor))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorPage)