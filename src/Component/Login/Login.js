/* eslint-disable no-undef */
import React from 'react';
import {Redirect,Switch} from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
class Login extends React.Component{
constructor(props){
    super(props);
    this.state={
      email:"",
      password:"",
      login:"",
      render:<LoadingComponent/>,
      isauth:false,
    };
    this.onSubmitHandler=this.onSubmitHandler.bind(this);
    this.onChangeHandler=this.onChangeHandler.bind(this);
    this.loginHandler=this.loginHandler.bind(this);
  }

  async componentDidMount(){
        try{
        // eslint-disable-next-line no-undef
        let result=await axios.get('/user')
        if(result.status===200){
            this.setState({isauth:false,render:<Redirect to="/stacks"/>})
          }
        }catch{
            this.setState({
              isauth:true,
            });
        }
     }

  onSubmitHandler(event){
    event.preventDefault();
  }

  onChangeHandler(event){
    let name=event.target.name;
    let value=event.target.value;
    // eslint-disable-next-line no-useless-escape
    let regex=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.setState({[name]:value});
    if(!regex.test(value) && name==="email"){
      document.getElementById('email-warning').innerHTML=` <i class="fa fa-warning" style="font-size:15px;color:red"></i>`
    }
    else{
      document.getElementById('email-warning').innerHTML="";
    }
  }

  async loginHandler(){
    try{
    if(document.querySelector('form').checkValidity() && this.state.email && this.state.password){
      console.log("from login handler");
      let obj={
        user:{
          email:this.state.email,
          password:this.state.password
        }
      }
      // eslint-disable-next-line no-undef
      // eslint-disable-next-line no-unused-vars
      let result=await axios.post('/user-session',obj)
      alert("login successful");
      // let result2=await axios.get('/user')
        this.setState({isauth:false,render:<Redirect noThrow to="/stacks"/>})
    }else{
      alert("Please enter proper credentials");
    }
  }catch{
    alert("Incorrect email or password")
  }
  }
  render(){
    if(this.state.isauth){
      return(
        <div className="login">
        <form className="login-form" onSubmit={this.onSubmitHandler} >
          <h2>Login to your account</h2>
          <fieldset>
            <legend>Login</legend>
            <label>Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.onChangeHandler} /><span id="email-warning"></span>
            <br/><br/>
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.onChangeHandler}/>
            <br/><br/>
            <button className="login-button" onClick={this.loginHandler}>Login</button>
            {this.state.login}
          </fieldset>
        </form>
        {this.props.routes
          ? <Switch>
           {this.props.routes.map (route => {
                    return <RouteWithSubRoutes key={route.path} {...route} />
                })}
           </Switch>
           : null}
        </div>
      )
    }else{
        return(
            <div>
              {this.state.render}
            </div>
        )
    }
  }
}

export default Login;