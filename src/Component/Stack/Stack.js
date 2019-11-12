/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, {Fragment} from 'react';
import {Switch,Redirect} from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

class Stack extends React.Component{
    constructor(props){
        super(props);
        this.state={
            status:"",
            isauth:false,
            render:<LoadingComponent/>
        }
        this.status=""
        this.logoutHandler=this.logoutHandler.bind(this);
    }

    async stackRendering(){
        try{
            let lsOrgId="";
            let result=await axios.get('/user')
        if(result.status===200){
            lsOrgId=result.data.user.organizations["0"].uid;
        }
            let result1=await axios.get('/stacks',
            {
                headers:{
                "organization_uid":lsOrgId
                }
            }
        )
        let objArray=[]
        result1.data.stacks.forEach((e,i)=>{
        let obj={
            stackId:e.api_key,
            stackName:e.name,
        }
        objArray.push(obj)
        })
        let render=[]
        objArray.forEach((e,i)=>{
        let link=`stack/${e.stackId}/dashboard`
        render.push(<li key={i}><a href={link} id={e.stackId}><div className="stack-block">{e.stackName}</div></a></li>)
        })
        this.setState({isauth:true,render:render,status:this.status});

        }catch{

        }
    }

    async componentDidMount(){
        this.stackRendering();
          }

          async logoutHandler(){
            let result=await axios.delete('/user-session');
            this.setState({isauth:false,render:<Redirect noThrow to="/login"/>})
           }
    render(){
        let status=this.state.status;
        if(this.state.isauth){
            return(
              <Fragment>
                  <nav className="stacks"> <div><a onClick={this.logoutHandler}>Logout</a></div></nav>
                  <div className="message-display">Stacks goes here</div>
                {status}
                <ul className="stacksList">
                {this.state.render}
                </ul>
                {this.props.routes?
           <Switch>
           {this.props.routes.map (route => {
                    return <RouteWithSubRoutes key={route.path} {...route} />
                })}
           </Switch>:null}
              </Fragment>
            )
        }
        else{
        return(
            <Fragment>
                {this.state.render}
            </Fragment>
        )
    }
    }
}
export default Stack;