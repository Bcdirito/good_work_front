import React, { Component } from 'react'
import {Button, Grid, GridRow, Card} from "semantic-ui-react"
import FeaturedMyDoctor from "./FeaturedMyDoctor"

export default class MyDoctorsGrid extends Component {
  state = {
    featured: {}
  }

  clearFeatured = () => {
    this.setState({featured: {}})
  }

  featureHandler = (doctor) => {
    this.setState({featured: doctor})
  }

  myDoctorCards = (doctors) => {
    let i = 0;
      return doctors.map(doctor => {
        ++i
        return (<Grid.Column key={i}>
          <Card className="doctorCard">
            <Card.Content>
              <Card.Header id="doctorName" textAlign="center">
              {doctor.profile.name}
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <br></br>
              <Button className="doctorSeeMore" onClick={() => this.featureHandler(doctor)}>See More</Button>
              <Button className="saveDoctor"onClick={() => this.props.delete(doctor)}>Remove Doctor</Button>
            </Card.Content>
          </Card>
        </Grid.Column>)
      })
    }

  render() {
    return (
      <div>
        <Grid className="doctorGrid">
          <GridRow columns="3">
            {this.state.featured.profile ? <FeaturedMyDoctor doctor={this.state.featured} clear={this.clearFeatured}/> : this.myDoctorCards(this.props.doctors)}
          </GridRow>
        </Grid> 
      </div>
    )
  }
}