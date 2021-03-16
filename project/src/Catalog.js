import React from 'react'
import CatalogItem from './CatalogItem'

export default function Catalog() {
  const catalog = require('./data/catalog.json')
  console.log(Object.keys(catalog))

  return (
    <div>
      <table>
        <tr><th>ID</th><th>Item Type</th><th>Color</th></tr>
        {Object.keys(catalog).map(key => <CatalogItem key={key} id={key} value={catalog[key]} />)}
      </table>
    </div>
  )
}
