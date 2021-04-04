import React from 'react'
import Invoice from "./Invoice";

// returns Invoice table
export default function InvoiceList({ invoices }) {
  return (
    <table>
    <tr>
      <th>Invoice No.</th>
      <th>Customer Name</th>
      <th>Product ID</th>
      <th>Status</th>
      <th>Quantity</th>
    </tr>
    {invoices.map(invoiceData => { return <Invoice key={invoiceData.id} data={invoiceData}/> })}
    </table>
  )
}
