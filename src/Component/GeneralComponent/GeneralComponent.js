import React from 'react';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import {Switch, Link, useHistory, useParams} from 'react-router-dom';
import Axios from 'axios';

export default function GeneralComponent (props) {
  const parameter = useParams ();
  const history = useHistory ();
  const stackKey = parameter.id;
  const logoutHandler = async () => {
    await Axios.delete ('/user-session');
    history.push ('/login');
  };
  return (
    <div>
      <nav>
        <ul>
          <li className="nav">
            <Link
              to={{
                pathname: `/stack/${stackKey}/dashboard`,
              }}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav">
            <Link
              to={{
                pathname: `/stack/${stackKey}/content-types`,
              }}
            >
              Content
            </Link>
          </li>
          <li className="nav">
            <Link
              to={{
                pathname: `/stack/${stackKey}/assets`,
              }}
            >
              Assets
            </Link>
          </li>
          <li className="nav">
            <Link
              to={{
                pathname: `/stack/${stackKey}/publish-queue`,
              }}
            >
              Publish Queue
            </Link>
          </li>
          <li className="nav">
            <Link
              to={{
                pathname: `/stack/${stackKey}/releases/list`,
              }}
            >
              Releases
            </Link>
          </li>
          <li className="nav" onClick={logoutHandler}>
            <a>Logout</a>
          </li>
        </ul>
      </nav>
      {props.routes
        ? <Switch>
            {props.routes.map (route => {
              return <RouteWithSubRoutes key={route.path} {...route} />;
            })}
          </Switch>
        : null}
    </div>
  );
}
