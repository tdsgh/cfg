import React, { Component, PropTypes  } from 'react';
//import Grid  from 'react-bootstrap/lib/Grid';
//import Nav from 'react-bootstrap/lib/Nav';
//import Navbar from 'react-bootstrap/lib/Navbar';
//import NavItem  from 'react-bootstrap/lib/NavItem';

import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

//import routesMap from '../routes';

import '../bootstrap.css';
import './styles.css';


class App extends Component {
  render() {
    return (
      <Router basename="">
        <div>
          <ul className="nav nav-pills nav-stacked" style={{ float: 'left' }}>
            <li><div className="logo"></div></li>
            <li className=""><Link to="/configs">Configuration</Link></li>
            <li className=""><Link to="/settings">Settings</Link></li>
          </ul>

          {this.props.routes.map((route, i) => (
            //<RouteWithSubRoutes key={i} {...route} />
            <Route key={i} path={route.path} render={props => (
              <route.component {...props} />
            )} />
          ))}
        </div>
      </Router>
    );
  }
}

export default App;
