import React from 'react';
import {useHistory} from 'react-router-dom';

export default function NotFound(){
    const history=useHistory();
    const goBackHandler=()=>{
        history.goBack();
    }
    return(
        <div>
            <nav className={`notFoundNav`}>
                <p>ContentStack</p>
            </nav>
            <div className={`notFoundDiv`}>
            <h3>404</h3>
            <h3>Oops! Something went wrong or that page doesn't exist</h3>
            <button onClick={goBackHandler} >Go Back</button>
            </div>
        </div>
    )
}
