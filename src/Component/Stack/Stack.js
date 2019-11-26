import React, {useState,useEffect} from 'react';
import {useHistory,Switch} from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import Axios from 'axios';

export default function Stack(props){
  const history =useHistory();
  const [render,setRender]=useState(<LoadingComponent/>);

  useEffect(()=>{
    const stackRendering = async () => {
      try{
        let lsOrgId="";
        let result1=await Axios.get('/user');
        if(result1.status===200){
          lsOrgId=result1.data.user.organizations["0"].uid;
        }
        let result2= await Axios.get('/stacks',
        {
          headers:{
            "organization_uid":lsOrgId
          }
        })
        let objArray=[]
        result2.data.stacks.forEach((e,i)=>{
          let obj={
            stackId:e.api_key,
            stackName:e.name,
          }
          objArray.push(obj);
        })
        let render=[];
        objArray.forEach((e,i)=>{
          let link=`stack/${e.stackId}/dashboard`
          render.push(<li key={i}><a href={link}><div className="stack-block">{e.stackName}</div></a></li>)
        })
        setRender(render);
      }catch{}
    }
    stackRendering();
  },[])
  const logoutHandler= async ()=>{
   await Axios.delete('/user-session');
    history.push("/login");
  }
   return(
     <>
      <nav className="stacks"> <div><a href=" " onClick={logoutHandler}>Logout</a></div></nav>
                  <div className="message-display">Stacks goes here</div>
                <ul className="stacksList">
                {render}
                </ul>
                {props.routes?
           <Switch>
           {props.routes.map (route => {
                    return <RouteWithSubRoutes key={route.path} {...route} />
                })}
           </Switch>:null}
     </>
   )
}
