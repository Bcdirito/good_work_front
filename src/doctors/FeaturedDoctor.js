import React, { Component } from 'react'
import {Card, Image, Button} from "semantic-ui-react"

export default class componentName extends Component {
  render() {
    return (
      <div>
        <Card className="featuredDoctorCard">
        <Card.Content>
          <Card.Header id="doctorName" textAlign="center">
          {this.props.doctor.profile.image_url && this.props.doctor.profile.image_url.includes("general") ? null : <Image src={this.props.doctor.profile.image_url} alt="" className="doctorImage" centered/>}
          <br></br>
          {this.props.doctor.profile.first_name} {this.props.doctor.profile.last_name}
          </Card.Header>
          <br></br>
          <Card.Content className="doctorBio" textAlign="left">
            {this.props.doctor.profile.bio}
          </Card.Content>
        </Card.Content>
        <Card.Content className="practices">
            <Card.Header>Practices</Card.Header>
            <ul>
              {this.props.doctor.practices.map(practice => {
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
        <Button className="saveDoctor" onClick={() => this.props.save(this.props.doctor)}>Save Doctor</Button>
        <Button className="featuredDocGoBack" onClick={this.props.clear}>Go Back</Button>
      </div>
      </div>
    )
  }
}