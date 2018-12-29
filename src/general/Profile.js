import React, { Component } from 'react'
import { Button } from "semantic-ui-react"

export default class Profile extends Component {
    clickHandler = (e) => {
        this.props.history.push(`/${e.target.name}`)
    }

    render() {
        return (
        <div>
            <Button className="profileButtons" name="goals" onClick={e => this.clickHandler(e)}>Goals</Button>
            <Button className="profileButtons" name="partners" onClick={e => this.clickHandler(e)}>Partners</Button>
            <Button className="profileButtons" name="doctors" onClick={e => this.clickHandler(e)}>Doctors</Button>
        </div>
        )
    }
}
