import React, { Component } from 'react'
import {Form, Button, Input} from "semantic-ui-react"
import LoginForm from './LoginForm';
import SignUp from './SignUp'

export default class LoginPage extends Component {
    state = {
        clicked: false,
        form: "",
    }

    buttonHandler = e => {
        this.setState({
            clicked: !this.state.clicked,
            form: e.target.name
        })
    }

    renderForm = () => {
        if (this.state.form === "login"){
            return (<LoginForm />)
        } else if (this.state.form === "sign up"){
            return (<SignUp/>)
        }
    }

    resetContainer = () => {
        this.setState({
            clicked: false,
            form: ""
        })
    }

    render() {
        return (
        <div>
            <div>
                {this.state.clicked === true ? this.renderForm(): null}
            </div> 
                {this.state.clicked === false ?<Button name="login" onClick={e => this.buttonHandler(e)} className="button">Login</Button> : null}
                {this.state.clicked === false ?<Button name="sign up" onClick={e => this.buttonHandler(e)} className="button">Sign Up</Button> : null}
            <div>
                <br></br>
                {this.state.clicked === true ? <Button name="clear" onClick={this.resetContainer} className="button" color="red">Go Back</Button> : null}
            </div>
        </div>
        )
    }
}
