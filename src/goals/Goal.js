import React, { Component } from 'react'
import List from "./List"
import ListTile from "./ListTile"
import {connect} from "react-redux"
import {Button, Form, Grid} from "semantic-ui-react"
import { destroyGoal, selectGoal } from '../store/actions/goalActions'
import {createList, getLists} from "../store/actions/listActions"
import NavContainer from "../navigation/NavContainer"

class Goal extends Component {
    state = {
        clicked: false,
        formData: {
            title: ""
        },
        featuredList: {}
    }

    componentDidMount = () => {
        const id = Number(this.props.match.params.id)

        if (this.props.lists.length > 0){
            this.props.clearLists()
        } else if (this.props.lists.length === 0 && this.props.user.id) {
            this.props.selectGoal(id, this.props.user)
            this.props.getLists(id, this.props.user)
        }
    }

    componentDidUpdate(prevProps){
        console.log(prevProps)
        if (this.props !== prevProps && prevProps.user.id === undefined && this.props.lists.length === 0){
            const id = Number(this.props.match.params.id)
            this.props.selectGoal(id, this.props.user)
            this.props.getLists(id, this.props.user)
        }
    }

    buttonHandler = () => {
        this.setState({ clicked: !this.state.clicked})
        
    }

    deleteHandler = () => {
        const result = window.confirm("What is That? Did You Just Complete A Goal?")
        if (result === true){
            alert("This Is Why You Fill Me With Such Wonder!")
            this.props.deleteGoal(this.props.featuredGoal, this.props.user)
            this.props.history.replace("/")
        } else {
            alert("Keep At It! Nothing Can Stop You!")
        }
    }

    changeHandler = e => {
        this.setState({
            formData: {
                [e.target.name]: e.target.value
            }
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.addList(this.state.formData, this.props.featuredGoal, this.props.user)
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

    finishGoal = () => {
        let result = window.confirm("Are You Proving Your Greatness Again by Completing This Goal?")
        if (result === true){
            alert("You Did It! You Deserve All of the High Fives!")
            this.deleteHandler()
        } else {
            alert("Sounds Good! We'll be Here Cheering You On!")
        }
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
                return (<div className="listTiles">
                            <Grid.Column>
                                <ListTile
                                key={list.id}
                                listId={list.id}
                                list={list}
                                featureList={this.featureList}
                                resetContainer={this.resetContainer}
                                />
                            </Grid.Column>
                        </div>)
                }        
        })

        return (
            <div className="goalPage">
                <NavContainer />

                <h2 id="goalHeader">{goal.attributes !== undefined && goal !== undefined ?  goal.attributes.name : null}</h2>
                    {this.state.featuredList.id ? <List list={this.state.featuredList} resetContainer={this.resetContainer}/>: <div className="listContainer">
                        <Grid>
                            <Grid.Row>
                                {listComps}
                            </Grid.Row>
                        </Grid>
                    </div>}
                <div>{this.state.clicked === true ? this.renderForm() : null}</div>
                <br></br>
                {this.state.clicked === false && this.state.featuredList.id === undefined ? <Button className="addList" onClick={this.buttonHandler}>Add List</Button>: null}
                {this.state.clicked === false && this.state.featuredList.id === undefined ? <Button className="finished" onClick={this.deleteHandler}>Finished!</Button> : null}
            </div>
        )
  }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        featuredGoal: state.featuredGoal,
        lists: state.lists
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteGoal: (goal, user) => dispatch(destroyGoal(goal, user)),
        addList: (list, goal, user) => dispatch(createList(list, goal, user)),
        getLists: (id, user) => dispatch(getLists(id, user)),
        clearLists: () => dispatch({type: "CLEAR_LISTS"}),
        selectGoal: (id, user) => dispatch(selectGoal(id, user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Goal)

// barsbars