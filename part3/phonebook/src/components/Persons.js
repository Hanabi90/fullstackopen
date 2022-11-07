import nodeServices from '../services/node'
const Persons = ({personsCopy,setPersonsCopy,setPersons,persons,handleContentObj}) => {
    const removeNode = (id)=>{
      nodeServices.remove(id).then((res)=>{
        setPersonsCopy(personsCopy.filter((i)=>i.id!==id))
        setPersons(persons.filter((i)=>i.id!==id))
        handleContentObj({content:`Information of ${persons.find((i)=>i.id===id).name} has been deleted from serve`,type:'success'})
      }).catch(()=>{
        handleContentObj({content:`Information of ${persons.find((i)=>i.id===id).name} has already been removed from server`,type:'error'})
      })
    }
    return (
      <div>
        <ul>
          {personsCopy.map((item)=>{
            return <li key={item.name}>{item.name}  {item.number} <button onClick={()=>{
              if(window.confirm(`Delete ${item.name}?`)){
                removeNode(item.id)
              }
            }}>delete</button></li>
          })}
        </ul>
      </div>
    )
  }
  export default Persons