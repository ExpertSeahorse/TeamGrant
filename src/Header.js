import './header.css'
import React from 'react'
import {Nav,Tab, Tabs} from 'react-bootstrap'

// Displays the links at the top of the page

function navbar(props) {
  return (
    <div class="topnav">
      <a onClick={props.showInventory}>Inventory</a>
      <a onClick={props.showCatalog}>Catalog</a>
      <a onClick={props.showInvoices}>Invoices</a>
    </div>
  );
}

export default navbar;
