
import React from 'react'
import './Login.css'
import App from './App'

function onSubmit(){
      this.props.history.push('/MainPage');
  }
// Print the html representation of the Catalog JSON
// The Catalog is a lookup table for the Inventory. To add an item to the inventory, just input the ID + Qty and the properties will be populated

export default function Login() {
  // Convert catalog object into the style:
  // {id:xxx, itemType:xxx, color:xxx}
  // Get the modal
  return (
    <div class="login-box">
  <h2>Login</h2>
  <form>
    <div class="user-box">
      <input type="text" name="" required=""></input>
      <label>Username</label>
    </div>
    <div class="user-box">
      <input type="password" name="" required=""></input>
      <label>Password</label>
    </div>
    <button onClick=<App />>Login</button>
  </form>
</div>

  );

}
