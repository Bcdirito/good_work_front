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
            this.props.getTasks(this.props.list, this.props.user)
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


    finishList = () => {
        let result = window.confirm("Did You Accomplish Everything to Do on This List?")
        if (result === true){
            alert("Another One Down, Another Win for You!")
            this.props.deleteList(this.props, this.props.user)
            this.props.resetContainer()
        } else {
            alert("No Worries! We'll be Here When You Finish!")
        }
    }

    finishTask = (e) => {
        console.log(e.target)
        const id = Number(e.target.parentElement.parentElement.id)
        let result = window.confirm("Did You Finish This Task, You Rock Star?")
        if (result === true) {
            alert("I'm So Proud of You! You Amaze Me!")
            this.props.deleteTask(id, this.props.user)
        } else {
            alert("Keep Going! I Know You Can Do It!")
        }
    }

    submitHandler = e => {
        e.preventDefault()
        this.props.addTask(this.state.formData, this.props.list, this.props.user)
        this.resetComponent()
    }

    resetComponent = () => {
        this.setState({
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
                        <Table.Body>
                            <Table.Row key={task.id} id={task.id}>
                                <Table.Cell>{task.attributes.title}</Table.Cell>
                                <Table.Cell>{task.attributes.content}</Table.Cell>
                                <Table.Cell><Button className="taskButton" id="finishedTask" onClick={e => this.finishTask(e)}>Finished !</Button><Button className="taskButton" id="editTask" onClick={e => this.featureTaskCard(e)}>Edit Task</Button></Table.Cell>
                            </Table.Row>
                        </Table.Body>)
                }
            })
        }
        
        return (
        <div className="taskTable">
            <h3 id="listHeader">{list.attributes.name}</h3>
                {this.state.clicked === false && this.state.featuredClick === false ? <div><div className="table">
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

                {this.state.clicked === false ?<Button id="addTask" onClick={this.buttonHandler}>Add A Task</Button> : null}
                {taskComps[0] === undefined ? <Button id="finishedList" onClick={this.finishList}>Finished !</Button>: null}
                <Button id="backToGoal" onClick={this.props.resetContainer}>Back to Goal</Button></div> : null}
            
                {this.state.clicked === true ? this.renderForm() : null}
                {this.state.featuredTask.id ? this.renderTaskCard() : null}
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTask: (task, list, user) => dispatch(createTask(task, list, user)),
        deleteList: (list, user) => dispatch(destroyList(list, user)),
        getTasks: (list, user) => dispatch(getTasks(list, user)),
        deleteTask: (task, user) => dispatch(destroyTask(task, user))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
