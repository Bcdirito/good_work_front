import React, { Component } from 'react'
import List from "./List"
import {connect} from "react-redux"

class Goal extends Component {
    state = {
        clicked: false,
        formData: {
            title: ""
        }
    }

    buttonHandler = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    deleteHandler = () => {
        this.props.deleteGoal(this.props)
    }

    changeHandler = e => {
        this.setState({
            formData: {
                [e.target.name]: e.target.value
            }
        }, () => console.log(this.state.formData))
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.addList(this.state.formData)
        this.setState({ formData: { title: "" } })
    }

    renderForm = () => {
        return <form onSubmit={e => this.submitHandler(e)}>
                <label>List Title</label>
                    <input type="text" name="title" value={this.state.formData.title} placeholder="List Title" onChange={e => this.changeHandler(e)}/>
                <input type="submit"></input>
                </form>
    }

    render() {
        console.log(this.props)
        //   const allLists = this.props.lists.map{list => {
        //       return (<List
        //                 key={list.id}
        //                 list={list}
        //                 />)
        //   }}
        return (
        <div>
            This will be a Goal Component. It will house the lists belonging to this goal.
            <button onClick={this.deleteHandler}>Delete Me!</button>
            {this.state.clicked === false ? <button onClick={this.buttonHandler}>Add List</button>: null}
            <div>{this.state.clicked === true ? this.renderForm() : null}</div>
            <List />
        </div>
        )
  }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteGoal: goal => dispatch({type: "DELETE_GOAL", goal}),
        addList: list => dispatch({type: "ADD_LIST", list})
    }
}
export default connect(null, mapDispatchToProps)(Goal)
