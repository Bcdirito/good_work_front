import React, { Component } from 'react'
import { Button } from "semantic-ui-react"

export default class Profile extends Component {
    clickHandler = (e) => {
        this.props.history.push(`/${e.target.name}`)
    }

    render() {
        return (
        <div>
            <Button name="goals" onClick={e => this.clickHandler(e)}>Goals</Button>
            <Button name="partners" onClick={e => this.clickHandler(e)}>Partners</Button>
            <Button name="doctors" onClick={e => this.clickHandler(e)}>Doctors</Button>
        </div>
        )
    }
}
