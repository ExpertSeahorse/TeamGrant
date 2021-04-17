import './header.css'
import React from 'react'
import {Nav,Tab, Tabs} from 'react-bootstrap'

// Displays the links at the top of the page

function navbar(props) {
  return (
    <div class="topnav">
    <a onClick={props.showHome}>Home</a>
    <a onClick={props.showLogin}>Login</a>
    </div>
  );
}

export default navbar;
