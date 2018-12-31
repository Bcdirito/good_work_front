import React, { Component } from 'react'
import { Button } from "semantic-ui-react"
import LoginForm from './LoginForm';
import SignUp from './SignUp'
import { connect } from "react-redux"
import {signUpUser, createSession, logoutUser} from "../store/actions/userActions"
import NavContainer from "../navigation/NavContainer"

class LoginPage extends Component {
    state = {
        clicked: false,
        form: "",
    }


    componentDidMount(){
        this.props.logout()
    }

    buttonHandler = e => {
        if (e.target.name === "login" || e.target.name === "sign up"){
            this.setState({
                clicked: !this.state.clicked,
                form: e.target.name
            })
        } else {
            this.props.history.push("/")
        }
    }

    renderForm = () => {
        if (this.state.form === "login"){
            return (<LoginForm submitHandler={this.submitHandler} resetContainer={this.resetContainer}/>)
        } else if (this.state.form === "sign up"){
            return (<SignUp submitHandler={this.submitHandler} resetContainer={this.resetContainer}/>)
        }
    }

    submitHandler = (e, data) => {
        e.preventDefault()

        this.formHandler(data)

        this.resetContainer()
    }

    formHandler = (data) => {
        if (this.state.form === "login"){
            this.props.login(data)
        } else if (this.state.form === "sign up"){
            this.props.signUp(data)
        }
        this.props.history.replace("/")
    }

    resetContainer = () => {
        this.setState({
            clicked: false,
            form: ""
        })
    }

    render() {
        return (
        <div className="welcome">
            <NavContainer />
            <div id="greeting">
                {this.state.form === "" || this.state.form === "login" ? <h1>Login</h1> : <h1 id="signUpHeader">Sign Up</h1>}
                    {this.state.form === "login" ? <div className="loginForm">{this.renderForm()}</div>: null}
                    {this.state.form === "sign up" ? <div className="signUpForm">{this.renderForm()}</div>: null}
                    {this.state.clicked === false ?<Button name="login" onClick={e => this.buttonHandler(e)} className="loginButton" >Login</Button> : null}
                    {this.state.clicked === false ?<Button name="sign up" onClick={e => this.buttonHandler(e)} className="loginButton" >Sign Up</Button> : null}
                    {this.state.clicked === false ? <Button name="go back" onClick={e => this.buttonHandler(e)} className="loginButton">Go Back</Button> : null}
                </div>
        </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: user => dispatch(createSession(user)),
        signUp: user => dispatch(signUpUser(user)),
        logout: () => dispatch(logoutUser())
    }
}

export default connect(null, mapDispatchToProps)(LoginPage)