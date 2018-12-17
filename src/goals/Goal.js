import React, { Component } from 'react'
import List from "./List"
import {connect} from "react-redux"
import {Button, Form} from "semantic-ui-react"
import { destroyGoal } from '../store/actions/goalActions'
import {createList, getLists} from "../store/actions/listActions"

class Goal extends Component {
    state = {
        clicked: false,
        formData: {
            title: ""
        },
        lists: []
    }

    componentDidMount = () => {
        this.props.getLists(this.props.goal)
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
        this.props.addList(this.state.formData, this.props.goal)
        this.setState({ clicked: false, formData: { title: "" } })
    }

    resetContainer = () => {
        this.setState({
            clicked: false,
            formData: {
                title: ""
            }
        })
    }

    renderForm = () => {
        return <Form onSubmit={e => this.submitHandler(e)}>
                    <Form.Field>
                        <label>List Title</label>
                        <input type="text" name="title" value={this.state.formData.title} placeholder="Enter Title Here" onChange={e => this.changeHandler(e)}/>
                    </Form.Field>
                    <Button type="submit">Create New List</Button>
                </Form>

    }

    createListComps = () => {
        if (this.props.lists.length > 0){
            return this.props.lists.map(list => {
                return (<List
                          key={list.id}
                          list={list}
                          />)
            })
        }
    }

    render() {
        const goal = this.props.goal
        const allLists = this.createListComps()
        return (
            <div>
                <h3>{goal.name}</h3>
                <div>{this.state.clicked === true ? this.renderForm() : null}</div>
                {this.state.clicked === false ? <Button onClick={this.buttonHandler}>Add List</Button>: <Button onClick={this.resetContainer}>Go Back</Button>}
                {this.state.clicked === false ? <Button onClick={this.deleteHandler}>Delete Me!</Button> : null}
                {allLists}
            </div>
        )
  }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        lists: state.lists
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteGoal: goal => dispatch(destroyGoal(goal)),
        addList: (list, user) => dispatch(createList(list, user)),
        getLists: user => dispatch(getLists(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Goal)
