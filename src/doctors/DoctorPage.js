import React, { Component } from 'react'
import {connect} from "react-redux"
import {getDoctors, saveDoctor} from "../store/actions/doctorActions"
import {Button, Loader, Grid, GridRow, Card, Image} from "semantic-ui-react"
import NavContainer from "../navigation/NavContainer"
import DoctorSearchForm from "./DoctorSearchForm"

class DoctorPage extends Component {

  state = {
    loading: false,
    clicked: false,
    featuredDoctor: {}
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

  featureHandler = (doctor) => {
    this.setState({...this.state, featuredDoctor: doctor})
  }

  clickHandler = () => {
    this.setState({...this.state, clicked: true})
  }

  clearFeatured = () => {
    this.setState({...this.state, featuredDoctor: {}})
  }

  doctorCards = () => {
    let i = 0;
    if (typeof this.props.doctors[0] !== "string"){
      return this.props.doctors.map(doctor => {
        ++i
        return (<Grid.Column key={i}>
          <Card className="doctorCard">
            <Card.Content>
              <Card.Header id="doctorName" textAlign="center">
              <Image src={doctor.profile.image_url} alt="" className="doctorImage" centered/>
              <br></br>
              {doctor.profile.first_name} {doctor.profile.last_name}
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <br></br>
              <Button onClick={() => this.featureHandler(doctor)}>See More</Button>
              <Button>Save Doctor</Button>
            </Card.Content>
          </Card>
        </Grid.Column>)
      })
    }
  }

  featureDoctor = () => {
    console.log(this.state.featuredDoctor)
    return (<Grid.Column key="0">
    <Card className="featuredDoctorCard">
      <Card.Content>
        <Card.Header id="doctorName" textAlign="center">
        <Image src={this.state.featuredDoctor.profile.image_url} alt="" className="doctorImage" centered/>
        <br></br>{this.state.featuredDoctor.profile.first_name} {this.state.featuredDoctor.profile.last_name}
        </Card.Header>
        <Card.Content>
          {this.state.featuredDoctor.profile.bio}
        </Card.Content>
      </Card.Content>
      <Card.Content>
          <h3>Practices</h3>
          <ul>
            {this.state.featuredDoctor.practices.map(practice => {
              return <li>{practice.name}
              <br></br>
              {practice.visit_address.street}, {practice.visit_address.city}, 
              {practice.visit_address.state} {practice.visit_address.zip}
              <br></br>
              {practice.phones[0].number}
              </li>
            })}
          </ul>
        </Card.Content>
      <Card.Content>
        <br></br>
        <Button>Save Doctor</Button>
        <Button onClick={this.clearFeatured}>Go Back</Button>
      </Card.Content>
    </Card>
  </Grid.Column>)
  }

  render() {
    return (
      <div className="doctors">
        <NavContainer />
        <h1>Doctors</h1>
        {this.props.doctors.length > 0 || this.props.myDoctors.length > 0 ? <Grid className="doctorGrid">
          <GridRow columns="3">
            {this.state.featuredDoctor.profile !== undefined ? this.featureDoctor() : this.props.doctors.length > 0 ? this.doctorCards(): this.myDoctorCards()}
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