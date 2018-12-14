import React, { Component } from 'react'
import {Form, Input, Button} from "semantic-ui-react"

export default class LoginForm extends Component {
    state = {
        username: "",
        password: "",
    }

    render() {
        return (
        <div>
            <Form onSubmit={e => this.submitHandler(e)}>
                <Form.Input className="center aligned column" control={Input} name="username" label="Username:" placeholder="username" value={this.state.username} onChange={e => this.handleChange(e)} />
                <Form.Input className="center aligned column" control={Input} name="password" label="Password:" placeholder="username" value={this.state.password} onChange={e => this.handleChange(e)} />
                <Button type="submit" className="button" color="green">Log In</Button>
            </Form>
        </div>
        )
    }
}
