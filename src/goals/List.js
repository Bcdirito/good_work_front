import React, { Component } from 'react'
import {connect} from "react-redux"
import TaskCard from "./TaskCard"
import {Form, Button} from "semantic-ui-react"

class List extends Component {
    state = {
        clicked: false,
        formData: {
            title: "",
            content: ""
        },
        tasks: []
    }

    buttonHandler = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    changeHandler = (e) => {
        this.setState({ formData: {
            ...this.state.formData,
            [e.target.name]: e.target.value
            }
        })
    }

    deleteHandler = () => {
        this.props.deleteList(this.props)
    }

    submitHandler = e => {
        e.preventDefault()
        this.props.addTask(this.state.formData)
        this.resetComponent()
    }

    resetComponent = () => {
        this.setState({
            clicked: !this.state.clicked,
            formData: {
                title: "",
                content: ""
            }
        })
    }

    renderForm = () => {
        return <Form onSubmit={e => this.submitHandler(e)}>
                    <Form.Field>
                        <label>Task Title</label>
                            <input type="text" name="title" value={this.state.formData.title} placeholder="Task Title" onChange={e => this.changeHandler(e)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Task Content</label>
                            <input type="text" name="content" value={this.state.formData.content} placeholder="Task Content" onChange={e => this.changeHandler(e)}/>
                    </Form.Field>
                    <Button type="submit">Create New Task</Button>
                </Form>
    }

    render() {
        const list = this.props.list
        console.log(list)
        return (
        <div>
            <h3>{list.attributes.name}</h3>
            <div>{this.state.clicked === true ? this.renderForm() : null}</div>
                {this.state.clicked === false ?<Button onClick={this.buttonHandler}>Add A Task</Button> : <Button onClick={this.buttonHandler}>Go Back</Button>}
                {this.state.clicked === false ? <Button onClick={this.deleteHandler}>Delete List</Button> : null}
            <TaskCard/>
        </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTask: task => dispatch({type: "ADD_TASK", task}),
        deleteList: list => dispatch({type: "DELETE_LIST", list})
    }
}

export default connect(null, mapDispatchToProps)(List)
