import React, { Component } from 'react'
import {Button, Loader, Grid, GridRow, Card, Image} from "semantic-ui-react"
import FeaturedMyDoctor from "./FeaturedMyDoctor"

export default class MyDoctorsGrid extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

// myDoctorCards = (doctors) => {
//     let i = 0;
//       return doctors.map(doctor => {
//         ++i
//         return (<Grid.Column key={i}>
//           <Card className="doctorCard">
//             <Card.Content>
//               <Card.Header id="doctorName" textAlign="center">
//               {doctor.profile.name}
//               </Card.Header>
//             </Card.Content>
//             <Card.Content>
//               <br></br>
//               <Button className="doctorSeeMore" onClick={() => this.featureMyHandler(doctor)}>See More</Button>
//               <Button className="saveDoctor"onClick={() => this.deleteHandler(doctor)}>Remove Doctor</Button>
//             </Card.Content>
//           </Card>
//         </Grid.Column>)
//       })
//     }