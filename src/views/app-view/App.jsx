import React, { Component, PropTypes  } from 'react';
//import Grid  from 'react-bootstrap/lib/Grid';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Transition from './transition'

import '../../bootstrap.css';
import './styles.css';


class App extends Component {

  constructor(props) {
    super(props);
    this._appController = props.appController;
    this.state = {transferTo: '/'};
  }

  componentDidMount() {
    this._appController.funCb = transfer;
  }

  transfer(path){
    this.setState({transferTo: path});
  }

  render() {
    //if(!this._appController.authenticated)
      console.log('Authenticated: ' + this._appController.authenticated);
    return (
      <Router basename="">
        <div>
          <ul className="nav nav-pills nav-stacked" style={{ float: 'left' }}>
            <li><div className="logo"></div></li>
            <li className=""><Link to="/configs">Configuration</Link></li>
            <li className=""><Link to="/settings">Settings</Link></li>
          </ul>

          {this.props.routes.map((route, i) => (
            <Route key={i} path={route.path} exact={route.exact} component={route.component} />
          ))}
          <Route component={Transition} path={this.state.transferTo}/>
        </div>
      </Router>
    );
  }
}

export default App;
