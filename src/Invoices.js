import React, { useRef, useState, useEffect } from 'react'
import InvoiceList from './InvoiceList'

const LOCAL_STORAGE_KEY_INVOICES = 'invoiceDB'

export default function Invoices() {
  const [invoices, setInvoices] = useState([])
  const addInvoiceIDRef = useRef()
  const addCustNameRef = useRef()
  const addProdIDRef = useRef()
  const addQuantityRef = useRef()
  const completedRef = useRef()

  // initial load invoices
  useEffect(() => {
    const storedInvoices = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_INVOICES))
    if (storedInvoices) setInvoices(storedInvoices)
  }, [])

  // If invoice changes, update local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_INVOICES, JSON.stringify(invoices))
  }, [invoices])

  // returns true if all input is valid
  // args = [invoiceID, custName, prodID, quantity]
  function validateInvoiceInput(...args) {
    let valid = true
    valid = valid && args.every(i => i !== '')
    valid = valid && invoices.every(i => i.id !== args[0])
    valid = valid && /^\d+$/.test(args[0])
    valid = valid && /^[a-z]+$/i.test(args[1])
    valid = valid && /^\d+$/.test(args[2])
    valid = valid && /^\d+$/.test(args[3])
    return valid
  }

  // Adds the text in the textbox to the items state
  function handleAddInvoice() {
    const invoiceID = addInvoiceIDRef.current.value
    const custName = addCustNameRef.current.value
    const prodID = addProdIDRef.current.value
    const quantity = addQuantityRef.current.value
    const completed = completedRef.current.checked
    addInvoiceIDRef.current.value = null
    addCustNameRef.current.value = null
    addProdIDRef.current.value = null
    addQuantityRef.current.value = null
    completedRef.current.checked = false
    // if (invoiceID === '' || custName === '' || prodID === '' || quantity === '' || invoices.some(i => i.id === invoiceID)) {
    if (validateInvoiceInput(invoiceID, custName, prodID, quantity)) {
      setInvoices(prevIDs => {
        return [...prevIDs, {key: invoiceID, id: invoiceID, customerName: custName, productID: prodID, quantity: quantity, completed: completed}]
      })
    } else{
      return
    }
  }

  // clears the items state
  function handleClearInvoices() {
    setInvoices([])
  }

  return (
    <div>
      <label>Invoice ID: </label>
      <input ref={addInvoiceIDRef} type="text"/>
      <label>Customer Name: </label>
      <input ref={addCustNameRef} type="text"/>
      <label> Product ID: </label>
      <input ref={addProdIDRef} type="text"/>
      <label> Quantity: </label>
      <input ref={addQuantityRef} type="text"/>
      <label> Complete</label>
      <input ref={completedRef} type="checkbox" />
      <button onClick={handleAddInvoice}>Add Invoice</button>
      <button onClick={handleClearInvoices}>Clear Invoices</button>
      <InvoiceList invoices={invoices}/>
    </div>
  )
}
