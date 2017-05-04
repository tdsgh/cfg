import React, { Component } from 'react';

var cnt = 1;

class SettingsPage extends Component {
  constructor(props){
    super(props);
    this._instId = cnt++;
    console.log('SettingsPage constructor: ' + this._instId);
  }

  componentDidMount() {
    console.log('SettingsPage componentDidMount: ' + this._instId);
  }

  render() {
    return (
      <div className={this.props.isHidden ? '' : 'hidden'}>
        Settings View
      </div>
    );
  }
}

export default SettingsPage;