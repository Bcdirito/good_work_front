import React, { Component } from 'react'
import {Form, Input, Button} from "semantic-ui-react"

export default class LoginForm extends Component {
    state = {
        username: "",
        password: "",
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
        <div>
            <Form onSubmit={e => this.props.submitHandler(e, this.state)}>
                <Form.Input className="center aligned column" control={Input} name="username" label="Username:" placeholder="username" value={this.state.username} onChange={e => this.handleChange(e)} />
                <Form.Input className="center aligned column" control={Input} name="password" label="Password:" placeholder="password" value={this.state.password} onChange={e => this.handleChange(e)} />
                <Button type="submit" className="button" color="green">Log In</Button>
            </Form>
        </div>
        )
    }
}
