import React, {useState,useEffect} from 'react';
import {Switch,useParams} from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import Axios from 'axios';

export default function PublishQueue(props){
    const parameter=useParams();
  const [render,setRender]=useState(<tr><LoadingComponent/></tr>);
  useEffect(()=>{
    const stackKey=parameter.id;
    const getPublishQueue= async()=>{
      let render=[];
      let result =await Axios.get('/v3/publish-queue',
      {
        headers:{
          "api_key":stackKey
        }
      });
    result.data.queue.forEach((e,i)=>{
        render.push(<tr key={i}>
            <td>{e.updated_at}</td>
            <td>{e.entry.title}</td>
            <td>{e.entry.version}</td>
            <td>{e.environment[0]}</td>
        </tr>)
    })
    setRender(render)
  }
  getPublishQueue();
  },[])

  return(
    <>
      <div>
        <div className="message-display">Publish queue goes here</div>
        <br/>
        <table>
                   <thead>
                       <tr>
                        <td>Time</td>
                        <td>Entry</td>
                        <td>Version</td>
                        <td>Environemt</td>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                       </tr>
                   {render}
                   </tbody>
                   <tfoot></tfoot>
               </table>
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
