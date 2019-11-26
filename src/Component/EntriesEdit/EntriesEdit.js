/* eslint-disable no-undef */
import React from 'react';
import {Switch} from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';

export default function EntriesEdit (props) {
  return (
    <React.Fragment>
      <div className="message-display">Entry edits goes here...</div>
      <br />
      {props.routes
        ? <Switch>
            {props.routes.map (route => {
              return <RouteWithSubRoutes key={route.path} {...route} />;
            })}
          </Switch>
        : null}
    </React.Fragment>
  );
}
