import React, { Component } from 'react'
import {connect} from "react-redux"

class List extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteList: list => dispatch({type: "DELETE_LIST", list})
    }
}

export default connect(null, mapDispatchToProps)(List)
