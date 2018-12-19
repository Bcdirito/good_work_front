import React, { Component } from 'react'
import List from "./List"
import ListTile from "./ListTile"
import {connect} from "react-redux"
import {Button, Form, Grid} from "semantic-ui-react"
import { destroyGoal, selectGoal } from '../store/actions/goalActions'
import {createList, getLists} from "../store/actions/listActions"

class Goal extends Component {
    state = {
        clicked: false,
        formData: {
            title: ""
        },
        featuredList: {}
    }

    componentWillMount = () => {
        const id = Number(this.props.match.params.id)

        if (this.props.lists.length > 0){
            this.props.clearLists()
        } else {
            this.props.selectGoal(id)
            this.props.getLists(id)
        }
    }

    buttonHandler = () => {
        this.setState({ clicked: !this.state.clicked})
        
    }

    deleteHandler = () => {
        this.props.deleteGoal(this.props.featuredGoal)
        this.props.history.replace("/")
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
        this.props.addList(this.state.formData, this.props.featuredGoal)
        this.setState({ clicked: false, formData: { title: "" } })
    }

    resetContainer = () => {
        this.setState({
            clicked: false,
            formData: {
                title: ""
            },
            featuredList: {}
        })
    }

    featureList = (list) => {
        this.setState({ featuredList: list})
    }

    renderForm = () => {
        return <Form onSubmit={e => this.submitHandler(e)}>
                    <Form.Field>
                        <label>List Title</label>
                        <input type="text" name="title" value={this.state.formData.title} placeholder="Enter Title Here" onChange={e => this.changeHandler(e)}/>
                    </Form.Field>
                    <Button type="submit">Create New List</Button>
                </Form>

    }



    render() {
        const goal = this.props.featuredGoal
        const lists = this.props.lists

        const listComps = lists.map(list => {
            if(Number(list.relationships.goal.data.id) === Number(this.props.featuredGoal.id)) {
                return (<div classname="listTiles">
                            <Grid.Column>
                                <ListTile
                                key={list.id}
                                listId={list.id}
                                list={list}
                                featureList={this.featureList}
                                />
                            </Grid.Column>
                        </div>)
                }        
        })
        return (
            <div>
                <h2>{goal.attributes ?  goal.attributes.name : null}</h2>
                    {this.state.featuredList.id ? <List list={this.state.featuredList} resetContainer={this.resetContainer}/>: <div className="listContainer">
                        <Grid>
                            <Grid.Row>
                                {listComps}
                            </Grid.Row>
                        </Grid>
                    </div>}
                <div>{this.state.clicked === true ? this.renderForm() : null}</div>
                {this.state.clicked === false && this.state.featuredList.id === undefined ? <Button onClick={this.buttonHandler}>Add List</Button>: <Button onClick={this.resetContainer}>Go Back</Button>}
                {this.state.clicked === false && this.state.featuredList.id === undefined ? <Button onClick={this.deleteHandler}>Delete Me!</Button> : null}
            </div>
        )
  }
}

const mapStateToProps = state => {
    return {
        featuredGoal: state.featuredGoal,
        lists: state.lists
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteGoal: goal => dispatch(destroyGoal(goal)),
        addList: (list, goal) => dispatch(createList(list, goal)),
        getLists: id => dispatch(getLists(id)),
        clearLists: () => dispatch({type: "CLEAR_LISTS"}),
        selectGoal: id => dispatch(selectGoal(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Goal)
