import React from 'react';
import { IndexRoute, Route }  from 'react-router';
import App from 'App';
import ConfigsPage from 'configs';
import SettingsPage from 'settings';

export default (
  <Route component={App} path='/'>
    <IndexRoute component={ConfigsPage} />
    <Route component={SettingsPage} path='settings' />
  </Route>
);