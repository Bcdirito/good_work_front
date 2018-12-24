import React, { Component } from 'react'
import { connect } from "react-redux"
import { getPartner, createPartner, updatePartner, destroyPartner} from "../store/actions/partnerActions"
import {Form, Input, Button, Card, Image} from "semantic-ui-react"

class Partner extends Component {

    state = {
        addForm: false,
        editForm: false,
        name: "",
        email: ""
    }

    componentDidMount(){
        if (this.props.partner.id === undefined){
            this.props.getPartner(this.props.user)
        } else {
            this.setState({
                ...this.state,
                name: this.props.partner.name,
                email: this.props.partner.email
            })
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

    clickHandler = () => {
        console.log("Clicked!")
        this.setState({
            ...this.state,
            addForm: !this.state.addForm
        }, () => console.log(this.state))
    }

    clickEditHandler = () => {
        this.setState({
            ...this.state,
            editForm: !this.state.editForm,
            name: this.props.partner.name,
            email: this.props.partner.email
        })
    }

    deleteHandler = () => {
        this.props.destroyPartner(this.props.partner, this.props.user)
        this.clearState()
    }

    clearState = () => {
        this.setState({
            addForm: false,
            editForm: false,
            name: "",
            email: ""
        })
    }

    renderCards = () => {
        return (<Card>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
            <Card.Content>
              <Card.Header textAlign="center">{this.props.partner.name}</Card.Header>
              <Card.Meta textAlign="center">
                <span>email: <a>{this.props.partner.email}</a></span>
              </Card.Meta>
              <Card.Content textAlign="center">
                <Button>Message</Button><Button onClick={this.clickEditHandler}>Edit Partner</Button>
              </Card.Content>
            </Card.Content>
         
          </Card>)
    }

    renderForm = () => {
        return (
        <div>
            <Form onSubmit={e => this.submitHandler(e)}>
            <Form.Input className="center aligned column" control={Input} label="name" name="name" value={this.state.name} onChange={e => this.handleChange(e)} />
            <Form.Input className="center aligned column" control={Input} label="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />
            <Button type="submit" className="button">Submit Partner</Button>
            </Form>
        </div>
        )
    }

    render() {
        return (
        <div>
            <h1> Partners </h1>
            {this.state.addForm === false && this.props.partner.id === undefined? <Button onClick={this.clickHandler}>Add a Partner</Button> : null}
            {this.props.partner.id ? this.renderCards() : null}
            {this.state.addForm === true || this.state.editForm === true ? this.renderForm() : null}
            {this.state.addForm === true ? <Button onClick={this.clearState}>Go Back</Button> : null}
            <br></br>
            {this.state.editForm === true ? <Button onClick={this.deleteHandler}>Delete Partner</Button> : null}
            
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
        destroyPartner: (partner, user) => dispatch(destroyPartner(partner, user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Partner)