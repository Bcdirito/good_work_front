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



    render() {
        const goal = this.props.goal
        const lists = this.props.lists
        const listComps = lists.map(list => {
            if(Number(list.relationships.goal.data.id) === Number(this.props.goal.id)) {
                return (<List
                    key={list.id}
                    goalId={this.props.goal.id}
                    list={list}
                    />)
                }        
        })
        
        return (
            <div>
                <h2>{goal.name}</h2>
                <div>{this.state.clicked === true ? this.renderForm() : null}</div>
                {this.state.clicked === false ? <Button onClick={this.buttonHandler}>Add List</Button>: <Button onClick={this.resetContainer}>Go Back</Button>}
                {this.state.clicked === false ? <Button onClick={this.deleteHandler}>Delete Me!</Button> : null}
                {listComps}
            </div>
        )
  }
}

const mapStateToProps = state => {
    return {
        lists: state.lists
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteGoal: goal => dispatch(destroyGoal(goal)),
        addList: (list, user) => dispatch(createList(list, user)),
        getLists: goal => dispatch(getLists(goal))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Goal)
