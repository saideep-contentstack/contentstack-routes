/* eslint-disable no-undef */
import React, {useState,useEffect} from 'react';
import {Switch,useLocation} from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';

export default function Dashboard(props){
  // const location=useLocation();
  // const [render,setRender]=useState(<tr><LoadingComponent/></tr>);
  useEffect(()=>{
    // const stackKey=location.state.stackKey;
    const getDashboard= async()=>{}
    getDashboard();
  },[])

  return(
    <>
      <div>
        <div className="message-display">Welcome to contentstack dashboard</div>
        <br/>
       {props.routes?
           <Switch>
           {props.routes.map (route => {
                    return <RouteWithSubRoutes key={route.path} {...route} />
                })}
           </Switch>:null}
      </div>
    </>
  )
}
