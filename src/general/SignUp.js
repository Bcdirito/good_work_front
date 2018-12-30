import React, { Component } from 'react'
import {Form, Input, Button} from "semantic-ui-react"


export default class SignUpForm extends Component {
    state = {
        username: "",
        name: "",
        password: "",
        email: ""
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <Form onSubmit={e => this.props.submitHandler(e, this.state)}className="signUpForm">
                <Form.Input className="center aligned column" control={Input} name="name" label="Name:" placeholder="name" value={this.state.name} onChange={e => this.handleChange(e)} />

                <Form.Input className="center aligned column" control={Input} name="username" label="Username:" placeholder="username" value={this.state.username} onChange={e => this.handleChange(e)} />

                <Form.Input className="center aligned column" type="password" control={Input} name="password" label="Password:" placeholder="password" value={this.state.password} onChange={e => this.handleChange(e)} />

                <Form.Input className="center aligned column" control={Input} name="email" label="Email:" placeholder="email" value={this.state.email} onChange={e => this.handleChange(e)} />
                
                <Button type="submit" className="formButton">Sign Up</Button>
                <Button onClick={this.props.resetContainer} className="loginButton">Go Back</Button>
            </Form>
        )
    }
}
