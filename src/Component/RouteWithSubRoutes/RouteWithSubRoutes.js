import React, {useState, useEffect} from 'react';
import {Route,useHistory} from 'react-router-dom';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import NotFound from '../NotFound/NotFound';

export default function RouteWithSubRoutes (props) {
  const [rerender, setRerender] = useState (false);
  const history =useHistory();

  const middlewareResolver = async () => {
    if (props.resolveAll) {
      let promiseArray = [];
      props.middleware.forEach (e => {
        let result = e ();
        promiseArray.push (result);
      });
      Promise.all (promiseArray)
        .then (response => {
          let Component = props.component;
          let routes=props.routes
          setRerender (
            <Route
              path={props.path}
              render={props => {
                return <Component {...props} routes={routes} />;
              }}
            />
          );
        })
        .catch (error => {
          if (props.redirect) history.push(props.redirect)
          else{
            setRerender (
              <Route
                path={props.path}
                render={props => {
                  return <NotFound {...props} routes={props.routes} />;
                }}
              />
            );
          }
        });
    } else {
      let result = [];
      for (let i = 0; i < props.middleware.length; i++) {
        result.push (await props.middleware[i] ());
      }
      let answer = result.every (e => e === true);
      if (answer) {
        let Component = props.component;
        let routes=props.routes
        setRerender (
          <Route
            path={props.path}
            render={props => {
              return <Component {...props} routes={routes} />;
            }}
          />
        );
      } else {
        if (props.redirect) history.push(props.redirect)
          else{
          let routes=props.routes
          setRerender (
            <Route
              path={props.path}
              render={props => {
                return <NotFound {...props} routes={routes} />;
              }}
            />
          );
        }
      }
    }
  }

  useEffect (() => {
    middlewareResolver ();
  },[]);
  
  return rerender ? rerender : <LoadingComponent />;
}
