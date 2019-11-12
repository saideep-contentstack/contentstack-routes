/* eslint-disable no-undef */
import React, {Fragment} from 'react';
import {Switch,Redirect} from 'react-router-dom'
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

class EntryEdit extends React.Component{
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
        console.log("from entries edit")
           this.setState({isauth:true})
       }

   render(){
    let t=this.state.render
    if(this.state.isauth){
     return(
         <React.Fragment>
            <div className="message-display">Entry edits goes here...</div>
            <br />
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

export default EntryEdit;