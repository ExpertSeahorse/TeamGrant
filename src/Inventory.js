//import React, { useRef, useState, useEffect } from 'react'
import React from 'react'

// Create sorted data
const useSortableData = (items, config = null) => {
    // InventorySortConfig remembers the current sort pattern
    const [InventorySortConfig, setInventorySortConfig] = React.useState(config);
    
    // memoize the sorting algo so if the table is rerendered the sort is not recalculated
    const sortedItems = React.useMemo(() => {
      // copy the items arr to maintain the orig
      let sortableItems = [...items];
      // if InventorySortConfig exists:
      if (InventorySortConfig !== null) {
        // sort the table by a's key and b's key and direction. key + direction are set in requestSort
        sortableItems.sort((a, b) => {
          if (a[InventorySortConfig.key] < b[InventorySortConfig.key]) {
            return InventorySortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[InventorySortConfig.key] > b[InventorySortConfig.key]) {
            return InventorySortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, InventorySortConfig]);
  
    // set the value of the config with input from button 
    const requestSort = key => {
      let direction = 'ascending';
      // if already ascending and previous sort was the same key, swap to decending
      if (
        InventorySortConfig && 
        InventorySortConfig.key === key && 
        InventorySortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      // set InventorySortConfig to key, direction
      setInventorySortConfig({ key, direction });
    }
  
    return { items: sortedItems, requestSort, InventorySortConfig  };
}

const LOCAL_STORAGE_KEY = 'itemsDB'

// Print the html representation of the Inventory JSON
export default function Inventory() {
  const [items, setItems] = React.useState([])
  const addIDRef = React.useRef()

  // initial load items
  React.useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedItems) setItems(storedItems)
  }, [])

  // If items changes, update local storage
  React.useEffect(() => {
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

  // Convert items into an array of array elements
  function InventoryList({ items }) {
    const catalog = require("./data/catalog.json")
    let i = 0
    let temp = items.map(item => {
      if(catalog[item.id] === undefined) return
      else
        return( [item.id, catalog[item.id].itemType, catalog[item.id].color] )
    })
    console.log(temp)
    return (
      temp
    )
    
  }
  
  function InventoryItem(props) {
    props = props.value
    console.log(props)
    if (props[items] == []){
      return (
        <tr key={props[0]}>
          {/*<td>{props[0]}</td>*/}
          <td>{props[1]}</td>
          <td>{props[2]}</td>
        </tr>
      )
    } 
    else
      return null
}
  const InventoryTable = (props) => {
    // get data + sort it w/ above process
    const { items, requestSort, InventorySortConfig } = useSortableData(props.products);
  
    // for styling later
    const getClassNamesFor = (name) => {
        if (!InventorySortConfig) {
            return;
        }
        return InventorySortConfig.key === name ? InventorySortConfig.direction : undefined;
    };
  
    return (
      <div>
        <input ref={addIDRef} type="text"/>
        <button onClick={handleAddItem}>Add Item</button>
        <button onClick={handleClearItems}>Clear Items</button>
          <table>
            <caption>Inventory</caption>
            <thead>
                <tr key={"Inventory Header"}>
                    <th>
                        {/* Table Headers */}
                        Item Type
                        <button
                        type="button" 
                        onClick={() => requestSort('id')}
                        className={getClassNamesFor('id')}>
                        {getClassNamesFor('id')}
                        </button>
                    </th>
                    <th>
                        Color
                        <button 
                        type="button" 
                        onClick={() => requestSort('itemType')}
                        className={getClassNamesFor('itemType')}>
                        {getClassNamesFor('itemType')}
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>{ 
                // Loop over the sorted list and make a row in the Table for each item
                items.map(p => <InventoryItem value={p}/> )
            }</tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="App">
      <InventoryTable
        products={InventoryList({items})}
      />
    </div>
  );
}
