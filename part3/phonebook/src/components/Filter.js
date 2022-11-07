const Filter = ({filterValue,handleFilterChange}) => {
    return (
      <div>
        filter shown with <input id='filterValue' value={filterValue} onChange={handleFilterChange} />
      </div>
    )
  }
  export default Filter