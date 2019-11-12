/* eslint-disable no-undef */
import React, {Fragment} from 'react';
import {Switch,Redirect} from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

class Releases extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isauth:false,
            render: <LoadingComponent/>
        }
        this.logoutHandler=this.logoutHandler.bind(this);
    }
    async logoutHandler () {
        let result = await axios.delete ('/user-session');
        console.log (result);
        this.setState ({isauth: false, render: <Redirect to="/login" />});
      }
    async componentDidMount(){
       let r=[]
       let api_key=window.location.pathname.split('/')[2];
        const callApi=async ()=>{
            let result=await axios.get('/v3/releases',
                                    {headers:{
                                        "api_key":api_key
                                    }});
            result.data.releases.forEach((e,i)=>{
                // r.push(<tr key={i}>
                //     <td></td>
                //     <td></td>
                //     <td></td>
                // </tr>)
            })
            this.setState({isauth:true,r:r})
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
            <div className="message-display">Releases goes here</div>
            <br />
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
                           <td></td><td></td><td></td>
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

export default Releases;
