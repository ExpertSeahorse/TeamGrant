import React, { Component } from "react";
import axios from "axios";
//import logo from './logo.svg';
import './App.css';
//import FetchInventory from "./components/FetchInventory";

const api = axios.create({
  /* Use this when only running locally, use the second IP address when using ZeroTier */
  // baseURL: 'http://localhost:9000
  /* ZeroTier IP */
  baseURL: 'http://172.22.76.141:9000'
  /* Local IP
   * Allows access from machines not on local network */
  // baseURL: 'http://192.168.254.11:9000'
  /* Outward-facing IP
   * Allows access from any machine
   * NOTE: THIS CONNECTION CAN BE EXTREMELY SLOW AND UNRESPONSIVE */
  // baseURL: 'http://47.197.14.142:9000'
})

let mode = true
let invSMode = 0
let ordSMode = 0

class App extends Component {

  state = {
    items: []
  }

  newInvItem = {
    newName: "",
    newType: "",
    newPrice: 0.00,
    newQnt: 0,
    newClr: [],
    newMat: []
  }

  newOrdItem = {
    newCName: "",
    newOQnt: 0,
    newOPID: 0
  }

  constructor() {
    super();
    this.getSortedInventory(0);
  }

  // List all inventory items as table by PID ascending
  getInventory = async () => {
    mode = true
    let data = await api.get('/inventory').then(({ data }) => data)
    this.setState({items: data})
  }

  // List inventory items as ordered according to input
  getSortedInventory = async (smode) => {
    mode = true
    let data = await api.get(`/inventory/${smode}`).then(({ data }) => data)
    this.setState({items: data})
  }

  // List all orders as table by OID ascending
  getOrders = async () => {
    mode = false
    let data = await api.get('/orders').then(({ data }) => data)
    this.setState({items: data})
  }
  
  // List orders as ordered according to input
  getSortedOrders = async (smode) => {
    mode = false
    let data = await api.get(`/orders/${smode}`).then(({ data }) => data)
    this.setState({items: data})
  }

  // Add new inventory item
  addInv = async (nme, typ, prc, quant, clr, mats) => {
    const trimClr = clr.trim()
    const trimMat = mats.trim()
    let res = await api.put('/addInv', { itemtype: `${typ}`, qnt: `${quant}`, price: `${prc}`, name: `${nme}`, color: `${trimClr}`, mat: `${trimMat}` } )
    this.getSortedInventory(invSMode)
    console.log(res)
  }

  // Add new order
  addOrder = async (nme, id, qnt) => {
    let res = await api.put('/addOrder', { pid: `${id}`, qnt: `${qnt}`, name: `${nme}`})
    this.getSortedOrders(ordSMode)
    console.log(res)
  }

  // Delete order
  delOrd = async (id) => {
    let res = await api.put('/delOrd', { oid: `${id}` })
    this.getSortedOrders(ordSMode)
    console.log(res)
  }

  // Delete inventory item
  delInv = async (id) => {
    let res = await api.put('/delInv', { pid: `${id}` })
    this.getSortedInventory(invSMode)
    console.log(res)
  }

  // Mark order Completed field as "true"
  completeOrder = async (id) => {
    let res = await api.put('/completeOrder', { oid: `${id}` })
    this.getSortedOrders(ordSMode)
    console.log(res)
  }

  // Update inventory item stock
  // Mode 0 = directly set new value
  // Mode 1 = increase/decrease current value by given amount
  // Mode 3 = increase/decrease current value by given percentage of current value (e.g., given 50 do +50% of current stock)
  upInvStock = async(id, mode) => {
    const newStock = prompt('Enter the item\'s new stock:')
    if (newStock === "") {
      // Do nothing
    }
    else if (newStock) {
      let res = await api.put('/upInvStock', { mode: `${mode}`, pid: `${id}`,qnt: `${newStock}`})
      this.getSortedInventory(invSMode)
      console.log(res)
    }
    else {
      // Do nothing
    }
  }

  // Update inventory item price
  upInvPrice = async(id, mode) => {
    const newPrice = prompt('Enter the item\'s new price:')
    if (newPrice === "") {
      // Do nothing
    }
    else if (newPrice) {
      let res = await api.put('/upInvPrice', { mode : `${mode}`, pid: `${id}`, prc: `${newPrice}`})
      this.getSortedInventory(invSMode)
      console.log(res)
    }
    else {
      // Do nothing
    }
  }

