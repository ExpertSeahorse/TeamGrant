//import useSortableData from './SortAlgo'
import React from 'react'

// Create sorted data
const useSortableData = (items, config = null) => {
    // sortConfig remembers the current sort pattern
    const [sortConfig, setSortConfig] = React.useState(config);
    
    // memoize the sorting algo so if the table is rerendered the sort is not recalculated
    const sortedItems = React.useMemo(() => {
      // copy the items arr to maintain the orig
      let sortableItems = [...items];
      // if sortConfig exists:
      if (sortConfig !== null) {
        // sort the table by a's key and b's key and direction. key + direction are set in requestSort
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);
  
    // set the value of the config with input from button 
    const requestSort = key => {
      let direction = 'ascending';
      // if already ascending and previous sort was the same key, swap to decending
      if (
        sortConfig && 
        sortConfig.key === key && 
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      // set SortConfig to key, direction
      setSortConfig({ key, direction });
    }
  
    return { items: sortedItems, requestSort, sortConfig  };
}
// creates a row in the Catalog table, assuming the catalog is passed as an Object.entities(dict)
/* function CatalogItem(p) {
  console.log(p)
  return (
      <tr key={p[0]}>
        <td>{p[0]}</td>
        <td>{p[1].itemType}</td>
        <td>{p[1].color}</td>
      </tr>
  )
} */

//input props: array
const CatalogTable = (props) => {
    // get data + sort it w/ above process
    const { items, requestSort, sortConfig } = useSortableData(props.products);

    // for styling later
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
        <table>
            <caption>Catalog</caption>
            <thead>
                <tr key={"Catalog Header"}>
                    <th>
                        {/* Table Headers */}
                        ID
                        <button
                        type="button" 
                        onClick={() => requestSort('id')}
                        className={getClassNamesFor('id')}>
                        {getClassNamesFor('id')}
                        </button>
                    </th>
                    <th>
                        Item Type
                        <button 
                        type="button" 
                        onClick={() => requestSort('itemType')}
                        className={getClassNamesFor('itemType')}>
                        {getClassNamesFor('itemType')}
                        </button>
                    </th>
                    <th>
                        Color
                        <button 
                        type="button" 
                        onClick={() => requestSort('color')}
                        className={getClassNamesFor('color')}>
                        {getClassNamesFor('color')}
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>{ // Loop over the sorted list and make a row in the Table for each item
              items.map(p => (
                <tr key={p[0]}>
                  <td>{p[0]}</td>
                  <td>{p[1].itemType}</td>
                  <td>{p[1].color}</td>
                </tr>
              ))
            }
            </tbody>
        </table>
    );
}

export default function Catalog() {
  const catalog = require('./data/catalog.json')
  console.log(Object.entries(catalog))

  // Print the html representation of the Catalog JSON
  // The Catalog is a lookup table for the Inventory. To add an item to the inventory, just input the ID + Qty and the properties will be populated

  return (
    <div className="App">
      <CatalogTable
        products={Object.entries(catalog)}
      />
    </div>
  );
}