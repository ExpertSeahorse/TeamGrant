import React from 'react'
import './header.css'
import App from './App';
import Login from './Login';
import Logut from './Logut';
import { BrowserRouter, Link,Route, Switch }from "react-router-dom";


class MainPage extends React.Component {

  render(){
    return (
      <BrowserRouter>
      <div class="topnav">
      <Link exact to="/Login">Login</Link>
      <Link to="/App" className='disabled-link'>App</Link>
      <Link to="/Logut">Logout</Link>
      <Switch>
      <Route exact path="/Login" component={Login} />
      <Route path="/App" component={App} />
      <Route path="/Logut" component={Logut} />
      </Switch></div>
      </BrowserRouter>
    );
  }
}
export default MainPage;
