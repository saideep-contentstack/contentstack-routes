import React, {useState,useEffect} from 'react';
import {Switch,useParams} from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import Axios from 'axios';

export default function Releases(props){
    const parameter=useParams();
  const [render,setRender]=useState(<tr><LoadingComponent/></tr>);
  useEffect(()=>{
    const stackKey=parameter.id;
    const getReleases= async()=>{
      let render=[];
      let result =await Axios.get('/v3/releases',
      {
        headers:{
          "api_key":stackKey
        }
      });
    result.data.releases.forEach((e,i)=>{
        // render.push(<tr key={i}></tr>)
    })
    setRender(render)
  }
  getReleases();
  },[])

  return(
    <>
      <div>
        <div className="message-display">Rleases goes here</div>
        <br/>
        <table>
                   <thead>
                       <tr>
                        <td>Name</td>
                        <td>Version</td>
                        <td>Language</td>
                        <td>Action</td>
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
