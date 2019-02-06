import React, { Component } from 'react'
import {Button, Loader, Grid, GridRow, Card, Image} from "semantic-ui-react"
import FeaturedDoctor from "./FeaturedDoctor"

export default class DoctorsGrid extends Component {
    state = {
        featured = {}
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
              <Button className="saveDoctor"onClick={() => this.saveHandler(doctor)}>Save Doctor</Button>
            </Card.Content>
          </Card>
        </Grid.Column>)
    })
    return (
      <div>
        <Grid className="doctorGrid">
          <GridRow columns="3">
            {doctors}
          </GridRow>
        </Grid> 
      </div>
    )
  }
}

