const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var format = require('pg-format')
const app = express()
const db = require('./queries')
const port = 9000

app.use(cors())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.send('This is the Express-PostGreSQL API server. You can directly access the JSON output of the Inventory and Orders tables at /inventory and /orders.');
})

app.get('/inventory', db.getInventory)
app.get('/inventory/:id', db.sortedInventory)
app.get('/orders', db.getOrders)
app.get('/orders/:id', db.sortedOrders)
app.put('/addInv', db.addInv)
app.put('/addOrder', db.addOrder)
app.put('/completeOrder', db.completeOrder)
app.put('/upInvStock', db.upInvStock)
app.put('/upInvPrice', db.upInvPrice)
app.put('/delOrd', db.delOrd)
app.put('/delInv', db.delInv)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})