import React, { useState, useEffect, useRef } from 'react'
import Header from './Header'
import { stringify, v4 as uuidv4 } from 'uuid';
import Inventory from './Inventory';
import Catalog from './Catalog';
import './App.css';

// "main"

/* 
Add invoices tab:
  Process order
  Adjust inventory
Catalog:
  Add item
Inventory:
  Add quantity field
*/

function App() {
  const [page, setPage] = useState('i')

  function showInventory() {
    setPage('i')
  }

  function showCatalog(){
    setPage('c')
  }

  return (
    <>
    <header>
      <Header showInventory={showInventory} showCatalog={showCatalog}/>
    </header>
    <body>
    {page === 'i' ? <Inventory /> : <Catalog />}
    </body>
    </>
  )
}

export default App;