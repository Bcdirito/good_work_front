import React, { Component } from 'react'
import {connect} from "react-redux"
import {Form, Button} from "semantic-ui-react"
import {destroyTask} from "../store/actions/taskActions"

class TaskCard extends Component {
    state = {
        clicked: false,
        editData: {
            title: "",
            content: ""
        }
    }

    buttonHandler = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    changeHandler = e => {
        this.setState({ editData: {
            ...this.state.editData,
            [e.target.name]: e.target.value
        }})
    }

    submitHandler = e => {
        e.preventDefault()
        this.props.updateTask(this.state.editData)
        this.resetComponent()
    }

    resetComponent = () => {
        this.setState({ 
            clicked: false,
            editData: { title: "", content: "" }})
    }

    deleteHandler = () => {
        this.props.deleteTask(this.props)
    }

    renderForm = () => {
        return <Form onSubmit={e => this.submitHandler(e)}>
                    <Form.Field></Form.Field>
                        <label>Task Title</label>
                            <input type="text" name="title"
                            placeholder={this.props.content} value={this.state.editData.title}
                            onChange={e => this.changeHandler(e)}/>
                    <Form.Field>
                        <label>Task Content</label>
                        <input type="text" name="content"
                            placeholder={this.props.content} value={this.state.editData.content}
                            onChange={e => this.changeHandler(e)}/>
                    </Form.Field>
                    <Button type="submit" >Update Task</Button>
                </Form>
    }
    
    render() {
        let task = this.props.task
        console.log(task)
        return (
        <div>
            <h3>{task.attributes.title}</h3>
            <h4>{task.attributes.content}</h4>
            <div>{this.state.clicked === true ? this.renderForm() : null}</div>
                {this.state.clicked === false ? <Button onClick={this.buttonHandler}>Edit Task</Button> : <Button onClick={this.buttonHandler}>Go Back</Button>}
                {this.state.clicked === true ?<Button onClick={this.deleteHandler}>Delete Task</Button> : null}
        </div>
        )
    }
}

const mapDispatchToState = dispatch => {
    return {
        deleteTask: task => dispatch(destroyTask(task)),
        updateTask: task => dispatch({type: "UPDATE_TASK", task})
    }
}

export default connect(null, mapDispatchToState)(TaskCard)
