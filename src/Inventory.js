import React, { useRef, useState, useEffect } from 'react'
import ItemList from './ItemList'

const LOCAL_STORAGE_KEY = 'itemsDB'

// Print the html representation of the Inventory JSON
export default function Inventory() {
  const [items, setItems] = useState([])
  const addIDRef = useRef()

  // initial load items
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedItems) setItems(storedItems)
  }, [])

  // If items changes, update local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  // Adds the text in the textbox to the items state
  function handleAddItem() {
    const id = addIDRef.current.value
    if (id === '') return
    addIDRef.current.value = null
    setItems(prevIDs => {
      return [...prevIDs, {id: id}]
    })
  }

  // clears the items state
  function handleClearItems() {
    setItems([])
  }

  // Display the Inventory Page
  return (
    <div>
      <input ref={addIDRef} type="text"/>
      <button onClick={handleAddItem}>Add Item</button>
      <button onClick={handleClearItems}>Clear Items</button>
      <table>
        <thead>
          <tr>
            <th>Item Type</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <ItemList items={items}/>
        </tbody> 
      </table>
    </div>
  )
}
