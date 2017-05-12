import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

//import './styles.css';

class LoginDialog extends Component {

    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.state = {
            showModal: true //typeof props.showModal != "undefined" ? props.showModal : true
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps){
        if(this.props.obj !== nextProps.obj)
            this.setState({showModal: true});
    }

    close() {
        this.setState({ showModal: false });

        this.props.obj.value.next({action: "close", value: {name: "nNone", pass: "pNone"}});
        this.props.obj.value.complete();
    }

    render() {
        if(this.state.showModal)
                console.log("LoginDialog: show");
        return (
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Login Dialog
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Login</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default LoginDialog;
