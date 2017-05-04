import React, { Component } from 'react';

var cnt = 1;

class ConfigsPage extends Component {
  constructor(props){
    super(props);
    
    this._instId = cnt++;
    console.log('ConfigsPage constructor: ' + this._instId);
  }

  componentDidMount() {
    console.log('ConfigsPage componentDidMount: ' + this._instId);
  }

  render() {
    return (
      <div className={this.props.isHidden ? '' : 'hidden'}>
        Configs View
      </div>
    );
  }
}

export default ConfigsPage;