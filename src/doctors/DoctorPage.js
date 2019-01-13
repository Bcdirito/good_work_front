import React, { Component } from 'react'
import {connect} from "react-redux"
import {getDoctors} from "../store/actions/doctorActions"
import {Button, Loader, Grid, GridRow, Card, Image} from "semantic-ui-react"
import NavContainer from "../navigation/NavContainer"

class DoctorPage extends Component {

  state = {
    state: "NY",
    city: "New York",
    loading: false
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.doctors.length !== this.props.doctors.length){
      this.setState({...this.state, loading: false})
    }
  }

  clickHandler = () => {
    this.setState({...this.state, loading:true})
    const state = this.state.state.toLocaleLowerCase()
    const city = this.state.city.toLocaleLowerCase().split(" ").join("-")
    const location = state.concat('-', city)
    this.props.fetchDoctors(location)
  }

  doctorCards = () => {
    return this.props.doctors.map(doctor => {
      // debugger
      return (<Grid.Column>
        <Card>
          <Image src={doctor.profile.image_url} alt=""/>
          <Card.Content>
            <Card.Header id="" textAlign="center">
            {doctor.profile.first_name} {doctor.profile.last_name}
            </Card.Header>
          </Card.Content>
        </Card>
      </Grid.Column>)
    })
  }

  render() {
    return (
      <div className="doctors">
        <NavContainer />
        <h1>Doctors</h1>
        {this.props.doctors.length > 0 ? <Grid>
          <GridRow>
            {this.doctorCards()}
          </GridRow>
        </Grid> : null}
        {this.state.loading === false && this.props.doctors.length === 0 ? <Button onClick={this.clickHandler}>Fetch Doctors</Button> : null}
        {this.state.loading === true ? <Loader active inline='centered' size="large" /> : null}
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