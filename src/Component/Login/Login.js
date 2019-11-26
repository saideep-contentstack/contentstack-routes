/* eslint-disable no-undef */
import React,{useState,useEffect} from 'react';
import {useHistory, Switch} from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import Axios from 'axios';

export default function Login (props) {
  const [loading,setLoadingStatus]=useState(true)
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const history=useHistory();
  const onSubmitHandler = event => {
    event.preventDefault ();
  };
  useEffect(()=>{
    const checkAreadyLoggedIn=async()=>{
      try{
        await Axios.get('/user')
        history.push('/stacks');
      }catch{
        setLoadingStatus(false)
      }
    }
    checkAreadyLoggedIn();
  },[history])
  const loginHandler=async()=>{
    try{
      if(document.querySelector('form').checkValidity() && email && password){
        let obj={
          user:{
          email:email,
          password:password
        }
      }
      await Axios.post('/user-session',obj);
      history.push("/stacks");
    }else{
      alert("Enter proper credentials");
    }
    }catch{
      alert("Incorrect email or password");
    }
  }
  if(!loading){
    return(
      <div className="login">
        <form className="login-form" onSubmit={onSubmitHandler} >
          <h2>Login to your account</h2>
          <fieldset>
            <legend>Login</legend>
            <label>Email</label>
            <input type="email" name="email" value={email} onChange={(event)=>setEmail(event.target.value)} /><span id="email-warning"></span>
            <br/><br/>
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
            <br/><br/>
            <button className="login-button" onClick={loginHandler}>Login</button>
          </fieldset>
        </form>
        {props.routes
          ? <Switch>
           {props.routes.map (route => {
                    return <RouteWithSubRoutes key={route.path} {...route} />
                })}
           </Switch>
           : null}
        </div>
    )
  }
  else{
    return(
      <LoadingComponent/>
    )
  }
}
