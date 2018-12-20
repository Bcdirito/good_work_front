import React, { Component } from 'react'
import {connect} from "react-redux"
import {Form, Button} from "semantic-ui-react"
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
        // console.log(this.props)
        return (
            <div>
                <Form onSubmit={e => this.submitHandler(e)}>
                <Form.Field></Form.Field>
                    <label>Task Title</label>
                        <input type="text" name="title" value={this.state.editData.title}
                        onChange={e => this.changeHandler(e)}/>
                <Form.Field>
                    <label>Task Content</label>
                    <input type="text" name="content" value={this.state.editData.content}
                        onChange={e => this.changeHandler(e)}/>
                </Form.Field>
                <Button type="submit" >Update Task</Button>
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
