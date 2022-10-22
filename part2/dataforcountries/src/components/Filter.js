const Filter = ({filterValue,handleFilterChange}) => {
    return (
      <div>
        Find countries <input id='filterValue' value={filterValue} onChange={handleFilterChange} />
      </div>
    )
  }
  export default Filter