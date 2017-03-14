//import Nav from 'react-bootstrap/lib/Nav';
import React      from 'react';
import ReactDOM   from 'react-dom';
import App        from './app/App';

import routesMap from './routes';

ReactDOM.render(<App routes={routesMap}/>, document.getElementById('app'));

