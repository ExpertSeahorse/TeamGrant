//import React, { useRef, useState, useEffect } from 'react'
import Quantity from './Quantity'
import React from 'react'

// Create sorted data
const useSortableData = (s_items, config = null) => {
    // InventorySortConfig remembers the current sort pattern
    const [InventorySortConfig, setInventorySortConfig] = React.useState(config);
    
    // memoize the sorting algo so if the table is rerendered the sort is not recalculated
    const sortedItems = React.useMemo(() => {
      if (Object.keys(s_items).length === 0) return
      // copy the s_items arr to maintain the orig
      let sortableItems = [...s_items];
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
    }, [s_items, InventorySortConfig]);
  
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
  
    return { s_items: sortedItems, requestSort, InventorySortConfig  };
}

// Print the html representation of the Inventory JSON
export default function Inventory( props ) {
  const [items, setItems] = React.useState(props.inventory)
  const addIDRef = React.useRef()

  // If items changes, update local storage
  React.useEffect(() => {
    props.updateInventory(items)
  }, [items])

  // Adds the text in the textbox to the items state
  function handleAddItem() {
    const id = addIDRef.current.value
    if (id === '') return
    addIDRef.current.value = null
    if(items.some(i => i.id === id)){
      setItems(items.map( (item) => {
        if(item.id === id){
          return {id : id, quantity: item.quantity+1}
        }
        else{
          return item
        }
      }))
    }
    else{
      setItems(prevIDs => {
        return [...prevIDs, {id: id, quantity: 1}]
      })
    }
  }

  // function to pass to Quantity component
  function addQuantity(id) {
    setItems(items.map( (item) => {
      if(item.id === id){
        return {id : id, quantity: item.quantity+1}
      }
      else{
        return item
      }
    }))
  }
  
  // function to pass to Quantity component
  function subtractQuantity(id) {
    setItems(items.map( (item) => {
      if(item.id === id){
        return {id : id, quantity: item.quantity-1}
      }
      else{
        return item
      }
    }))
  }

  // clears the items state
  function handleClearItems() {
    setItems([])
  }

  // Convert items into an array of objects
  function InventoryList({ items }) {
    const catalog = require("./data/catalog.json")
    
    // create an array representation of the items object
    let temp = items.map(item => {
      if(catalog[item.id] === undefined) return undefined
      else
        return( [item.id, catalog[item.id].itemType, catalog[item.id].color] )
    })
    if (temp === []) return

    let inv = []
    // convert the array into and array of objects
    temp.forEach(p => {
      inv.push({
        id: p[0],
        itemType: p[1],
        color: p[2],
        quantity: items.find( i => i.id = p[0]).quantity
      })
    });
    return inv
  }
  
  const InventoryTable = (props) => {
    // get data + sort it w/ above process
    const { s_items, requestSort, InventorySortConfig } = useSortableData(props.products);
  
    // for styling later
    const getClassNamesFor = (name) => {
        if (!InventorySortConfig) {
            return;
        }
        return InventorySortConfig.key === name ? InventorySortConfig.direction : undefined;
    };
    
    if (s_items === undefined) return (
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
                  <th>
                      Quantity
                      <button
                      type="button" 
                      onClick={() => requestSort('quantity')}
                      className={getClassNamesFor('quantity')}>
                      {getClassNamesFor('quantity')}
                      </button>
                  </th>
              </tr>
          </thead>
        </table>
      </div>
    )
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
                    <th>
                      Quantity
                      <button
                      type="button" 
                      onClick={() => requestSort('quantity')}
                      className={getClassNamesFor('quantity')}>
                      {getClassNamesFor('quantity')}
                      </button>
                    </th>
                </tr>
            </thead>
            <tbody>{ 
                // Loop over the sorted list and make a row in the Table for each item
                s_items.map(p =>(
                  <tr key={p.id}>
                    <td>{p.itemType}</td>
                    <td>{p.color}</td>
                    <Quantity key={p.id} id={p.id} quantity={p.quantity} add={addQuantity} sub={subtractQuantity}/>
                  </tr>
                ))
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
