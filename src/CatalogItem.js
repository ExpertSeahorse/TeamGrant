import React from 'react'

// creates a row in the Catalog table
export default function CatalogItem(props) {
  return (
      <tr>
        <td>{props.value.id}</td>
        <td>{props.value.itemType}</td>
        <td>{props.value.color}</td>
      </tr>
  )
}
