//import Nav from 'react-bootstrap/lib/Nav';
console.log("Hello");
console.log("Build");

import React      from 'react';
import ReactDOM   from 'react-dom';
//import App        from 'components/App';
import { browserHistory, Router } from 'react-router';
import routes from './app/routes';

//ReactDOM.render(<App />, document.getElementById('react-view'));
const component = (
<Router history={browserHistory}>
  {routes}
</Router>
);

ReactDOM.render(component, document.getElementById('app'));
