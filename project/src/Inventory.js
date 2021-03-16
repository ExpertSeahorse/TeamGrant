import React, { useRef, useState, useEffect } from 'react'
import ItemList from './ItemList'

const LOCAL_STORAGE_KEY = 'itemsDB'

export default function Inventory() {
  const [items, setItems] = useState([])
  const addIDRef = useRef()

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedItems) setItems(storedItems)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function handleAddItem() {
    const id = addIDRef.current.value
    if (id === '') return
    addIDRef.current.value = null
    setItems(prevIDs => {
      return [...prevIDs, {id: id}]
    })
  }

  function handleClearItems() {
    setItems([])
  }

  return (
    <div>
      <input ref={addIDRef} type="text"/>
      <button onClick={handleAddItem}>Add Item</button>
      <button onClick={handleClearItems}>Clear Items</button>
      <table>
        <tr><th>Item Type</th><th>Color</th></tr>
        <ItemList items={items}/>
      </table>
    </div>
  )
}
