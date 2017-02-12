import React, { Component } from 'react';

class Feedback extends Component {
    render() {
        return (
            <div className={this.props.classes} role="alert">
            {this.props.message}
            </div>
        );
    }
}

export default Feedback;


