import React from 'react';
import {useHistory} from 'react-router-dom';

export default function Index () {
    const history=useHistory();
    const goToLoginHandler=()=>{
        history.replace("/login");
    }
  return (
    <div>
      <nav className={`notFoundNav`}>
        <p>ContentStack</p>
      </nav>
      <div className={`notFoundDiv`}>
        <h3>Click below to login!</h3>
        <button onClick={goToLoginHandler}>Login</button>
      </div>
    </div>
  );
}
