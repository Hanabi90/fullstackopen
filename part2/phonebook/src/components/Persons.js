const Persons = ({personsCopy}) => {
    return (
      <div>
        <ul>
          {personsCopy.map((item)=>{
            return <li key={item.name}>{item.name}  {item.number}</li>
          })}
        </ul>
      </div>
    )
  }
  export default Persons