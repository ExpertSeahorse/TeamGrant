const Pool = require('pg').Pool
var format = require('pg-format')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'CEN4020 Final Project',
  password: 'xWd86i5CwHpupa',
  port: 5432,
})

// Get inventory items as JSON
// EX: curl.exe '-X', 'GET', 'http://localhost:3000/inventory'
const getInventory = (request, response) => {
    pool.query('SELECT * FROM public.\"Inventory\" ORDER BY \"PID\" ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const sortedInventory = (request, response) => {
  const switchVar = request.params.id
  switch(switchVar) {
    case '0':
      pool.query('SELECT * FROM public.\"Inventory\" ORDER BY \"PID\" ASC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
      break;
    case '1':
      pool.query('SELECT * FROM public.\"Inventory\" ORDER BY \"PID\" DESC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
      break;
    case '2':
      pool.query('SELECT * FROM public.\"Inventory\" ORDER BY \"Name\" ASC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
      break;
    case '3':
      pool.query('SELECT * FROM public.\"Inventory\" ORDER BY \"Name\" DESC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
      break;
    case '4':
      pool.query('SELECT * FROM public.\"Inventory\" ORDER BY \"ItemType\" ASC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
      break;
    case '5':
      pool.query('SELECT * FROM public.\"Inventory\" ORDER BY \"ItemType\" DESC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
      break;
    case '6':
      pool.query('SELECT * FROM public.\"Inventory\" ORDER BY \"PricePerItem\" ASC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
      break;
    case '7':
      pool.query('SELECT * FROM public.\"Inventory\" ORDER BY \"PricePerItem\" DESC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
      break;
    case '8':
      pool.query('SELECT * FROM public.\"Inventory\" ORDER BY \"Quantity\" ASC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
      break;
    case '9':
      pool.query('SELECT * FROM public.\"Inventory\" ORDER BY \"Quantity\" DESC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
      break;
    case '10':
      pool.query('SELECT * FROM public.\"Inventory\" ORDER BY \"Color\" ASC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
      break;
    case '11':
      pool.query('SELECT * FROM public.\"Inventory\" ORDER BY \"Color\" DESC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
      break;
    case '12':
      pool.query('SELECT * FROM public.\"Inventory\" ORDER BY \"Material\" ASC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
      break;
    case '13':
      pool.query('SELECT * FROM public.\"Inventory\" ORDER BY \"Material\" DESC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
      break;
    default:
      pool.query('SELECT * FROM public.\"Inventory\" ORDER BY \"PID\" ASC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
  }
}

const sortedOrders = (request, response) => {
  const switchVar = request.params.id
  let sql;
  switch(switchVar) {
    case '0':
      sql = "SELECT * FROM public.\"Orders\" ORDER BY \"OID\" ASC"
      break;
    case '1':
      sql = "SELECT * FROM public.\"Orders\" ORDER BY \"OID\" DESC"
      break;
    case '2':
      sql = "SELECT * FROM public.\"Orders\" ORDER BY \"PID\" ASC"
      break;
    case '3':
      sql = "SELECT * FROM public.\"Orders\" ORDER BY \"PID\" DESC"
      break;
    case '4':
      sql = "SELECT * FROM public.\"Orders\" ORDER BY \"Quantity\" ASC"
      break;
    case '5':
      sql = "SELECT * FROM public.\"Orders\" ORDER BY \"Quantity\" DESC"
      break;
    case '6':
      sql = "SELECT * FROM public.\"Orders\" ORDER BY \"CName\" ASC"
      break;
    case '7':
      sql = "SELECT * FROM public.\"Orders\" ORDER BY \"CName\" DESC"
      break;
    case '8':
      sql = "SELECT * FROM public.\"Orders\" ORDER BY \"Date\" ASC"
      break;
    case '9':
      sql = "SELECT * FROM public.\"Orders\" ORDER BY \"Date\" DESC"
      break;
    case '10':
      sql = "SELECT * FROM public.\"Orders\" ORDER BY \"Completed\" ASC"
      break;
    case '11':
      sql = "SELECT * FROM public.\"Orders\" ORDER BY \"Completed\" DESC"
      break;
    default:
      sql = "SELECT * FROM public.\"Orders\" ORDER BY \"OID\" ASC"
  }
  pool.query(sql, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get orders as JSON
// EX: curl.exe '-X', 'GET', 'http://localhost:3000/orders'
const getOrders = (request, response) => {
  pool.query('SELECT * FROM public.\"Orders\" ORDER BY \"OID\" ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Add inventory item
// EX: curl.exe '-X', 'POST', '-d', 'itemtype=Vase&qnt=10&price=99.99&name=Test Vase&color[]=Red&color[]=Black&mat[]=Metal&mat[]=Plastic', 'http://localhost:3000/addInv'
const addInv = (request, response) => {
  const { itemtype, qnt, price, name, color, mat } = request.body
  // Reformat color and mat as arrays here because otherwise it breaks
  const arrClr = color.split(/[\s,]+/)
  const arrMat = mat.split(/[\s,]+/)
  pool.query('SELECT public.\"newInv\"($1, $2, $3, $4, $5, $6)', [itemtype, qnt, price, name, arrClr, arrMat], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Item added to inventory')
  })
}

// Add order
// EX: curl.exe '-X', 'PUT', '-d', 'pid=16&qnt=10&name=John Smith', 'http://localhost:3000/addOrder'
const addOrder = (request, response) => {
  const nowMS = Date.now()
  const date = new Date(nowMS)
  date.toISOString()
  const { pid, qnt, name } = request.body

  pool.query('SELECT public.\"newOrder\"($1, $2, $3, $4)', [pid, qnt, name, date], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Order added')
  })
}

// Update inventory stock
// Mode 0 = directly set quantity, mode 1 = add/subtract from current quantity, mode 2 = increase/decrease quantity by percentage of current value (integer input)
// Mode 0 EX: curl.exe '-X', 'PUT', '-d', 'mode=0&pid=17&qnt=200', 'http://localhost:3000/upInvStock'
// Mode 1 EX: curl.exe '-X', 'PUT', '-d', 'mode=1&pid=17&qnt=-50', 'http://localhost:3000/upInvStock' 
// Mode 2 EX: curl.exe '-X', 'PUT', '-d', 'mode=2&pid=17&qnt=-50', 'http://localhost:3000/upInvStock'
const upInvStock = (request, response) => {
  const { mode, pid, qnt } = request.body
  
  pool.query('SELECT public.\"modStock\"($1, $2, $3)', [mode, pid, qnt], (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).send('Inventory item stock updated')
  })
}

// Update inventory price
// Mode 0 = directly set price, mode 1 = add/subtract from current price, mode 2 = increase/decrease price by percentage of current value (integer input)
// Mode 0 EX: curl.exe '-X', 'PUT', '-d', 'mode=0&pid=17&prc=99.99', 'http://localhost:3000/upInvPrice'
// Mode 1 EX: curl.exe '-X', 'PUT', '-d', 'mode=1&pid=17&prc=50', 'http://localhost:3000/upInvPrice'
// Mode 2 EX: curl.exe '-X', 'PUT', '-d', 'mode=2&pid=17&prc=50', 'http://localhost:3000/upInvPrice'
const upInvPrice = (request, response) => {
  const { mode, pid, prc } = request.body

  pool.query('SELECT public.\"modPrice\"($1, $2, $3)', [mode, pid, prc], (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).send('Inventory item price updated')
  })
}

// Complete order
// EX: curl.exe '-X', 'PUT', '-d', 'oid=10', 'http://localhost:3000/completeOrder'
const completeOrder = (request, response) => {
  const { oid } = request.body
  pool.query('SELECT public.\"completeOrder\"($1)', [oid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Order completed')
  })
}

// Delete order
// EX: curl.exe '-X', 'PUT', '-d', 'oid=10', 'http://localhost:3000/delOrd'
const delOrd = (request, response) => {
  const { oid } = request.body
  pool.query('DELETE FROM public.\"Orders\" WHERE \"OID\" = $1', [oid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Deleted order')
  }) 
}

// Delete inventory item
// EX: curl.exe '-X', 'PUT', '-d', 'pid=16', 'http://localhost:3000/delInv'
const delInv = (request, response) => {
  const { pid } = request.body
  pool.query('SELECT public.\"deleteInv\"($1)', [pid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Deleted inventory item')
  })
}

// Export functions
module.exports = {
    getInventory,
    getOrders,
    addInv,
    addOrder,
    upInvStock,
    upInvPrice,
    completeOrder,
    delOrd,
    delInv,
    sortedInventory,
    sortedOrders,
}