var format = require('pg-format')
const { Pool, Client } = require('pg')

const user = "postgres"
const host = "localhost"
const database = 'CEN4020 Final Project'
const password = '123'
const port = 5432

const r = printQuery('SELECT * FROM public.\"Inventory\"')
r.then(function(result){
    console.table(result.rows)
})

export async function printQuery(q){
    const client = new Client({
        user: user,
        host: host,
        database: database,
        password: password,
        port: port,
    })
    try {
        await client.connect()
        const results = await client.query(q)
        return results
        //console.log(results.rows)
    }
    catch (ex) {
        console.log(`Something wrong happened ${ex}`)
    }
    finally {
        await client.end()
    }
}

async function printInventory() {
    const client = new Client({
        user: user,
        host: host,
        database: database,
        password: password,
        port: port,
    })
    try {
        await client.connect()
        const results = await client.query(sql)
        console.table(results.rows)
    }
    catch (ex) {
        console.log(`Something wrong happened ${ex}`)
    }
    finally {
        await client.end()
    }
}

function printOrder() {
    const client = new Client({
        user: user,
        host: host,
        database: database,
        password: password,
        port: port,
    })
    try {
        client.connect()
        const results = client.query('SELECT * FROM public.\"Orders\"')
        query.on("row", function(row,result){
            result.addRow(row);    
        });
        //console.table(results.rows)
        return result
    }
    catch (ex) {
        console.log(`Something wrong happened ${ex}`)
    }
    finally {
        client.end()
    }
}

async function addInventory() {
    const client = new Client({
        user: user,
        host: host,
        database: database,
        password: password,
        port: port,
    })
    try {
        await client.connect()
        const results1 = await client.query('SELECT public.\"newOrder\"(\'1\', \'20\', \'Tom Jones\', \'4-13-2021\')')
        console.log(results1.rows)
        const results = await client.query('SELECT * FROM public.\"Orders\"')
        console.table(results.rows)
    }
    catch (ex) {
        console.log(`Something wrong happened ${ex}`)
    }
    finally {
        await client.end()
    }
}

async function completeOrder() {
    const client = new Client({
        user: user,
        host: host,
        database: database,
        password: password,
        port: port,
    })
    try {
        await client.connect()
        var results = await client.query('SELECT public.\"completeOrder\"(\'9\')')
        console.log(results.rows)
        results = await client.query('SELECT * FROM public.\"Orders\"')
        console.table(results.rows)
    }
    catch (ex) {
        console.log(`Something wrong happened ${ex}`)
    }
    finally {
        await client.end()
    }
}

async function ord(a) {
    const client = new Client({
        user: user,
        host: host,
        database: database,
        password: password,
        port: port,
    })
    const loginv = format('SELECT %I, %I, %I, %I, %I, %I, %I FROM public.\"Inventory\" WHERE \"PID\" = %L', 'PID', 'ItemType', 'Quantity', 'PricePerItem', 'Name', 'Color', 'Material', a)
    console.log(loginv)
    try {
        await client.connect()
        const results = await client.query(loginv)
        console.table(results.rows)
    }
    catch (ex) {
        console.log(`Something wrong happened ${ex}`)
    }
    finally {
        await client.end()
    }
}