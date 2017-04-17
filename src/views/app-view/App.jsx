import React, { Component, PropTypes  } from 'react';
//import Grid  from 'react-bootstrap/lib/Grid';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';


import '../../bootstrap.css';
import './styles.css';


class App extends Component {

  constructor(props) {
    super(props);
    this._appController = props.appController;
    this._appSubject = this._appController.appSubject;
    this.state = {transferTo: '/', counter: 0};

  }

  componentDidMount() {
    this._appController.appReady = true;

    this._appSubject.subscribe({
      next: (v) => {
        console.log('counter: ' + v);
        this.setState({
          counter: v
        });
      }
    });
  }

  render() {
    return (
      <Router basename="">
        <div>
          <ul className="nav nav-pills nav-stacked" style={{ float: 'left' }}>
            <li><div className="logo"></div></li>
            <li className=""><Link to="/configs">Configuration</Link></li>
            <li className=""><Link to="/settings">Settings</Link></li>
          </ul>
          <h2>It is {this.state.counter}.</h2>

          {this.props.routes.map((route, i) => (
            <Route key={i} path={route.path} exact={route.exact} component={route.component} />
          ))}
        </div>
      </Router>
    );
  }
}

export default App;
