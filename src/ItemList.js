import React from 'react'

// Builds the Inventory table in HTML by converting a table of IDs to a table of pieces of furnisher
export default function ItemList({ items }) {
  const catalog = require("./data/catalog.json")
  let i = 0
  return (
    items.map(item => {
      if(catalog[item.id] === undefined) return
      else
        return(
          <tr key={i++}>
            <td>{catalog[item.id].itemType}</td>
            <td>{catalog[item.id].color}</td>
          </tr>
        ) 
    })
  )
}