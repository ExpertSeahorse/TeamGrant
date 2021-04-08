import React from 'react'
import Invoice from "./Invoice";

// returns Invoice table
export default function InvoiceList( props ) {
  return (
    <table>
    <tr>
      <th>Invoice No.</th>
      <th>Customer Name</th>
      <th>Product ID</th>
      <th>Status</th>
      <th>Quantity</th>
    </tr>
    {props.invoices.map(invoiceData => { return <Invoice key={invoiceData.id} data={invoiceData} handleStatusChange={props.handleStatusChange}/> })}
    </table>
  )
}



// Create sorted data
const useSortableData = (items, config = null) => {
  // InvoiceSortConfig remembers the current sort pattern
  const [InvoiceSortConfig, setInvoiceSortConfig] = React.useState(config);
  
  // memoize the sorting algo so if the table is rerendered the sort is not recalculated
  const sortedItems = React.useMemo(() => {
    // copy the items arr to maintain the orig
    let sortableItems = [...items];
    // if InvoiceSortConfig exists:
    if (InvoiceSortConfig !== null) {
      // sort the table by a's key and b's key and direction. key + direction are set in requestSort
      sortableItems.sort((a, b) => {
        if (a[InvoiceSortConfig.key] < b[InvoiceSortConfig.key]) {
          return InvoiceSortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[InvoiceSortConfig.key] > b[InvoiceSortConfig.key]) {
          return InvoiceSortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, InvoiceSortConfig]);

  // set the value of the config with input from button 
  const requestSort = key => {
    let direction = 'ascending';
    // if already ascending and previous sort was the same key, swap to decending
    if (
      InvoiceSortConfig && 
      InvoiceSortConfig.key === key && 
      InvoiceSortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    // set InvoiceSortConfig to key, direction
    setInvoiceSortConfig({ key, direction });
  }

  return { items: sortedItems, requestSort, InvoiceSortConfig  };
}

//input props: array
const CatalogTable = (props) => {
  // get data + sort it w/ above process
  const { items, requestSort, InvoiceSortConfig } = useSortableData(props.products);

  // for styling later
  const getClassNamesFor = (name) => {
      if (!InvoiceSortConfig) {
          return;
      }
      return InvoiceSortConfig.key === name ? InvoiceSortConfig.direction : undefined;
  };

  return (
      <table>
          <caption>Catalog</caption>
          <thead>
              <tr key={"Catalog Header"}>
                  <th>
                      {/* Table Headers */}
                      Invoice No.
                      <button
                        type="button" 
                        onClick={() => requestSort('id')}
                        className={getClassNamesFor('id')}>
                        {getClassNamesFor('id')}
                      </button>
                  </th>
                  <th>
                    Customer Name
                      <button 
                        type="button" 
                        onClick={() => requestSort('itemType')}
                        className={getClassNamesFor('itemType')}>
                        {getClassNamesFor('itemType')}
                      </button>
                  </th>
                  <th>
                    Product ID
                      <button 
                        type="button" 
                        onClick={() => requestSort('color')}
                        className={getClassNamesFor('color')}>
                        {getClassNamesFor('color')}
                      </button>
                  </th>
                  <th>
                    Status
                      <button 
                        type="button" 
                        onClick={() => requestSort('itemType')}
                        className={getClassNamesFor('itemType')}>
                        {getClassNamesFor('itemType')}
                      </button>
                  </th>
                  <th>
                    Quantity
                      <button 
                        type="button" 
                        onClick={() => requestSort('color')}
                        className={getClassNamesFor('color')}>
                        {getClassNamesFor('color')}
                      </button>
                  </th>
              </tr>
          </thead>
          <tbody>
            {props.invoices.map(invoiceData => { return <Invoice key={invoiceData.id} data={invoiceData} handleStatusChange={props.handleStatusChange}/> })}
          </tbody>
      </table>
  );
}
