import React from 'react'
import InvoiceStatus from './InvoiceStatus'

// returns a single Invoice row
export default function Invoice( props ) {
  return (
    <tr>
      <td>{props.data.id}</td>
      <td>{props.data.customerName}</td>
      <td>{props.data.productID}</td>
      <InvoiceStatus key={props.data.invoiveID} data={props.data} handleStatusChange={props.handleStatusChange} />
      <td>{props.data.quantity}</td>
    </tr>
  )
}
