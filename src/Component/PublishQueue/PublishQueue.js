/* eslint-disable no-undef */
import React, {Fragment} from 'react';
import {Switch,Redirect} from 'react-router-dom'
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

class PublishQueue extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isauth:false,
            render:<LoadingComponent/>
        }
        this.logoutHandler=this.logoutHandler.bind(this);
    }
    async logoutHandler () {
        let result = await axios.delete ('/user-session');
        console.log (result);
        this.setState ({isauth: false, render: <Redirect to="/login" />});
      }
    async componentDidMount(){
       let r=[];
       let api_key=window.location.pathname.split("/")[2];
        const callApi=async ()=>{
            try{
            let result=await axios.get('/v3/publish-queue',
                                    {headers:{
                                        "api_key":api_key
                                    }});
            result.data.queue.forEach((e,i)=>{
                r.push(<tr key={i}>
                    <td>{e.title}</td>
                    <td></td>
                    <td>{e.updated_at}</td>
                </tr>)
            })
            this.setState({isauth:true,r:r})
            }catch{
            }
        }
        try{
        callApi()
        }catch{
            console.log("Error at api")
        }
       }
   render(){
    let t=this.state.render
    if(this.state.isauth){
     return(
         <React.Fragment>
            <div className="message-display">Publishes goes here</div>
            <br />
               <table>
                   <thead>
                       <tr>
                        <td>Time</td>
                        <td>Entry</td>
                        <td>Content Type</td>
                        <td>Version</td>
                        <td>User</td>
                        <td>Environemt</td>
                        <td>Status</td>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                       </tr>
                   {this.state.r}
                   </tbody>
                   <tfoot></tfoot>
               </table>
               {this.props.routes?
           <Switch>
           {this.props.routes.map (route => {
                    return <RouteWithSubRoutes key={route.path} {...route} />
                })}
           </Switch>:null}
               </React.Fragment>
        )
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

export default PublishQueue;