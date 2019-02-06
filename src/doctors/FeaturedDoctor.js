import React, { Component } from 'react'
import {Card, Image, Button} from "semantic-ui-react"

export default class componentName extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

// featureDoctor = () => {
//     return (<div>
//       <Card className="featuredDoctorCard">
//         <Card.Content>
//           <Card.Header id="doctorName" textAlign="center">
//           {this.state.featuredDoctor.profile.image_url && this.state.featuredDoctor.profile.image_url.includes("general") ? null : <Image src={this.state.featuredDoctor.profile.image_url} alt="" className="doctorImage" centered/>}
//           <br></br>
//           {this.state.featuredDoctor.profile.first_name} {this.state.featuredDoctor.profile.last_name}
//           </Card.Header>
//           <br></br>
//           <Card.Content className="doctorBio" textAlign="left">
//             {this.state.featuredDoctor.profile.bio}
//           </Card.Content>
//         </Card.Content>
//         <Card.Content className="practices">
//             <Card.Header>Practices</Card.Header>
//             <ul>
//               {this.state.featuredDoctor.practices.map(practice => {
//                 return <li>{practice.name}
//                 <br></br>
//                 {practice.visit_address.street}, {practice.visit_address.city}, {practice.visit_address.state} {practice.visit_address.zip}
//                 <br></br>
//                 Phone: {practice.phones[0].number}
//                 </li>
//               })}
//             </ul>
//           </Card.Content>
//       </Card>
//       <div className="underFeatureDoctorButtons">
//         <Button className="saveDoctor" onClick={() => this.saveHandler(this.state.featuredDoctor)}>Save Doctor</Button>
//         <Button className="featuredDocGoBack" onClick={this.clearFeatured}>Go Back</Button>
//       </div>
//     </div>)
//   }