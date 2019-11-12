/* eslint-disable no-undef */
import React, {Fragment} from 'react';
import {Redirect,Switch} from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

class Assets extends React.Component{
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
        console.log (result);
        this.setState ({isauth: false, render: <Redirect to="/login" />});
      }
    async componentDidMount(){
       try{
        let r=[]
        let url=window.location.pathname;
        let stackIdArray=url.split('/')
        let stackId=stackIdArray[2];
        const callApi=async ()=>{
            let result=await axios.get('/v3/assets',
                                    {headers:{
                                        "api_key":stackId
                                    }});
            result.data.assets.forEach((e,i)=>{
                r.push(<tr key={i}>
                    <td>{e.title}</td>
                    <td><img width="200px" height="200px" src={e.url} alt={e.title}/></td>
                    <td>{e.updated_at}</td>
                </tr>)
            })
            this.setState({r:r})
        }
        try{
        callApi()
        }catch{
            console.log("Error at api")
        }
           this.setState({isauth:true})
       }catch{
           console.log("from catch");
       }
           this.setState({isauth:true})
   }

render(){
   let t=this.state.render
   if(this.state.isauth){
    return(
        <React.Fragment>
        <div>
           <div className="message-display">Assets goes here</div>
           <br />
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
                   {this.state.r}
                   </tbody>
                   <tfoot></tfoot>
               </table>
               </div>{this.props.routes?
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

export default Assets;