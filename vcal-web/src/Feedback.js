import React, { Component } from 'react';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

class Feedback extends Component {
    constructor(props){
        super(props);


        this.alertOptions = {
            // you can also just use 'bottom center'
            position: positions.BOTTOM_CENTER,
            timeout: 5000,
            offset: '30px',
            // you can also just use 'scale'
            transition: transitions.SCALE
        }
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
            // <AlertContainer key={(new Date()).valueOf()} ref={(a) => this.msg = a} {...this.alertOptions} />
        <AlertProvider template={AlertTemplate} {...this.alertOptions}>
            </AlertProvider>
        );
    }
}

export default Feedback;


