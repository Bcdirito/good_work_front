import React, { Component } from 'react'
import {connect} from "react-redux"
import TaskCard from "./TaskCard"
import {Form, Button} from "semantic-ui-react"
import {addTask} from "../store/actions/taskActions"

class List extends Component {
    state = {
        clicked: false,
        formData: {
            title: "",
            content: ""
        },
        tasks: [],
        featuredTask: {}
    }

    componentDidMount = () => {
        const id = this.props.list.id
        fetch("http://localhost:3000/api/v1/tasks", {
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.errors){
                alert(res.errors)
            } else {
                res.data.forEach(task => {
                    if(task.relationships.list.data.id
                    === id){
                        this.setState({
                            ...this.state,
                            tasks: [...this.state.tasks, task]
                        })
                    }
                })
            }}
        )
        .catch(console.error)
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
        this.props.addTask(this.state.formData, this.props.list)
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

    renderTasks = () => {
        if (this.state.tasks.length > 0){
            this.state.tasks.forEach(task => {
                return (<li onClick={this.renderTaskCard()}>
                        <h4>task.name</h4>
                </li>)
            })
        }
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

    renderTaskItems = () => {
        if (this.state.tasks.length > 0) {
            return this.state.tasks.map(task => {
                return <li key={task.id}>{task.attributes.title} - {task.attributes.content}</li>
            })
        }
    }

    render() {
        const list = this.props.list
        const allTasks = this.renderTaskItems()
        return (
        <div>
            <h3>{list.attributes.name}</h3>
            <ul>{allTasks}</ul>
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
        addTask: (task, list, goalId) => dispatch(addTask(task, list, goalId)),
        deleteList: list => dispatch({type: "DELETE_LIST", list})
    }
}

export default connect(null, mapDispatchToProps)(List)
