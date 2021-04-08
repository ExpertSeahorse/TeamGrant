import React, { useState, useEffect } from 'react'
import Header from './Header'
import Inventory from './Inventory';
import Catalog from './Catalog';
import Invoices from './InvoicesTab';
import './App.css';

const LOCAL_STORAGE_KEY_PAGE = 'pageDB'
const LOCAL_STORAGE_KEY_INV = 'inventoryDB'

/* 
Add invoices tab:
  Process order
  Adjust inventory
*/

// Build the webpage by combining components
export default function App() {
  const [page, setPage] = useState('i')
  const [inventory, setInventory] = useState([])

  const catalog = require("./data/catalog.json")
  // initial load page and inventory
  useEffect(() => {
    const storedPage = localStorage.getItem(LOCAL_STORAGE_KEY_PAGE)
    const storedInventory = localStorage.getItem(LOCAL_STORAGE_KEY_INV)
    if (storedPage) setPage(storedPage)
    if (storedInventory) setInventory(storedInventory)
  }, [])

  // If page changes, update local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PAGE, page)
  }, [page])

  // If inventory changes, update local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_INV, inventory)
  }, [inventory])

  // update function so that inventory can be passed to multiple components
  function updateInventory(newInventory) {
    setInventory(newInventory)

  }

  function showInventory() {
    setPage('i')
  }

  function showCatalog(){
    setPage('c')
  }
  
  function showInvoices(){
    setPage('in')
  }

  // switch case will set element to new page when page changes
  // add new case to add new page
  let element = null
  switch (page) {
    case 'i':
      element = <Inventory key={'i'} inventory={inventory} updateInventory={updateInventory}/>
      break;
    case 'c':
      element = <Catalog key={'c'} catalog={catalog}/>
      break;
    case 'in':
      element = <Invoices key={'in'} catalog={catalog} inventory={inventory} updateInventory={updateInventory}/>
      break;
    default:
      element = <Inventory key={'i'}/>
      break;
  }

  return (
    <>
    <header>
      <Header showInventory={showInventory} showCatalog={showCatalog} showInvoices={showInvoices}/>
    </header>
    <div>
      {element}
    </div>
    </>
  )
}