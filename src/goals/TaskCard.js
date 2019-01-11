import React, { Component } from 'react'
import {connect} from "react-redux"
import {Form, Input, Button, TextArea} from "semantic-ui-react"
import {updateTask} from "../store/actions/taskActions"

class TaskCard extends Component {
    state = {
        editData: {
            title: this.props.task.attributes.title,
            content: this.props.task.attributes.content
        }
    }

    buttonHandler = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    changeHandler = e => {
        this.setState({ editData: {
            ...this.state.editData,
            [e.target.name]: e.target.value
            }
        })
    }

    submitHandler = e => {
        e.preventDefault()
        this.props.updateTask(this.state.editData, Number(this.props.task.id), Number(this.props.listId), this.props.user)
        this.resetComponent()
    }

    resetComponent = () => {
        this.setState({ 
            editData: {
                title: this.props.task.attributes.title, 
                content: this.props.task.attributes.content
            }}, () => this.props.resetComponent())
    }
    
    render() {
        return (
            <div className="taskCard">
                <Form onSubmit={e => this.submitHandler(e)}>
                <Form.Input label="task title" name="title" control={Input} value={this.state.editData.title}
                onChange={e => this.changeHandler(e)} />
                <Form.Field control={TextArea} label="task content" name="content" value={this.state.editData.content}
                onChange={e => this.changeHandler(e)} />
                <Button type="submit" className="updateTask">Update Task</Button>
                <Button onClick={this.resetComponent} className="goBackTask">Never Mind</Button>
            </Form>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToState = dispatch => {
    return {
        updateTask: (data, id, listId, userId) => dispatch(updateTask(data, id, listId, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(TaskCard)
