import useSortableData from './SortAlgo'

// creates a row in the Catalog table, assuming the catalog is passed as an Object.entities(dict)
function CatalogItem(props) {
  return (
      <tr key={props.value[0]}>
        <td>{props.value[0]}</td>
        <td>{props.value[1].itemType}</td>
        <td>{props.value[1].color}</td>
      </tr>
  )
}

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
            <tbody>{ 
                // Loop over the sorted list and make a row in the Table for each item
                items.map(p => <CatalogItem value={p}/> )
            }
            </tbody>
        </table>
    );
}

export default function Catalog() {
  const catalog = require('./data/catalog.json')
  //console.log(Object.entries(catalog))

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