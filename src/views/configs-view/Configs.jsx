import React, { Component } from 'react';

var cnt = 1;

class ConfigsPage extends Component {
  constructor(props){
    super(props);

    this._appSubject = props.appSubject;
    this._instId = cnt++;

    this.state = {
      counter: 0
    };

    console.log('ConfigsPage constructor: ' + this._instId);
  }

  componentDidMount() {
    console.log('ConfigsPage componentDidMount: ' + this._instId);

    this._appSubject.filter((e) => (e.target == "app" && e.type == "tick")).subscribe({
      next: (v) => {
        this.setState({ counter: v.value });
      }
    });
  }

  render() {
    return (
      <div className={this.props.isHidden ? '' : 'hidden'}>
        Configs View
        <h2>Instance id: {this._instId}, counter: {this.state.counter}.</h2>
      </div>
    );
  }
}

export default ConfigsPage;