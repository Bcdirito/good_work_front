import React, { Component } from "react"
import { Form, Dropdown, Input, Button } from "semantic-ui-react"

export default class DoctorSearchForm extends Component {

    state = {
        city: "",
        state: "",
    }

    handleCityChange = e => {
        this.setState({...this.state, city: e.target.value })
    }

    handleStateChange = e => {
        this.setState({...this.state, state: 
            e.currentTarget.firstElementChild.innerText})
    }

    render() {
        const stateAbbreviations = [
            {key: "AK", value: "AK", text: "AK"}, {key: "AL", value: "AL", text: "AL"}, {key: "AR", value: "AR", text: "AR"}, {key: "AZ", value: "AZ", text: "AZ"}, {key: "CA", value: "CA", text: "CA"}, {key: "CO", value: "CO", text: "CO"}, {key: "CT", value: "CT", text: "CT"}, {key: "DC", value: "DC", text: "DC"}, {key: "DE", value: "DE", text: "DE"}, {key: "FL", value: "FL", text: "FL"}, {key: "GA", value: "GA", text: "GA"}, {key: "HI", value: "HI", text: "HI"}, {key: "IA", value: "IA", text: "IA"}, {key: "ID", value: "ID", text: "ID"}, {key: "IL", value: "IL", text: "IL"}, {key: "IN", value: "IN", text: "IN"}, {key: "KS", value: "KS", text: "KS"}, {key: "KY", value: "KY", text: "KY"}, {key: "LA", value: "LA", text: "LA"}, {key: "MA", value: "MA", text: "MA"}, {key: "MD", value: "MD", text: "MD"}, {key: "ME", value: "ME", text: "ME"}, {key: "MI", value: "MI", text: "MI"}, {key: "MN", value: "MN", text: "MN"}, {key: "MO", value: "MO", text: "MO"}, {key: "MS", value: "MS", text: "MS"}, {key: "MT", value: "MT", text: "MT"}, {key: "NE", value: "NE", text: "NE"}, {key: "NH", value: "NH", text: "NH"}, {key: "NJ", value: "NJ", text: "NJ"}, {key: "NM", value: "NM", text: "NM"}, {key: "NV", value: "NV", text: "NV"}, {key: "NY", value: "NY", text: "NY"}, {key: "NC", value: "NC", text: "NC"}, {key: "ND", value: "ND", text: "ND"}, {key: "OH", value: "OH", text: "OH"}, {key: "OK", value: "OK", text: "OK"}, {key: "OR", value: "OR", text: "OR"}, {key: "PA", value: "PA", text: "PA"}, {key: "RI", value: "RI", text: "RI"}, {key: "SC", value: "SC", text: "SC"}, {key: "SD", value: "SD", text: "SD"}, {key: "TN", value: "TN", text: "TN"}, {key: "TX", value: "TX", text: "TX"}, {key: "UT", value: "UT", text: "UT"}, {key: "VA", value: "VA", text: "VA"}, {key: "VT", value: "VT", text: "VT"}, {key: "WA", value: "WA", text: "WA"}, {key: "WI", value: "WI", text: "WI"}, {key: "WV", value: "WV", text: "WV"}, {key: "WY", value: "WY", text: "WY"}
           ]
        
        return (
            <div className="doctorSearchForm">
                <Form onSubmit={(e) => this.props.searchHandler(e, this.state)}>
                    <Form.Input className="center aligned column" control={Input} label="city" name="city" value={this.state.name} onChange={e => this.handleCityChange(e)} />
                    <Dropdown placeholder='State' name="state" selection options={stateAbbreviations} onChange={e => this.handleStateChange(e)}/>
                    <Button type="submit" text="Search">Search</Button>
                </Form>  
            </div>
        )
    }
}
