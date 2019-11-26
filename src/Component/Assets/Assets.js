/* eslint-disable no-undef */
import React, {useState,useEffect} from 'react';
import {Switch,useParams} from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import Axios from 'axios';

export default function Assets(props){
  const parameter=useParams();
  const [render,setRender]=useState(<tr><LoadingComponent/></tr>);
  useEffect(()=>{
    const stackKey=parameter.id;
    const getAssets= async()=>{
      let render=[];
      let result =await Axios.get('/v3/assets',
      {
        headers:{
          "api_key":stackKey
        }
      });
    result.data.assets.forEach((e,i)=>{
      render.push(
        <tr key={i}>
          <td>{e.title}</td>
          <td><img width="200px" height="200px" src={e.url} alt={e.title}/></td>
          <td>{e.updated_at}</td>
      </tr>
      )
    })
    setRender(render)
  }
  getAssets();
  },[])

  return(
    <>
      <div>
        <div className="message-display">Assets goes here</div>
        <br/>
        <table>
          <thead>
            <tr>
              <td>Title</td>
              <td>Image</td>
              <td>Updated at</td>
            </tr>
          </thead>
          <tbody>
            <tr>
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
