/* eslint-disable no-undef */
import React, {useState,useEffect} from 'react';
import {Link,Switch,useParams,useHistory} from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import Axios from 'axios';

export default function Entries(props){
  const [render,setRender]=useState(<LoadingComponent/>);
  const history=useHistory();
  const parameter=useParams();
  useEffect(()=>{
    const getEntries=async()=>{
      let stackKey=props.location.pathname.split('/')[2];
      let contentType=parameter.id;
      let render=[];
      try{
      let result_contentTypes=await Axios.get('/v3/content_types',
      {
        headers:{
          api_key:stackKey
        }
      });
      let result_entries=await Axios.get(`/v3/content_types/${contentType}/entries`,
      {
        headers:{
          api_key:stackKey
        }
      });
      result_contentTypes.data.content_types.forEach((e,i)=>{
        if(e.options.singleton && (e.uid===contentType)){
          if(result_entries){
            if(result_entries.data.entries.length===0){
              history.replace(`/stack/${stackKey}/content-type/${contentType}/en-us/entry/create`)
            }else{
              let entryUid=result_entries.data.entries["0"].uid
              history.replace(`/stack/${stackKey}/content-type/${contentType}/en-us/entry/${entryUid}/edit`)
            }
          }
        }
      });
      if(result_entries){
        result_entries.data.entries.forEach((e,i)=>{
          render.push(
            <tr key={i}>
              <td><Link to={`/stack/${stackKey}/content-type/${contentType}/en-us/entry/${e.uid}/edit`}>{e.title}</Link></td>
              <td>{e.description}</td>
              <td>{e.updated_at}</td>
            </tr>
          )
        })
      }
      setRender(render);
    }catch{}
    }
    getEntries();
  },[])
  
  return(
    <div>
    <div className="message-display">Entries</div>
    <br />
    <table>
        <thead>
            <tr>
             <td>Title</td>
             <td>Description</td>
             <td>Updated at</td>
            </tr>
        </thead>
        <tbody>
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
  )
}
