import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class Aleart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    componentWillReceiveProps = (newProps) => {
        if (newProps.isOpen !== this.state.isOpen) {
            this.setState({
                isOpen: newProps.isOpen
            })
        }
    }

    onClose = () => {
        this.setState({ isOpen: false });
    }

    render() {
        const { type, message } = this.props;
        return (

            <Alert
                color={type}
                isOpen={this.state.isOpen}
                toggle={this.onClose} >
                {message}
            </Alert>

        );
    }
}

export default Aleart