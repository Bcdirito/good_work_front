import React, { Component } from 'react'

class ListTile extends Component {

    render() {
        return (
            <div className="ui card three wide column" >
                <div className="content">
                    {this.props.list.attributes.name}
                </div>
            </div>
        )
    }
}
export default ListTile