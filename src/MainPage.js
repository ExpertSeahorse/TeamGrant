import React, { useState, useEffect } from 'react'
import MainHeader from './MainHeader'
import Login from './Login';
import Home from './Home';
import './App.css';

const LOCAL_STORAGE_KEY_PAGE = 'pageDB'
const LOCAL_STORAGE_KEY_INV = 'inventoryDB'

/*
Add invoices tab:
  Process order
  Adjust inventory
*/

// Build the webpage by combining components
export default function MainPage() {
  const [page, setPage] = useState('l')
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
  function showLogin(){
    setPage('l')
  }

  function showHome(){
    setPage('h')
  }

  // switch case will set element to new page when page changes
  // add new case to add new page
  let element = null
  switch (page) {
    case 'l':
      element = <Login key={'l'}/>
      break;
    case 'h':
      element = <Home key={'h'}/>
      break;
    default:
      element = <Home key={'h'}/>
      break;
  }

  return (
    <>
    <header>
      <MainHeader showLogin={showLogin} showHome={showHome}/>
    </header>
    <div>
      {element}
    </div>
    </>
  )
}
