import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

//import './styles.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.state = {
            showModal: typeof props.showModal != "undefined" ? props.showModal : true
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps){
        if(this.state.showModal != nextProps.showModal)
            this.setState({showModal: nextProps.showModal});
    }

    close() {
        this.setState({ showModal: false });

        this.props.subj.next({action: "close", value: {name: "nNone", pass: "pNone"}});
    }

    render() {
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

export default App;
