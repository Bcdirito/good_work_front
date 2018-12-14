import React, { Component } from 'react'
import {Form, Input, Button} from "semantic-ui-react"


export default class SignUpForm extends Component {
    state = {
        username: "",
        password: "",
        password: ""
    }

    render() {
        return (
        <div>
            <Form onSubmit={e => this.submitHandler(e)}>
                <Form.Input className="center aligned column" control={Input} name="username" label="Username:" placeholder="username" value={this.state.username} onChange={e => this.handleChange(e)} />
                <Form.Input className="center aligned column" control={Input} name="password" label="Password:" placeholder="password" value={this.state.password} onChange={e => this.handleChange(e)} />
                <Form.Input className="center aligned column" control={Input} name="email" label="Email:" placeholder="email" value={this.state.email} onChange={e => this.handleChange(e)} />
                <Button type="submit" className="button" color="green">Sign Up</Button>
            </Form>
        </div>
        )
    }
}
