import React, { Component } from 'react'
import {connect} from "react-redux"
import TaskCard from "./TaskCard"
import {Form, Button} from "semantic-ui-react"
import {createTask, getTasks} from "../store/actions/taskActions"

class List extends Component {
    state = {
        clicked: false,
        featuredClick: false,
        formData: {
            title: "",
            content: ""
        },
        featuredTask: {}
    }

    componentDidMount = () => {
        this.props.getTasks(this.props.list)
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

    featureTaskCard = (task) => {
        this.setState({
            ...this.state,
            featuredClick: !this.state.featuredClick,
            featuredTask: task
        })
    }

    renderTaskCard = (task) => {
        if (this.state.featuredClick === true){
            return <TaskCard task={this.state.featuredTask}/>
        }
    }

    render() {
        const list = this.props.list
        const tasks = this.props.tasks
        console.log(this.props.tasks)
        return (
        <div>
            <h3>{list.attributes.name}</h3>
            {/* <ul>{allTasks}</ul> */}
            <div>{this.state.clicked === true ? this.renderForm() : null}</div>
                {this.state.clicked === false ?<Button onClick={this.buttonHandler}>Add A Task</Button> : <Button onClick={this.buttonHandler}>Go Back</Button>}
                {this.state.clicked === false ? <Button onClick={this.deleteHandler}>Delete List</Button> : null}
                {this.renderTaskCard()}
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTask: (task, list, goalId) => dispatch(createTask(task, list)),
        deleteList: list => dispatch({type: "DELETE_LIST", list}),
        getTasks: list => dispatch(getTasks(list))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
