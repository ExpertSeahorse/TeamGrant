import React from 'react'

// returns status component of an invoice row
export default function InvoiceStatus( props ) {
  const status = props.data.status
  if(status){
    return(
      <td>Complete</td>
    )
  } else{
    return (
      <td>
        <button onClick={() => {props.handleStatusChange(props.data);}}>Pending</button>
      </td>
    )
  }
}
