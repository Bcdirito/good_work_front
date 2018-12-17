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
        let goal = this.props.goal
        const allLists = this.props.lists.map(list => {
              return (<List
                        key={list.id}
                        list={list}
                        />)
          })
        return (
        <div>
            <h3>{goal.attributes.name}</h3>
            <div>{this.state.clicked === true ? this.renderForm() : null}</div>
            {this.state.clicked === false ? <Button onClick={this.buttonHandler}>Add List</Button>: <Button onClick={this.resetContainer}>Go Back</Button>}
            {this.state.clicked === false ? <Button onClick={this.deleteHandler}>Delete Me!</Button> : null}
            {allLists}
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
