/* import React from 'react'

// Create sorted data
export default (items, config = null) => {
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
} */