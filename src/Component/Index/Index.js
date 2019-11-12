import React from 'react';
import {Redirect} from 'react-router-dom';

export default class NotFound extends React.Component{
    constructor(props){
        super(props);
        this.state={
            login:""
        }
        this.goBackHandler=this.goBackHandler.bind(this);
    }
    

    goBackHandler(){
        this.setState({
            login:<Redirect to="/login"/>
        })
    }
    render(){
        return(
            <div>
                {this.state.login}
                <nav className={`notFoundNav`}>
                    <p>ContentStack</p>
                </nav>
                <div className={`notFoundDiv`}>
                <h3>Click below to login!</h3>
                <button onClick={this.goBackHandler} >Login</button>
                </div>
            </div>
        )
    }
}