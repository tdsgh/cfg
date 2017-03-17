//import Nav from 'react-bootstrap/lib/Nav';
import React      from 'react';
import ReactDOM   from 'react-dom';
import App        from './views/app-view';
import AppController from './app-controller';

import routesMap from './routes';

const rt = '/settings'
ReactDOM.render(<App routes={routesMap} appController={AppController}/>, document.getElementById('app'));

