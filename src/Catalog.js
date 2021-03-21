import React from 'react'
//import { render } from 'react-dom'
import CatalogItem from './CatalogItem'

// set types of sort
const sortTypes = {
  itemTypeUp: {
    class: 'itemTypeUp',   // function name
    fn: (a,b) =>{        // function equation
      if (a.itemType.toUpperCase() < b.itemType.toUpperCase()){
        return 1
      }
      else if (a.id.toUpperCase() < b.id.toUpperCase()){
        return -1
      }
      else
        return 0
    }
  },
  itemTypeDown: {
    class: 'itemTypeDown',
    fn: (a,b) =>{        // function equation
      if (a.itemType.toUpperCase() < b.itemType.toUpperCase()){
        return -1
      }
      else if (a.id.toUpperCase() < b.id.toUpperCase()){
        return 1
      }
      else
        return 0
    }
  },
  default: {
    class: 'sort',
    fn: (a,b) => a.id.toUpperCase() < b.id.toUpperCase()
  }
};

//const catalog = require('./data/catalog.json')
//console.log(Object.keys(catalog))

class Table extends React.Component{
  // set default state
  state = {
    currentSort : 'default'
  };

  // Switch the sort of the table based on the current sort
  onSortChange = () => {
		const { currentSort } = this.state;
		let nextSort;
    
    switch(currentSort){
      case 'itemTypeUp':
        nextSort = 'itemTypeDown'
        break;
      case 'itemTypeDown':
        nextSort = 'itemTypeUp'
        break;
      default:
        nextSort = 'itemTypeDown'
    }

		this.setState({
			currentSort: nextSort
		});
	};

  render(){
    //const { data } = Object.keys(catalog);
    const catalog = require('./data/catalog.json')
    const data = Object(catalog)
    const { currentSort } = this.state;
    console.log(sortTypes[currentSort].fn)
    console.log(catalog)
    console.log([...data].sort(sortTypes[currentSort].fn))
    return (
      // make sure data populates
      data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th onClick={this.onSortChange}>ID</th>
              <th onClick={this.onSortChange}>Item Type</th>
              <th onClick={this.onSortChange}>Color</th>
            </tr>
          </thead>
          <tbody> {
              // Sort the keys in the catalog and loop over the catalog object and match each entry to a row in the Table
              [...data].sort(sortTypes[currentSort].fn).map(p => (
                <tr>
                  <td>{p.id}</td>
                  <td>{p.itemType}</td>
                  <td>{p.color}</td>
                </tr>
              ))}
          </tbody>
      </table>
      )
    );
  }
}


function Catalog() {
  const catalog = require('./data/catalog.json')
  console.log(Object.keys(catalog))

  // Print the html representation of the Catalog JSON
  // The Catalog is a lookup table for the Inventory. To add an item to the inventory, just input the ID + Qty and the properties will be populated

  
  return catalog;
}
export {
  Table,
  Catalog
}