  // Handler for changing new inventory item form values
  invInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.newInvItem[name] = value
  }

  // Handler for submitting a new inventory item form
  handleSubmitInv = () => {
    this.addInv(this.newInvItem.newName, this.newInvItem.newType, this.newInvItem.newPrice, this.newInvItem.newQnt, this.newInvItem.newClr, this.newInvItem.newMat)
  }

  // Handler for changing order form values
  ordInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.newOrdItem[name] = value
  }

  // Handler for submitting a new order form
  handleSubmitOrd = () => {
    this.addOrder(this.newOrdItem.newCName, this.newOrdItem.newOPID, this.newOrdItem.newOQnt)
  }

  // List array items in table as bullet point list
  listItem = (input) => {
    if (input) {
      return (<ul>{input.map(item => (<li key={item}>{item}</li>))}</ul>)
    }
    else {
      return input
    }
  }

  // Reset values inside form text boxes
  resetForm = (event) => {
    event.target.reset()
    // Also reset newInvItem and newOrdItem values
    // newInvItem
    this.newInvItem.newName = ""
    this.newInvItem.newType = ""
    this.newInvItem.newPrice = 0.00
    this.newInvItem.newQnt = 0
    this.newInvItem.newClr = []
    this.newInvItem.newMat = []
    // newOrdItem
    this.newOrdItem.newCName = ""
    this.newOrdItem.newOPID = 0
    this.newOrdItem.newOQnt = 0
  }

  // Handle table sortin queries
  sortTables = (whichTable, newMode) => {
    if (whichTable === 0) {
      invSMode = newMode
      this.getSortedInventory(invSMode)
    }
    else {
      ordSMode = newMode
      this.getSortedOrders(ordSMode)
    }
  }

  // Render website
  render() {
    if (mode) {
      return (
        <div className="App">
          <h1><strong>Inventory & Order Management</strong></h1>
          <h2>Available Pages</h2>
          <p>
            <button onClick={() => {this.getSortedInventory(invSMode)}}>Inventory</button>
            <button onClick={() => {this.getSortedOrders(ordSMode)}}>Orders</button>
          </p>
          <center><h2>Insert New Inventory Item</h2></center>
          <form id="newInvForm" onReset={this.resetForm}>
            <label>
              Name:&ensp;
              <input
                name="newName"
                type="text"
                onInput={this.invInputChange} />
            </label>
            <label>
              &ensp;Type:&ensp;
              <input
                name="newType"
                type="text"
                onInput={this.invInputChange} />
            </label>
            <label>
              &ensp;Price:&ensp;
              <input
                name="newPrice"
                type="number"
                min="0.00"
                step="0.01"
                precision={2}
                onInput={this.invInputChange} />
            </label>
            <label>
              <br/>Quantity:&ensp;
              <input
              name="newQnt"
              type="number"
              min="0"
              step="1"
              onInput={this.invInputChange} />
            </label>
            <label>
              &ensp;Colors:&ensp;
              <input
                name="newClr"
                type="text"
                onInput={this.invInputChange} />
            </label>
            <label>
              &ensp;Materials:&ensp;
              <input
                name="newMat"
                type="text"
                onInput={this.invInputChange} />
            </label>
            <br/>
            <br/>
            <input type="reset" value="Reset Form" />
          </form>
          <button onClick={this.handleSubmitInv}>Add to Inventory</button>
          <center><h2>Inventory</h2></center>
          <center>
            <table border="1px solid black" text-align="center">
              <tbody>
                <tr bgcolor="gray">
                  <th>Product ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Price Per Item</th>
                  <th>Quantity</th>
                  <th>Color</th>
                  <th>Material</th>
                  <th rowSpan="2">Change Quantity</th>
                  <th rowSpan="2">Change Price</th>
                  <th rowSpan="2">Delete</th>
                </tr>
                <tr bgcolor="gray">
                  <th> <center>
                    <button onClick={() => {this.sortTables(0,0)}}>↑</button>
                    <button onClick={() => {this.sortTables(0,1)}}>↓</button>
                  </center> </th>
                  <th><center>
                    <button onClick={() => {this.sortTables(0,2)}}>↑</button>
                    <button onClick={() => {this.sortTables(0,3)}}>↓</button>
                  </center></th>
                  <th><center>
                    <button onClick={() => {this.sortTables(0,4)}}>↑</button>
                    <button onClick={() => {this.sortTables(0,5)}}>↓</button>
                  </center></th>
                  <th><center>
                    <button onClick={() => {this.sortTables(0,6)}}>↑</button>
                    <button onClick={() => {this.sortTables(0,7)}}>↓</button>
                  </center></th>
                  <th><center>
                    <button onClick={() => {this.sortTables(0,8)}}>↑</button>
                    <button onClick={() => {this.sortTables(0,9)}}>↓</button>
                  </center></th>
                  <th><center>
                    <button onClick={() => {this.sortTables(0,10)}}>↑</button>
                    <button onClick={() => {this.sortTables(0,11)}}>↓</button>
                  </center></th>
                  <th><center>
                    <button onClick={() => {this.sortTables(0,12)}}>↑</button>
                    <button onClick={() => {this.sortTables(0,13)}}>↓</button>
                  </center></th>
                </tr>
                {
                  this.state.items.map(item =>
                  <tr key={item.PID}>
                    <td><center>{item.PID}</center></td>
                    <td><center>{item.Name}</center></td>
                    <td><center>{item.ItemType}</center></td>
                    <td><center>{item.PricePerItem}</center></td>
                    <td><center>{item.Quantity}</center></td>
                    <td>{this.listItem(item.Color)}</td>
                    <td>{this.listItem(item.Material)}</td>
                    <td>
                      <center>
                        <button onClick={()=>this.upInvStock(item.PID, 0)}>#</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={()=>this.upInvPrice(item.PID, 0)}>$</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={()=>this.delInv(item.PID)}>X</button>
                      </center>
                    </td>
                  </tr>)
                }
              </tbody>
            </table>
          </center>
          <br/>
        </div>
      )
    }
    else {
      return (
      <div className="App">
          <h1><strong>Inventory & Order Management</strong></h1>
          <h2>Available Pages</h2>
          <p>
            <button onClick={() => {this.getSortedInventory(invSMode)}}>Inventory</button>
            <button onClick={() => {this.getSortedOrders(ordSMode)}}>Orders</button>
          </p>
          <center><h2>Create New Order</h2></center>
          <form id="newOrdForm" onReset={this.resetForm}>
            <label>
              Name:&ensp;
              <input
                name="newCName"
                type="text"
                onInput={this.ordInputChange} />
            </label>
            <label>
              &ensp;Product ID:&ensp;
              <input
                name="newOPID"
                type="number"
                min="0"
                step="1"
                onInput={this.ordInputChange} />
            </label>
            <label>
              &ensp;Order Quantity:&ensp;
              <input
                name="newOQnt"
                type="number"
                min="0"
                step="1"
                onInput={this.ordInputChange} />
            </label>
            <br/>
            <br/>
            <br/>
            <input type="reset" value="Reset Form"/>
          </form>
          <center>
            <button onClick={this.handleSubmitOrd}>Create Order</button>
          </center>
          <center><h2>Orders</h2></center>
          <center>
            <table border="1px solid black" text-align="center">
              <tbody>
                <tr bgcolor="gray">
                  <th>Order ID</th>
                  <th>Product ID</th>
                  <th>Quantity</th>
                  <th>Customer Name</th>
                  <th>Order Created</th>
                  <th>Completion Status</th>
                  <th rowSpan="2">Complete Order</th>
                  <th rowSpan="2">Delete Order</th>
                </tr>
                <tr bgcolor="gray">
                  <th><center>
                    <button onClick={() => {this.sortTables(1,0)}}>↑</button>
                    <button onClick={() => {this.sortTables(1,1)}}>↓</button>
                  </center></th>
                  <th><center>
                    <button onClick={() => {this.sortTables(1,2)}}>↑</button>
                    <button onClick={() => {this.sortTables(1,3)}}>↓</button>
                  </center></th>
                  <th><center>
                    <button onClick={() => {this.sortTables(1,4)}}>↑</button>
                    <button onClick={() => {this.sortTables(1,5)}}>↓</button>
                  </center></th>
                  <th><center>
                    <button onClick={() => {this.sortTables(1,6)}}>↑</button>
                    <button onClick={() => {this.sortTables(1,7)}}>↓</button>
                  </center></th>
                  <th><center>
                    <button onClick={() => {this.sortTables(1,8)}}>↑</button>
                    <button onClick={() => {this.sortTables(1,9)}}>↓</button>
                  </center></th>
                  <th><center>
                    <button onClick={() => {this.sortTables(1,10)}}>↑</button>
                    <button onClick={() => {this.sortTables(1,11)}}>↓</button>
                  </center></th>
                </tr>
                {
                  this.state.items.map(item => <tr key={item.OID}>
                    <td><center>{item.OID}</center></td>
                    <td><center>{item.PID}</center></td>
                    <td><center>{item.Quantity}</center></td>
                    <td><center>{item.CName}</center></td>
                    <td><center>{item.Date.substring(0, item.Date.indexOf("T"))}</center></td>
                    <td><center>{item.Completed.toString()}</center></td>
                    <td>
                      <center>
                        <button onClick={()=>this.completeOrder(item.OID)}>✓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={()=>this.delOrd(item.OID)}>X</button>
                      </center>
                    </td>
                  </tr>)
                }
              </tbody>
            </table>
          </center>
          <br/>
        </div>
      )
    }
    
  }

}
export default App;
