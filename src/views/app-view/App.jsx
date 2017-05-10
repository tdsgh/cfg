import React, { Component, PropTypes } from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
//import Grid  from 'react-bootstrap/lib/Grid';

import createHashHistory from 'history/createHashHistory';

import AppDialogs from './app-dialogs';


import '../../bootstrap.css';
import './styles.css';

const history = createHashHistory();

class App extends Component {

  constructor(props) {
    super(props);

    this._appController = props.appController;
    this._appSubject = this._appController.appSubject;

    this.aboutClicked = this.aboutClicked.bind(this);

    this.state = {
      counter: 0,
      view: history.location.pathname
    };

  }

  componentDidMount() {
    this._appSubject.filter((e) => (e.target == "app" && e.type == "tick")).subscribe({
      next: (v) => {
        console.log('counter: ' + v.value);
        this.setState({ counter: v.value });
      }
    });
    this._appSubject.filter((e) => (e.target == "app" && e.type == "transition")).subscribe({
      next: (v) => {
        console.log('Start transit to: ' + v.value);
        this.setState({ view: v.value });
      }
    });

    this._appSubject.next({ target: "app", type: "state", value: "viewReady" });
  }

  transitionClick(eKey) {
    history.location.pathname != eKey && history.push(eKey);
  }
  aboutClicked(e) {
    this._appSubject.next({ target: "dialog", type: "about" });
  }

  render() {
    return (
      <div>
        <div style={{ float: 'left' }}>
          <div className={"logo"} onClick={this.aboutClicked}></div>
          <Nav bsStyle="pills" stacked activeKey={this.state.view} onSelect={this.transitionClick}>

            {
              this.props.routes.map((route, i) => (
                <NavItem key={i} eventKey={route.path} >
                  {route.name}
                </NavItem>
              ))
            }
          </Nav>
        </div>
        <h1>It is {this.state.counter}.</h1>
        {this.props.routes.map((route, i) => {
          const Component = route.component;
          return <Component key={i} isHidden={route.path == this.state.view} appSubject={this._appSubject} />
        })}

        <AppDialogs subject={this._appSubject} ></AppDialogs>
      </div>
    );
  }
}

export default App;
