import React, { Component } from 'react'
import {Button, Grid, GridRow, Card} from "semantic-ui-react"
import FeaturedDoctor from "./FeaturedDoctor"

export default class DoctorGrid extends Component {
  state = {
      featured: {}
  }
  
  clearFeatured = () => {
    this.setState({featured: {}})
  }

  featureHandler = (doctor) => {
    this.setState({featured: doctor}, () => console.log(this.state.featured))
  }

  render() {
    let i = 0
    const doctors = this.props.doctors.map(doctor => {
        i++
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
              <Button className="saveDoctor"onClick={() => this.props.save(doctor)}>Save Doctor</Button>
            </Card.Content>
          </Card>
        </Grid.Column>)
    })
    
    return (
      <div>
        <Grid className="doctorGrid">
          <GridRow columns="3">
            {this.state.featured.profile ? <FeaturedDoctor doctor={this.state.featured} clear={this.clearFeatured} save={this.props.save}/>: doctors}
          </GridRow>
        </Grid> 
      </div>
    )
  }
}

