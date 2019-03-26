import React, { Component } from 'react'

class ListTile extends Component {

    handleClick = () => {
        console.log(this.props.list)
        debugger
        this.props.featureList(this.props.list)
    }

    render() {
        return (
            <div className="ui card three wide column" onClick={this.handleClick}>
                <div className="content" id="listTile">
                    {this.props.list.name}
                </div>
            </div>
        )
    }
}
export default ListTile