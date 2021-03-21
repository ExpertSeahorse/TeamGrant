import React, { useState, useEffect, useRef } from 'react'
import Header from './Header'
import { stringify, v4 as uuidv4 } from 'uuid';
import Inventory from './Inventory';
import { Table, Catalog } from './Catalog';
import './App.css';
//import Catalog from './Catalog';

// "main"

/* 
Add invoices tab:
  Process order
  Adjust inventory
*/

// Build the webpage by combining components
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
    {/* {page === 'i' ? <Inventory /> : <Table data={Catalog} />} */}
      <Table data={Catalog} />
    </body>
    </>
  )
}

export default App;