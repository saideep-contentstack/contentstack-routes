import React from 'react';

export default class NotFound extends React.Component{

    goBackHandler(){
        window.history.back();
    }
    render(){
        return(
            <div>
                <nav className={`notFoundNav`}>
                    <p>ContentStack</p>
                </nav>
                <div className={`notFoundDiv`}>
                <h3>404</h3>
                <h3>Oops! Something went wrong or that page doesn't exist</h3>
                <button onClick={this.goBackHandler} >Go Back</button>
                </div>
            </div>
        )
    }
}