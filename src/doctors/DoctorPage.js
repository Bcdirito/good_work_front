import React, { Component } from 'react'
import {connect} from "react-redux"
import {getDoctors, saveDoctor, fetchMyDoctors} from "../store/actions/doctorActions"
import {Button, Loader, Grid, GridRow, Card, Image} from "semantic-ui-react"
import NavContainer from "../navigation/NavContainer"
import DoctorSearchForm from "./DoctorSearchForm"
import DoctorGrid from "./DoctorGrid"
import MyDoctorsGrid from "./MyDoctorsGrid"

class DoctorPage extends Component {

  state = {
    loading: false,
    clicked: false,
    myDoc: false
  }

  componentDidMount = () => {
    if (this.props.myDoctors.length === 0 && this.props.user.id){
      this.props.getMyDoctors(this.props.user)
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.doctors.length !== this.props.doctors.length){
      if (typeof this.props.doctors[0] === "string"){
        alert(this.props.doctors[0])
      }
      this.setState({...this.state, loading: false})
    }
    if (this.props.user.id !== prevProps.user.id){
      this.props.getMyDoctors(this.props.user)
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
    if (this.props.user.id){
      this.props.myDoctor(this.props.user, doctor)
      this.setState({...this.state, loading: true}) 
    } else {
      this.goToLogin()
    }
  }

  featureHandler = (doctor) => {
    this.setState({...this.state, featuredDoctor: doctor})
  }

  featureMyHandler = (doctor) => {
    this.setState({...this.state, featuredMyDoctor: doctor})
  }

  clickHandler = () => {
    this.setState({...this.state, clicked: true})
  }

  clearFeatured = () => {
    this.setState({...this.state, featuredDoctor: {}})
  }

  myDocHandler = () => {
    if (this.props.myDoctors.length === 0){
      this.props.user.id ? alert("You have no doctors.") : this.goToLogin()
    } else {
      this.setState({...this.state, myDoc: true})
    }
  }

  goToLogin = () => {
    let result = window.confirm("You need to log in to see this. Would you like to?")
    if (result === true){
      window.location.replace("/login")
    } 
  }

  resetState = () => {
    this.setState({
      loading: false,
      clicked: false,
      myDoc: false,
      featuredDoctor: {}
    })
  }

  doctorCards = (doctors) => {
    let i = 0;
    if (typeof doctors[0] !== "string"){
      return doctors.map(doctor => {
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
    return (
      <div className="doctors">
        <NavContainer />
        <h1>Doctors</h1> 
          {this.props.doctors.length > 0 ? this.doctorCards(this.props.doctors): null}
          {this.state.myDoc === true ? <MyDoctorsGrid doctors={this.props.myDoctors} />: null}
        {this.state.loading === false && this.state.clicked === false ? <Button className={typeof this.props.doctors[0] === "object" ? "findMoreDoctors" : "findDoctors"} onClick={this.clickHandler}>Find Doctors</Button> : null}
        {this.state.loading === false && this.state.clicked === false ? <Button className={typeof this.props.doctors[0] === "object" ? "findMoreDoctors" : "findDoctors"} onClick={this.myDocHandler}>My Doctors</Button> : null}
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
    getMyDoctors: (user) => dispatch(fetchMyDoctors(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorPage)