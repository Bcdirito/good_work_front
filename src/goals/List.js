import React, { Component } from 'react'
import {connect} from "react-redux"
import TaskCard from "./TaskCard"
import {Form, Button, Table} from "semantic-ui-react"
import {createTask, getTasks, destroyTask} from "../store/actions/taskActions"
import {destroyList} from "../store/actions/listActions"

class List extends Component {
    state = {
        clicked: false,
        featuredClick: false,
        formData: {
            title: "",
            content: ""
        },
        tasks: [],
        featuredTask: {}
    }

    componentDidMount = () => {

        if (this.props.tasks === undefined || this.props.tasks.length === 0){
            this.props.getTasks(this.props.list)
        }

        this.setState({
            ...this.state,
            tasks: [...this.props.tasks].filter(task => {
                return this.props.list.id === Number(task.relationships.list.data.id)
            })
        })
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
        this.props.resetContainer()
    }

    finishTask = (e) => {
        console.log(e.target)
        const id = Number(e.target.parentElement.parentElement.id)
        let result = window.confirm("Did You Finish This Task, You Rock Star?")
        if (result === true) {
            alert("I'm So Proud of You! You Amaze Me!")
            this.props.deleteTask(id)
        } else {
            alert("Keep Going! I Know You Can Do It!")
        }
    }

    submitHandler = e => {
        e.preventDefault()
        this.props.addTask(this.state.formData, this.props.list)
        this.props.resetComponent()
    }

    resetComponent = () => {
        this.setState({
            clicked: !this.state.clicked,
            formData: {
                title: "",
                content: ""
            },
            featuredClick: false,
            featuredTask: {}
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

    featureTaskCard = (e) => {
        this.setState({
            ...this.state,
            featuredClick: !this.state.featuredClick,
            featuredTask: this.props.tasks.find(task => {
                return task.id === e.target.parentElement.parentElement.id
            })
        })
    }

    renderTaskCard = () => {
        return <TaskCard task={this.state.featuredTask} resetComponent={this.resetComponent} listId={this.props.list.id}/>
    }
    

    render() {
        const list = this.props.list
        let tasks; 
        let taskComps; 

        if (this.props.tasks !== undefined){
            tasks = this.props.tasks
        }
        
        if (tasks !== undefined) {
            taskComps = tasks.map(task => {
                if(Number(task.relationships.list.data.id) === Number(this.props.list.id)) {
                    return (
                        <Table.Row key={task.id} id={task.id}>
                            <Table.Cell>{task.attributes.title}</Table.Cell>
                            <Table.Cell>{task.attributes.content}</Table.Cell>
                            <Table.Cell><Button onClick={e => this.featureTaskCard(e)}>Edit Task</Button><Button color="green" className="finished" onClick={e => this.finishTask(e)}> Finished! </Button></Table.Cell>
                        </Table.Row>)
                }
            })
        }
        
        return (
        <div>
            <h3>{list.attributes.name}</h3>
            <Table celled>
                <Table.Header className="tableHeader">
                    <Table.Row>
                        <Table.HeaderCell>Task</Table.HeaderCell>
                        <Table.HeaderCell>Content</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {taskComps}
            </Table>
            
            <div>{this.state.clicked === true ? this.renderForm() : null}</div>
                {this.state.clicked === false ?<Button onClick={this.buttonHandler}>Add A Task</Button> : <Button onClick={this.buttonHandler}>Go Back</Button>}
                {taskComps[0] === undefined ? <Button onClick={this.deleteHandler}>Delete List</Button> : null}
                {this.state.featuredTask.id ? this.renderTaskCard() : null}
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
        addTask: (task, list) => dispatch(createTask(task, list)),
        deleteList: list => dispatch(destroyList(list)),
        getTasks: list => dispatch(getTasks(list)),
        deleteTask: task => dispatch(destroyTask(task))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
