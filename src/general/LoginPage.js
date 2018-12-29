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
        this.setState({
            clicked: !this.state.clicked,
            form: e.target.name
        })
    }

    renderForm = () => {
        if (this.state.form === "login"){
            return (<LoginForm submitHandler={this.submitHandler}/>)
        } else if (this.state.form === "sign up"){
            return (<SignUp submitHandler={this.submitHandler}/>)
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
            <div>
                {this.state.clicked === true ? this.renderForm(): null}
            </div> 
                {this.state.clicked === false ?<Button name="login" onClick={e => this.buttonHandler(e)} className="button" color="blue">Login</Button> : null}
                {this.state.clicked === false ?<Button name="sign up" onClick={e => this.buttonHandler(e)} className="button" color="blue">Sign Up</Button> : null}
            <div>
                <br></br>
                {this.state.clicked === true ? <Button name="clear" onClick={this.resetContainer} className="button"  >Go Back</Button> : null}
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