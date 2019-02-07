import React, { Component } from 'react'
import {Card, Image, Button} from "semantic-ui-react"

export default class FeaturedMyDoctor extends Component {
  render() {
    return (
      <div>
            <Card className="featuredDoctorCard">
            <Card.Content>
            <Card.Header id="doctorName" textAlign="center">
            {this.props.doctor.profile.image ? <Image src={this.props.doctor.profile.image} alt="" className="doctorImage" centered/> : null}
            <br></br>
            {this.props.doctor.profile.name}
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
                    return <li key={practice.id}>{practice.name}
                    <br></br>
                    {practice.address}
                    <br></br>
                    Phone: {practice.phone}
                    </li>
                })}
                </ul>
            </Card.Content>
        </Card>
        <div className="underFeatureDoctorButtons">
            <Button className="featuredDocGoBack" onClick={this.props.clearFeatured}>Go Back</Button>
        </div>
      </div>
    )
  }
}