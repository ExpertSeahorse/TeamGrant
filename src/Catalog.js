import React from 'react'
import CatalogItem from './CatalogItem'

export default function Catalog() {
  const catalog = require('./data/catalog.json')

  // Print the html representation of the Catalog JSON
  // The Catalog is a lookup table for the Inventory. To add an item to the inventory, just input the ID + Qty and the properties will be populated

  // Loop over the catalog object and match each entry to a row in the Table
  return (
    <div>
      <table>
        <tr><th>ID</th><th>Item Type</th><th>Color</th></tr>
        {Object.keys(catalog).map(key => <CatalogItem key={key} id={key} value={catalog[key]} />)}
      </table>
    </div>
  )
}
