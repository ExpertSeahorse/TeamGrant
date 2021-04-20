import React, { useState } from 'react'
import { Redirect } from "react-router-dom";
import './Login.css'

const Logut = () =>{
  const [isAuth, setIsAuth] = useState(true);

  if(!isAuth){
    return (
      <Redirect to="/Login" />
    );
  }

  return (
    <div>
    <br /><br />
    <h3> Please click on the Logout button to go back to Login </h3>
    <button onClick={() => setIsAuth(false)}>Logout</button>
    </div>

  );

}
export default Logut;
