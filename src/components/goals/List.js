import React, { Component } from 'react'
import {connect} from "react-redux"
import TaskCard from "./TaskCard"

class List extends Component {
    state = {
        clicked: false,
        formData: {
            title: "",
            content: ""
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

    deleteHandler = () => {
        this.props.deleteList(this.props)
    }

    submitHandler = e => {
        e.preventDefault()
        this.props.addTask(this.state.formData)
        this.setState({ formData: { title: "", content:"" }
        })
    }

    renderForm = () => {
        return <form onSubmit={e => this.submitHandler(e)}>
                <label>Task Title</label>
                    <input type="text" name="title" value={this.state.formData.title} placeholder="Task Title" onChange={e => this.changeHandler(e)}/>
                <label>Task Content</label>
                    <input type="text" name="content" value={this.state.formData.content} placeholder="Task Content" onChange={e => this.changeHandler(e)}/>
                <input type="submit"></input>
                </form>
    }

    render() {
        return (
        <div>
            This is a List Component. It will hold all individual TaskCards for that list.
            {this.state.clicked === false ?<button onClick={this.buttonHandler}>Add A Task</button> : null}
            <div>{this.state.clicked === true ? this.renderForm() : null}</div>
            <button onClick={this.deleteHandler}>Delete List</button>
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
