import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

//import './styles.css';

class AboutDialog extends Component {

    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.state = {
            showModal: true
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
    }

    render() {
        if(this.state.showModal)
                console.log("AboutDialog: show");
        return (
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>About</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    About Dialog
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Ok</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AboutDialog;
