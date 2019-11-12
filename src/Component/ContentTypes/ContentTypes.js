/* eslint-disable no-undef */
import React, {Fragment} from 'react';
import {Link, Switch,Redirect} from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

class ContentType extends React.Component{
    constructor(props){
        super(props)
        this.state={
            r:<LoadingComponent/>,
            isauth:false,
            render:<LoadingComponent/>
        }
           this.logoutHandler=this.logoutHandler.bind(this);
    }
    async logoutHandler () {
        let result = await axios.delete ('/user-session');
        this.setState ({isauth: false, render: <Redirect to="/login" />});
      }
    async componentDidMount(){
       try{
       let r=[]
        let url=window.location.pathname;
        let stackIdArray=url.split('/')
        let stackId=stackIdArray[2];
        const callApi=async ()=>{
            let result=await axios.get('/v3/content_types',
                                    {headers:{
                                        "api_key":stackId
                                    }});
            result.data.content_types.forEach((e,i)=>{
                r.push(<tr key={i}>
                    <td><Link to={`/stack/${stackId}/content-type/${e.uid}/en-us/entries`}>{e.title}</Link></td>
                    <td>{e.description}</td>
                    <td>{e.updated_at}</td>
                </tr>)
            })
            this.setState({isauth:true,r:r})
        }
        try{
        callApi()
        }catch{
        }
       }catch{
       }
   }

render(){
    console.log(window.location.pathname,"from contenttypes")
   let t=this.state.render
   let authenticated=this.state.isauth;
   if(authenticated){
       return(
           <React.Fragment>
           <div>
               <div className="message-display">Content-types goes here....</div>
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
                   {this.state.r}
                   </tbody>
                   <tfoot></tfoot>
               </table>
           </div>
           {this.props.routes?
           <Switch>
           {this.props.routes.map (route => {
                    return <RouteWithSubRoutes key={route.path} {...route} />
                })}
           </Switch>:null}
           </React.Fragment>)
   }
   else{
       return(
           <Fragment>
               {t}
           </Fragment>
       )
   }
}
}

export default ContentType;