import React, { Component } from 'react'
import {connect} from "react-redux"
import {getDoctors, clearDoctors, saveDoctor, fetchMyDoctors, removeDoctor} from "../store/actions/doctorActions"
import {Button, Loader} from "semantic-ui-react"
import NavContainer from "../navigation/NavContainer"
import DoctorSearchForm from "./DoctorSearchForm"
import DoctorGrid from "./DoctorGrid"
import MyDoctorsGrid from "./MyDoctorsGrid"

class DoctorPage extends Component {

  state = {
    loading: false,
    clicked: false,
    doctors: false,
    myDoc: false
  }

  componentDidMount = () => {
    if (this.props.myDoctors === undefined && localStorage.token){
      this.props.getMyDoctors(this.props.user)
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.doctors !== undefined && ((this.props.doctors.length >= 0 && prevProps.doctors === undefined) || (prevProps.doctors.length !== this.props.doctors.length))){
      if (typeof this.props.doctors[0] === "string"){
        alert(this.props.doctors[0])
          this.setState({...this.state, loading: false})
      } else {
          this.setState({...this.state, loading: false, doctors: true})
      }
    }

    if (localStorage.token && (this.props.myDoctors === undefined)){
      this.props.getMyDoctors()
    }
  }

  searchHandler = (e, data) => {
    e.preventDefault()
    this.props.clearDoctors()
    this.loaderHandler()
    const state = data.state.toLocaleLowerCase()
    const city = data.city.toLocaleLowerCase().split(" ").join("-")
    const location = state.concat('-', city)
    this.props.fetchDoctors(location)
  }

  saveHandler = (doctor) => {
    if (localStorage.token){
      this.props.myDoctor(doctor)
    } else {
      this.goToLogin()
    }
  }

  deleteHandler = (doctor) => {
    let result = window.confirm("Are you sure you want to remove this doctor?")
    if (result === true){
      this.props.deleteDoc(doctor)
      alert("Doctor Removed!")
    }
  }

  featureHandler = (doctor) => {
    this.setState({...this.state, featuredDoctor: doctor})
  }

  clickHandler = () => {
    this.setState({clicked: true, loading: false, myDoc: false, doctors: false})
  }

  loaderHandler = () => {
    this.setState({
      loading: true,
      clicked: false,
      doctors: false,
      myDoc: false
    })
  }

  resetState = () => {
    this.setState({
      loading: false,
      clicked: false,
      doctors: false,
      myDoc: false
    })
  }

  myDocHandler = () => {
    if (this.props.myDoctors.length === 0){
      this.props.user.id ? this.searchForDoctors() : this.goToLogin()
    } else {
      this.setState({...this.state, myDoc: true, doctors: false})
    }
  }

  searchForDoctors = () => {
    let result = window.confirm("You Have No Doctors. Would You Like to Look Some Up?")
    if (result === true){
      this.clickHandler()
    }
  }

  goToLogin = () => {
    let result = window.confirm("You need to log in to see this. Would you like to?")
    if (result === true){
      window.location.replace("/login")
    } 
  }

  render() {
    return (
      <div className="doctors">
        <NavContainer />
        <h1>Doctors</h1> 
        {this.state.doctors === true ? <DoctorGrid doctors={this.props.doctors} save={this.saveHandler}/>: null}
        {this.state.myDoc === true ? <MyDoctorsGrid doctors={this.props.myDoctors} delete={this.deleteHandler}/>: null}
        {this.state.loading === false && this.state.clicked === false ? <Button className={this.state.doctors === true || this.state.myDoc === true ? "findMoreDoctors" : "findDoctors"} onClick={this.clickHandler}>Find Doctors</Button> : null}
        {this.state.loading === false && this.state.clicked === false ? <Button className={this.state.doctors === true || this.state.myDoc === true ? "findMoreDoctors" : "findDoctors"} onClick={this.myDocHandler}>My Doctors</Button> : null}
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
    clearDoctors: () => dispatch(clearDoctors()),
    myDoctor: (doctor) => dispatch(saveDoctor(doctor)),
    getMyDoctors: () => dispatch(fetchMyDoctors()),
    deleteDoc: (doctor) => dispatch(removeDoctor(doctor))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorPage)