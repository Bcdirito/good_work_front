import React, { Component } from 'react'
import List from "./List"
import {connect} from "react-redux"
import {Button, Form} from "semantic-ui-react"

class Goal extends Component {
    state = {
        clicked: false,
        formData: {
            title: ""
        }
    }

    buttonHandler = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    deleteHandler = () => {
        this.props.deleteGoal(this.props)
    }

    changeHandler = e => {
        this.setState({
            formData: {
                [e.target.name]: e.target.value
            }
        }, () => console.log(this.state.formData))
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.addList(this.state.formData)
        this.setState({ clicked: false, formData: { title: "" } })
    }

    renderForm = () => {
        return <Form onSubmit={e => this.submitHandler(e)}>
                    <Form.Field>
                        <label>List Title</label>
                        <input type="text" name="title" value={this.state.formData.title} placeholder="Enter Title Here" onChange={e => this.changeHandler(e)}/>
                    </Form.Field>
                    <Button type="submit">Add List</Button>
                </Form>
    }

    render() {
        //   const allLists = this.props.lists.map{list => {
        //       return (<List
        //                 key={list.id}
        //                 list={list}
        //                 />)
        //   }}
        return (
        <div>
            This will be a Goal Component. It will house the lists belonging to this goal.
            <Button onClick={this.deleteHandler}>Delete Me!</Button>
            {this.state.clicked === false ? <Button onClick={this.buttonHandler}>Add List</Button>: null}
            <div>{this.state.clicked === true ? this.renderForm() : null}</div>
            <List />
        </div>
        )
  }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteGoal: goal => dispatch({type: "DELETE_GOAL", goal}),
        addList: list => dispatch({type: "ADD_LIST", list})
    }
}
export default connect(null, mapDispatchToProps)(Goal)
