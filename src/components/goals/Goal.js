import React, { Component } from 'react'

class Goal extends Component {

    deleteHandler = () => {
        this.props.deleteGoal(this.props)
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
        This will be a Goal Container
        <button onClick={this.deleteHandler}>Delete Me!</button>
      </div>
    )
  }
}

export default Goal
