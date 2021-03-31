import React from 'react'

// creates a row in the Catalog table
export default function CatalogItem(props) {
  return (
      <tr>
        <td>{props.value[0]}</td>
        <td>{props.value[1].itemType}</td>
        <td>{props.value[1].color}</td>
      </tr>
  )
}
