import React, { Component } from 'react'
import { connect } from "react-redux"
import { getPartner, createPartner, updatePartner, destroyPartner, messagePartner} from "../store/actions/partnerActions"
import {Form, Input, Button, Card, TextArea} from "semantic-ui-react"
import NavContainer from "../navigation/NavContainer"
class Partner extends Component {

    state = {
        addForm: false,
        editForm: false,
        messageForm: false,
        name: "",
        email: "",
        subject: "",
        message: ""
    }

    componentDidMount(){
        if (this.props.user.id){
            if(this.props.partner === undefined || this.props.partner.id === undefined){
                this.props.getPartner(this.props.user)
            }
        } else {
            this.setState({
                ...this.state,
                name: this.props.partner.name,
                email: this.props.partner.email
            })
        }
    }

    componentDidUpdate(prevProps){
        if(this.props !== prevProps && this.props.partner){
            if (this.props.partner.id === undefined){
                this.props.getPartner(this.props.user)
            }
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = e => {
        e.preventDefault()
        if (this.state.editForm === true){
            this.props.updatePartner(this.state, this.props.partner, this.props.user)
        } else {
            this.props.createPartner(this.state, this.props.user)
        }
        this.clearState()
    }

    clickHandler = e => {
        if (e.target.name === "add partner"){
            this.setState({ ...this.state, addForm: !this.state.addForm })
        } else if (e.target.name === "edit partner") {
            this.setState({
                ...this.state,
                editForm: !this.state.editForm,
                name: this.props.partner.name,
                email: this.props.partner.email
            })
        } else if (e.target.name === "message partner") {
            this.setState({ ...this.state, messageForm: !this.state.messageForm})
        }  
    }

    messageHandler = e => {
        e.preventDefault()
        this.props.messagePartner(this.state.subject, this.state.message, this.props.partner, this.props.user)
        this.clearState()
    }

    deleteHandler = () => {
        this.props.destroyPartner(this.props.partner, this.props.user)
        this.clearState()
    }

    clearState = () => {
        this.setState({
            addForm: false,
            editForm: false,
            messageForm: false,
            name: "",
            email: "",
            subject: "",
            message: ""
        })
    }

    renderCard = () => {
        if (this.props.partner.id !== undefined){
            return (<Card className="partner">
                <Card.Content>
                <Card.Header id="partnerName" textAlign="center">{this.props.partner.name}</Card.Header>
                <Card.Meta textAlign="center">
                    <span>email: <a>{this.props.partner.email}</a></span>
                </Card.Meta>
                <Card.Content textAlign="center">
                    <br></br>
                    <Button name="message partner" className="partnerButton" onClick={this.clickHandler}>Message</Button><Button name="edit partner" className="partnerButton" onClick={this.clickHandler}>Edit</Button>
                </Card.Content>
                </Card.Content>
            </Card>)
          }
    }

    renderForm = () => {
        return (
        <div>
            <Form className="partnerForm" onSubmit={e => this.submitHandler(e)}>
                <Form.Input className="center aligned column" control={Input} label="name" name="name" value={this.state.name} onChange={e => this.handleChange(e)} />
                <Form.Input className="center aligned column" control={Input} label="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />
                <Button type="submit" className="formSubmit">Submit Partner</Button>
                {this.state.editForm === true ? <Button className="partnerDelete" onClick={this.deleteHandler}>Delete Partner</Button> : null}
            </Form>
            <br />
            <Button className="partnerGoBack" onClick={this.clearState}>Go Back</Button>
        </div>
        )
    }

    renderMessageForm = () => {
        return (
            <Form id="partnerMessage"onSubmit={e => this.messageHandler(e)}>
                <Form.Input className="center aligned column" control={Input} label="subject" name="subject" value={this.state.subject} onChange={e => this.handleChange(e)} />
                <Form.Field control={TextArea} label='message' name="message" placeholder='Talk to your partner...' value={this.state.message} onChange={e => this.handleChange(e)} />
                <Button type="submit" id="messageSubmit">Send Message</Button>
                <Button className="messageGoBack" onClick={this.clearState}>Go Back</Button>
            </Form>
        )
    }

    render() {
        return (
        <div className="partners">
            <NavContainer />
                <h2 id="partnerHeading"> Partners </h2>
                {/* {this.state.loading === true ? } */}
                {this.state.addForm === false && this.props.partner === undefined ||this.state.addForm === false && this.props.partner.id === undefined ? <Button name="add partner" className="partnerButton" onClick={e => this.clickHandler(e)}>Add a Partner</Button> : null}
                {this.props.partner !== undefined && this.state.addForm === false && this.state.editForm === false && this.state.messageForm === false ? this.renderCard() : null}
                {this.state.addForm === true || this.state.editForm === true ? this.renderForm() : null}
                {this.state.messageForm === true ? this.renderMessageForm() : null}
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        partner: state.partner
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPartner: user => dispatch(getPartner(user)),
        createPartner: (data, user) => dispatch(createPartner(data, user)),
        updatePartner: (data, partner, user) => dispatch(updatePartner(data, partner, user)),
        destroyPartner: (partner, user) => dispatch(destroyPartner(partner, user)),
        messagePartner: (subject, message, partner, user) => dispatch(messagePartner(subject, message, partner, user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Partner)