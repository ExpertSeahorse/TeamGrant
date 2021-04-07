//import useSortableData from './SortAlgo'
import React from 'react'

// Create sorted data
const useSortableData = (items, config = null) => {
    // CatalogSortConfig remembers the current sort pattern
    const [CatalogSortConfig, setCatalogSortConfig] = React.useState(config);
    
    // memoize the sorting algo so if the table is rerendered the sort is not recalculated
    const sortedItems = React.useMemo(() => {
      // copy the items arr to maintain the orig
      let sortableItems = [...items];
      // if CatalogSortConfig exists:
      if (CatalogSortConfig !== null) {
        // sort the table by a's key and b's key and direction. key + direction are set in requestSort
        sortableItems.sort((a, b) => {
          if (a[CatalogSortConfig.key] < b[CatalogSortConfig.key]) {
            return CatalogSortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[CatalogSortConfig.key] > b[CatalogSortConfig.key]) {
            return CatalogSortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, CatalogSortConfig]);
  
    // set the value of the config with input from button 
    const requestSort = key => {
      let direction = 'ascending';
      // if already ascending and previous sort was the same key, swap to decending
      if (
        CatalogSortConfig && 
        CatalogSortConfig.key === key && 
        CatalogSortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      // set CatalogSortConfig to key, direction
      setCatalogSortConfig({ key, direction });
    }
  
    return { items: sortedItems, requestSort, CatalogSortConfig  };
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
    const { items, requestSort, CatalogSortConfig } = useSortableData(props.products);

    // for styling later
    const getClassNamesFor = (name) => {
        if (!CatalogSortConfig) {
            return;
        }
        return CatalogSortConfig.key === name ? CatalogSortConfig.direction : undefined;
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
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.itemType}</td>
                  <td>{p.color}</td>
                </tr>
              ))
            }
            </tbody>
        </table>
    );
}

// Print the html representation of the Catalog JSON
// The Catalog is a lookup table for the Inventory. To add an item to the inventory, just input the ID + Qty and the properties will be populated
export default function Catalog( props ) {
  // Convert catalog object into the style:
  // {id:xxx, itemType:xxx, color:xxx}
  const catalog = Object.entries(props.catalog)
  console.log(catalog)
  let prods = []
  catalog.forEach(p => {
    prods.push({
      id: p[0],
      itemType: p[1].itemType,
      color: p[1].color
    })
  })

  console.log(prods)

  return (
    <div className="App">
      <CatalogTable
        products={prods}
      />
    </div>
  );
}