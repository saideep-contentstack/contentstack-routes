import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import routes from '../../Routes/Routes';

export default function Root(){
  return(
    <>
    <Router>
      <Switch>
        {routes.map(route=>(
          <RouteWithSubRoutes key={route.path} {...route}/>
        ))}
      </Switch>
    </Router>
    </>
  )
}
