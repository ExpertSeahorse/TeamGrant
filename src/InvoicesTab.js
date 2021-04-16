import React, { useRef, useState, useEffect } from 'react'
import InvoiceList from './InvoiceList'
import './Input_Fields'

const LOCAL_STORAGE_KEY_INVOICES = 'invoiceDB'

export default function Invoices( props ) {
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

  // returns true if input is valid
  function validateInvoiceInput(prodID, status, quantity) {
    if(status){
      props.inventory.map( (item) => {
        let hasEnoughInStock = (item.quantity >= quantity)
        if(item.id === prodID){
          if(!hasEnoughInStock){
            alert("There is not enough inventory in stock to complete this invoice.")
          }
          return hasEnoughInStock
        }
      })
    } else {
      let isInCatalog = props.catalog.hasOwnProperty(prodID)
      if(!isInCatalog) {
        alert("This product is not in the catalog.")
      }
      return isInCatalog
    }
  }

  // Adds the text in the textbox to the items state
  function handleAddInvoice() {
    const invoiceID = addInvoiceIDRef.current.value
    const custName = addCustNameRef.current.value
    const prodID = addProdIDRef.current.value
    const quantity = addQuantityRef.current.value
    const status = completedRef.current.checked
    // validate input
    if(validateInvoiceInput(prodID, status, quantity)) {
      addInvoiceIDRef.current.value = null
      addCustNameRef.current.value = null
      addProdIDRef.current.value = null
      addQuantityRef.current.value = null
      completedRef.current.checked = false
      setInvoices(prevIDs => {
        return [...prevIDs, {key: invoiceID, id: invoiceID, customerName: custName, productID: prodID, quantity: quantity, status: status}]
      })
    }
  }

  // clears the items state
  function handleClearInvoices() {
    setInvoices([])
  }

  // changes the status of an invoice
  function handleStatusChange(invoiceToChange) {
    props.inventory.map( (item) => {
      let hasEnoughInStock = (item.quantity >= invoiceToChange.quantity)
      if(item.id === invoiceToChange.productID){
        if(!hasEnoughInStock){
          alert("There is not enough inventory in stock to complete this invoice.")
          return
        } else {
          props.updateInventory(props.inventory.map( (item) => {
            if(item.id === invoiceToChange.productID){
              return {id: item.id, quantity: item.quantity-invoiceToChange.quantity}
            }
            else{
              return item
            }
          }))
        }
      }
    })
    setInvoices(invoices.map( (invoice) => {
      const currInvoice = invoice
      if(invoice.invoiceID === invoiceToChange.invoiceID){
        currInvoice.status = true;
      }
      return currInvoice
    }))
    console.log(props.inventory)}

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
      <InvoiceList invoices={invoices} handleStatusChange={handleStatusChange}/>
    </div>
  )
}
