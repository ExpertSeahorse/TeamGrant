import React, { useState } from 'react'
import { Redirect } from "react-router-dom";
import './Login.css'

class Login extends React.Component{

 constructor(){
   super();
   this.state = {
     err: ''
   };
 }
  login(e){
    e.preventDefault();
    var username = e.target.elements.username.value;
    var password = e.target.elements.password.value;
    if(username == 'admin' && password == 'admin123'){
      this.props.history.push('/App');
    }else{
      this.setState({
        err: 'Incorrect Login'
      });
    }
  }

render(){
let format = {
    color:"red"
};
  return (
    <div class="login-box">
    <span style={format}>{this.state.err != ''? this.state.err: ''}</span>
  <h2>Login</h2>
  <form method="post" onSubmit={this.login.bind(this)}>
    <div class="user-box">
    <label>Username</label>
    <br /><br />
      <input type="text" name="username" />
    </div>
    <div class="user-box">
    <label>Password</label>
    <br /><br />
      <input type="password" name="password" />
    </div>
    <div>
    <input type="submit" value="Login"/>
    </div>
  </form>
</div>

  );
}
}
export default Login;
