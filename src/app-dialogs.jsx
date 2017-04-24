import React, { Component, PropTypes  } from 'react';
//import Grid  from 'react-bootstrap/lib/Grid';


//import './styles.css';


class AppDialogs extends Component {

  constructor(props) {
    super(props);
    this._subject = props.subject;

  }

  componentDidMount() {
    /*this._appSubject.next({target: "app", type: "state", value: "viewReady"});

    this._appSubject.subscribe({
      next: (v) => {
        if(v.target == "app"){
          console.log('counter: ' + v.tick);
          this.setState({ counter: v.tick });
        }
      }
    });*/
  }

  render() {
    return (
        <div>
        </div>
    );
  }
}

export default AppDialogs;
