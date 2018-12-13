import React, { Component } from 'react'
import {connect} from "react-redux"

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
        this.setState({ editData: { title: "", content: "" }})
    }

    deleteHandler = () => {
        this.props.deleteTask(this.props)
    }

    renderForm = () => {
        return <form onSubmit={e => this.submitHandler(e)}>
                <label>Task Title</label>
                    <input type="text" name="title"
                    placeholder={this.props.content} value={this.state.editData.title}
                    onChange={e => this.changeHandler(e)}/>
                <label>Task Content</label>
                <input type="text" name="content"
                    placeholder={this.props.content} value={this.state.editData.content}
                    onChange={e => this.changeHandler(e)}/>
                <input type="submit" />
                </form>
    }
    
    render() {
        return (
        <div>
            This will display the Task Title and Content
        {this.state.clicked === false ? <button onClick={this.buttonHandler}>Edit Task</button> : null}
        <div>{this.state.clicked === true ? this.renderForm() : null}</div>
        <button onClick={this.deleteHandler}>Delete Task</button>
        </div>
        )
    }
}

const mapDispatchToState = dispatch => {
    return {
        deleteTask: task => dispatch({type: "DELETE_TASK", task}),
        updateTask: task => dispatch({type: "UPDATE_TASK", task})
    }
}

export default connect(null, mapDispatchToState)(TaskCard)
