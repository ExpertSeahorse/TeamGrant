import React from 'react'

// returns a single Invoice row
export default function Invoice( props ) {
  return (
    <tr>
      <td>{props.data.id}</td>
      <td>{props.data.customerName}</td>
      <td>{props.data.productID}</td>
      {props.data.completed? <td>Complete</td>:<td>Pending</td>}
      <td>{props.data.quantity}</td>
    </tr>
  )
}
