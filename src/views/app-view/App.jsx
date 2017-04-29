import React, { Component, PropTypes  } from 'react';
//import Grid  from 'react-bootstrap/lib/Grid';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';


import '../../bootstrap.css';
import './styles.css';

const history = createHashHistory();

class App extends Component {

  constructor(props) {
    super(props);
    this._appController = props.appController;
    this._appSubject = this._appController.appSubject;
    this.state = {transferTo: '/', counter: 0};

  }

  componentDidMount() {
    this._appController.appReady = true;
    this._appSubject.next({target: "app", type: "state", value: "viewReady"});

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
  }

  transitionClick(e){
    history.location.pathname != e.data.target && history.push(e.data.target);
    e.preventDefault();
  }

  render() {
    return (
      <Router basename="">
        <div>
          <ul className="nav nav-pills nav-stacked" style={{ float: 'left' }}>
            <li><div className="logo"></div></li>
            {
              //this.props.routes.map((route, i) => (<li key={i}><Link to={route.path} >{route.name}</Link></li>))
              this.props.routes.map((route, i) => (<li key={i} onClick={(e) => this.transitionClick(Object.assign(e, {data: {target: route.path}}))}>{route.name}</li>))
            }
          </ul>
          <h1>It is {this.state.counter}.</h1>
          {this.props.routes.map((route, i) => {
            const Component = route.component;
            const cls = route.path == this.state.view ? '' : 'hidden';
            return <Component key={i} isHidden={cls} />
            //<Route key={i} path={route.path} exact={route.exact} component={route.component} />
          })}
        </div>
      </Router>
    );
  }
}

export default App;
