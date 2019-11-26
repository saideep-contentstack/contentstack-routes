/* eslint-disable no-undef */
import React, {useState,useEffect} from 'react';
import {Link, Switch,useParams} from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import Axios from 'axios';

export default function ContentTypes(props){
  const [render,setRender]=useState(<tr><LoadingComponent/></tr>);
  const paramter=useParams();
  useEffect(()=>{
    const stackKey=paramter.id;
    const getAssets= async()=>{
      let render=[];
      let result =await Axios.get('/v3/content_types',
      {
        headers:{
          "api_key":stackKey
        }
      });
    result.data.content_types.forEach((e,i)=>{
      render.push(
        <tr key={i}>
          <td><Link to={{
            pathname:`/stack/${stackKey}/content-type/${e.uid}/en-us/entries`,
            }}>
            {e.title}
            </Link>
          </td>
          <td>{e.description}</td>
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
        <div className="message-display">Content type goes here</div>
        <br/>
        <table>
          <thead>
            <tr>
              <td>Title</td>
              <td>Description</td>
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
