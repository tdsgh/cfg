import React, { Component, PropTypes  } from 'react';
import Modal  from 'react-bootstrap/lib/Modal';

//import './styles.css';

class App extends Component {

  constructor(props) {
    super(props);


  }

  componentDidMount() {

  }

  close() {
    this.setState({ showModal: false });
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
