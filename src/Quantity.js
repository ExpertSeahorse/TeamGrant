import React from 'react'

export default function Quantity(props) {
  return (
    <td>
      {props.quantity}
      <button onClick={() => {props.add(props.id);}}>+</button>
      <button onClick={() => {props.sub(props.id);}}>-</button>
    </td>
  )
}
