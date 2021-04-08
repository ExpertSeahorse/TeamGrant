import React from 'react'

// Displays the links at the top of the page

function navbar(props) {
  return (
    <div className='navbar'>
      <ul className='nav-items'>
        <li>
          <a onClick={props.showInventory}>Inventory</a>
        </li>
        <li>
          <a onClick={props.showCatalog}>Catalog</a>
        </li>
        <li>
          <a onClick={props.showInvoices}>Invoices</a>
        </li>
      </ul>
    </div>
  );
}

export default navbar;