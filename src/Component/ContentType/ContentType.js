/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, {Fragment} from 'react';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import {Switch,Redirect,} from 'react-router-dom';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

class ContentType extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      isauth: true,
      render: <LoadingComponent/>,
    };
    this.logoutHandler = this.logoutHandler.bind (this);
  }

  async logoutHandler () {
    let result = await axios.delete ('/user-session');
    console.log (result);
    this.setState ({isauth: false, render: <Redirect to="/login" />});
  }
  render () {
      console.log("from content type component",this)
    let t = this.state.render;
    if (this.state.isauth) {
        return (
          <div>
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

export default ContentType;