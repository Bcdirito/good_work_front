import React, { Component } from 'react'
import {connect} from "react-redux"
import TaskCard from "./TaskCard"
import {Form, Button, Table, Loader, Input, TextArea} from "semantic-ui-react"
import {createTask, storeTasks, destroyTask} from "../store/actions/taskActions"

class List extends Component {
    state = {
        clicked: false,
        featuredClick: false,
        formData: {
            title: "",
            content: ""
        },
        featuredTask: {},
        loading: false
    }

    componentDidMount = () => {
        this.props.storeTasks(this.props.list.tasks)
    }

    componentDidUpdate = (prevProps) => {
        if((prevProps.tasks !== undefined && this.props.tasks !== undefined) &&prevProps.tasks.length !== this.props.tasks.length){
            this.setState({...this.state, loading: false})
        }
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

    finishTask = (e) => {
        const id = Number(e.target.dataset.id)
        let result = window.confirm("Did You Finish This Task, You Rock Star?")
        if (result === true) {
            alert("I'm So Proud of You! You Amaze Me!")
            this.props.deleteTask(id)
            this.setState({...this.state, loading: true})
        } else {
            alert("Keep Going! I Know You Can Do It!")
        }
    }

    submitHandler = e => {
        e.preventDefault()
        this.props.addTask(this.state.formData, this.props.list)
        this.resetComponent()
    }

    resetComponent = () => {
        this.setState({
            ...this.state,
            clicked: false,
            formData: {
                title: "",
                content: ""
            },
            featuredClick: false,
            featuredTask: {}
        })
    }

    renderForm = () => {
        return <Form id="newTask" onSubmit={e => this.submitHandler(e)}>
                    <Form.Input label="task title" name="title" control={Input}value={this.state.formData.title} placeholder="Task Title" onChange={e => this.changeHandler(e)} />
                    <Form.Field label="task content" name="content" control={TextArea} value={this.state.formData.content} placeholder="Task Content" onChange={e => this.changeHandler(e)} />
                    <Button type="submit" className="createTask">Create New Task</Button>
                    <Button onClick={this.resetComponent} className="goBackTask">Never Mind</Button>
                </Form>
    }

    featureTaskCard = (e) => {
        this.setState({
            ...this.state,
            featuredClick: !this.state.featuredClick,
            featuredTask: this.props.tasks.find(task => {
                return task.id === Number(e.target.dataset.id)
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
        

        if (tasks !== undefined && tasks.length !== 0) {
           taskComps = tasks.map(task => {
                        return <Table.Body>
                            <Table.Row key={task.id}>
                                <Table.Cell>{task.title}</Table.Cell>
                                <Table.Cell>{task.content}</Table.Cell>
                                <Table.Cell><Button data-id={task.id}
                                className="taskButton" id="finishedTask" onClick={e => this.finishTask(e)}>Finished!</Button><Button data-id={task.id}className="taskButton" id="editTask" onClick={e => this.featureTaskCard(e)}>Edit Task</Button></Table.Cell>
                            </Table.Row>
                        </Table.Body>
                })
        } else {
            taskComps = []
        }

        return (
        <div className="taskTable">
            <h3 id="listHeader">{list.name}</h3>
                {this.state.clicked === false && this.state.featuredClick === false && this.state.loading === false && (taskComps !== undefined && taskComps.length !== 0) ? <div><div className="table">
                    <Table celled>
                        <Table.Header id="tHeader">
                            <Table.Row>
                                <Table.HeaderCell id="taskTitle">Task</Table.HeaderCell>
                                <Table.HeaderCell id="taskContent">Content</Table.HeaderCell>
                                <Table.HeaderCell id="taskStatus">Status</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        {taskComps}
                    </Table>
                 </div>
                 </div> : null}
                <div className="underTaskButton">
                    {this.state.clicked === false && this.state.featuredClick === false && this.state.loading === false ?<Button id="addTask"  onClick={this.buttonHandler}>Add A Task</Button> : null}
                    {this.state.clicked === false && this.state.featuredClick === false && this.state.loading === false ? <Button id="backToGoal"  onClick={this.props.resetContainer}>Back to Goal</Button> : null}
                    {(taskComps !== undefined && taskComps.length === 0) && (this.state.clicked === false && this.state.loading === false) ? <Button id="finishedList"  onClick={this.props.finishList}>Finished!</Button>: null}
                </div>
                {this.state.clicked === true ? this.renderForm() : null}
                {this.state.featuredTask.id ? this.renderTaskCard() : null}
                {this.state.loading === true ? <Loader active inline='centered' size="large" /> : null}
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        tasks: state.tasks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTask: (task, list) => dispatch(createTask(task, list)),
        storeTasks: tasks => dispatch(storeTasks(tasks)),
        deleteTask: (task) => dispatch(destroyTask(task))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)