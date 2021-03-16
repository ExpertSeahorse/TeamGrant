import React from 'react'

export default function CatalogItem(props) {
  return (
      <tr><td>{props.id}</td><td>{props.value.itemType}</td><td>{props.value.color}</td></tr>
  )
}
