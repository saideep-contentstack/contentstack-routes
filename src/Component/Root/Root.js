import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import routes from '../Routes';

export default class Root extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            {routes.map (route => (
              <RouteWithSubRoutes key={route.path} {...route} />
            ))}
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}
