import React from 'react'

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
      </ul>
    </div>
  );
}

export default navbar;