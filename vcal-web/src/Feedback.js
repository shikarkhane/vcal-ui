import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AlertContainer from 'react-alert';

class Feedback extends Component {
    constructor(props){
        super(props);


        this.alertOptions = {
            offset: 14,
            position: 'bottom left',
            theme: 'dark',
            time: 5000,
            transition: 'scale'
        };
    }
    componentDidUpdate(prevProps, prevStates){
        if ( this.props.displayAlert ){
            this.showAlert();
        }
    }
    showAlert(){
        this.msg.show(this.props.message, {
                time: 5000,
                type: 'success',
                icon: <img src="./logo.svg" />
        });
    }
    render() {
        return (
            <AlertContainer key={(new Date()).valueOf()} ref={(a) => this.msg = a} {...this.alertOptions} />
        );
    }
}

export default Feedback;


