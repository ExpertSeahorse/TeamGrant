import React, { useState, useEffect } from 'react'
import Header from './Header'
import Inventory from './Inventory';
import Catalog from './Catalog';
import Invoices from './Invoices';
import './App.css';
//import Catalog from './Catalog';

const LOCAL_STORAGE_KEY = 'pageDB'

/* 
Add invoices tab:
  Process order
  Adjust inventory
Catalog:
  Add item
*/

// Build the webpage by combining components
export default function App() {
  const [page, setPage] = useState('i')

  // initial load page
  useEffect(() => {
    const storedPage = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedPage) setPage(storedPage)
  }, [])

  // If page changes, update local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, page)
  }, [page])

  function showInventory() {
    setPage('i')
  }

  function showCatalog(){
    setPage('c')
  }
  
  function showInvoices(){
    setPage('in')
  }

  return (
    <>
    <header>
      <Header showInventory={showInventory} showCatalog={showCatalog} showInvoices={showInvoices}/>
    </header>
    <div>
      {page === 'i' ? <Inventory key={'i'}/> : page === 'c' ? <Catalog key={'c'}/> : <Invoices key={'in'}/>}
    </div>
    </>
  )
}