/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, {Fragment} from 'react';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import {Switch,Link,Redirect,} from 'react-router-dom';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

class GeneralComponent extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      isauth: true,
      render:<LoadingComponent/>,
    };
    this.logoutHandler = this.logoutHandler.bind (this);
  }

  async logoutHandler () {
    let result = await axios.delete ('/user-session');
    console.log (result);
    this.setState ({isauth: false, render: <Redirect to="/login" />});
  }
  render () {
    let Url=window.location.pathname
    let t = this.state.render;
    if (this.state.isauth) {
      let stackId = Url.split ('/')[2];
        return (
          <div>
            <nav>
              <ul>
                <li className="nav">
                  <Link to={`/stack/${stackId}/dashboard`}>Dashboard</Link>
                </li>
                <li className="nav">
                  <Link to={`/stack/${stackId}/content-types`}>Content</Link>
                </li>
                <li className="nav">
                  <Link to={`/stack/${stackId}/assets`}>Assets</Link>
                </li>
                <li className="nav">
                  <Link to={`/stack/${stackId}/publish-queue`}>
                    Publish Queue
                  </Link>
                </li>
                <li className="nav">
                  <Link to={`/stack/${stackId}/releases/list`}>Releases</Link>
                </li>
                <li className="nav" onClick={this.logoutHandler}>
                  <a>Logout</a>
                </li>
              </ul>
            </nav>
            <Switch>
            {this.props.routes.map (route => {
            return <RouteWithSubRoutes key={route.path} {...route} />
            })}
          </Switch>
          </div>
        );
    } else {
      return (
        <Fragment>
          {t}
        </Fragment>
      );
    }
  }
}

export default GeneralComponent;