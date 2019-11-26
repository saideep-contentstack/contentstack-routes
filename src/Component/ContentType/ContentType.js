/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React from 'react';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import {Switch} from 'react-router-dom';

export default function ContentType(props){
  return(
    <>
    {props.routes?
      <Switch>
        {props.routes.map (route => {
          return <RouteWithSubRoutes key={route.path} {...route} />
        })}
      </Switch>:null}
    </>
  )
}
