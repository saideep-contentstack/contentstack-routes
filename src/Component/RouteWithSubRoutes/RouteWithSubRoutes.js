import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

class RouteWithSubRoutes extends React.Component {
 state={
   rerender:false
 }
 componentDidMount(){
  if (this.props.middleware) {
    let promiseArray=[];
    this.props.middleware.forEach((e)=>{
      let result=e();
      promiseArray.push(result);
    })
    Promise.all(promiseArray)
    .then((response)=>{
      this.setState ({
        rerender:true,
        render: (
          <Route
            path={this.props.path}
            render={props => {
              return (
                <this.props.component
                  {...props}
                  routes={this.props.routes}
                />
              );
            }}
          />
        ),
      });
    }).catch (error => {
      if (this.props.redirect) {
        this.setState ({
          rerender:true,
          render: <Redirect to={this.props.redirect} />,
        });
      } else {
        this.setState ({
          rerender:true,
          render: (
            <Route
              path={this.props.path}
              render={props => {
                return (
                  <this.props.component
                    {...props}
                    routes={this.props.routes}
                  />
                );
              }}
            />
          ),
        });
      }
    });
}else{
  this.setState ({
    rerender:true,
    render: (
      <Route
        path={this.props.path}
        render={props => {
          return (
            <this.props.component
              {...props}
              routes={this.props.routes}
            />
          );
        }}
      />
    ),
  });
}
 }
  render () {
    let r=<LoadingComponent/>
    return this.state.rerender?this.state.render:r
  }
}
export default RouteWithSubRoutes;
