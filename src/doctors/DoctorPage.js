import React, { Component } from 'react'
import {connect} from "react-redux"
import {getDoctors, saveDoctor, savePractice, fetchMyDoctors} from "../store/actions/doctorActions"
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

    if (this.props.user.id && prevProps.myDoctors.length === this.props.myDoctors.length){
      this.getDoctors()
    }
  }

  getDoctors = () => {
    this.props.getMyDoctors(this.props.user)
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
    this.props.myDoctor(this.props.user, doctor)
    this.setState({...this.state, loading: true})
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

  resetState = () => {
    this.setState({
      loading: false,
      clicked: false,
      featuredDoctor: {}
    })
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
              {doctor.profile.first_name} {doctor.profile.last_name}
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <br></br>
              <Button className="doctorSeeMore" onClick={() => this.featureHandler(doctor)}>See More</Button>
              <Button className="saveDoctor"onClick={() => this.saveHandler(doctor)}>Save Doctor</Button>
            </Card.Content>
          </Card>
        </Grid.Column>)
      })
    }
  }

  // myDoctorCards = () => {
  //   console.log(this.props.myDoctors)
  // }

  featureDoctor = () => {
    return (<div>
      <Card className="featuredDoctorCard">
        <Card.Content>
          <Card.Header id="doctorName" textAlign="center">
          {this.state.featuredDoctor.profile.image_url && this.state.featuredDoctor.profile.image_url.includes("general") ? null : <Image src={this.state.featuredDoctor.profile.image_url} alt="" className="doctorImage" centered/>}
          <br></br>
          {this.state.featuredDoctor.profile.first_name} {this.state.featuredDoctor.profile.last_name}
          </Card.Header>
          <br></br>
          <Card.Content className="doctorBio" textAlign="left">
            {this.state.featuredDoctor.profile.bio}
          </Card.Content>
        </Card.Content>
        <Card.Content className="practices">
            <Card.Header>Practices</Card.Header>
            <ul>
              {this.state.featuredDoctor.practices.map(practice => {
                return <li>{practice.name}
                <br></br>
                {practice.visit_address.street}, {practice.visit_address.city}, {practice.visit_address.state} {practice.visit_address.zip}
                <br></br>
                Phone: {practice.phones[0].number}
                </li>
              })}
            </ul>
          </Card.Content>
      </Card>
      <div className="underFeatureDoctorButtons">
        <Button className="saveDoctor" onClick={() => this.saveHandler(this.state.featuredDoctor)}>Save Doctor</Button>
        <Button className="featuredDocGoBack" onClick={this.clearFeatured}>Go Back</Button>
      </div>
    </div>)
  }

  render() {
    console.log(this.props.myDoctors)
    return (
      <div className="doctors">
        <NavContainer />
        <h1>Doctors</h1>
        {typeof this.props.doctors[0] === "object" && this.state.clicked === false ? 
        <Grid className="doctorGrid">
          <GridRow columns="3">
            {this.state.featuredDoctor.profile !== undefined ? this.featureDoctor() : this.props.doctors.length > 0 ? this.doctorCards(): null}
          </GridRow>
        </Grid> : null}
        {this.state.loading === false && this.state.clicked === false ? <Button className={typeof this.props.doctors[0] === "object" ? "findMoreDoctors" : "findDoctors"} onClick={this.clickHandler}>Find Doctors</Button> : null}
        {this.state.loading === false && this.state.clicked === true ? <DoctorSearchForm searchHandler={this.searchHandler} resetState={this.resetState}/> : null}
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
    myDoctor: (user, doctor) => dispatch(saveDoctor(user, doctor)),
    storePractice: (user, practice) => dispatch(savePractice(user, practice)),
    getMyDoctors: (user) => dispatch(fetchMyDoctors(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorPage)