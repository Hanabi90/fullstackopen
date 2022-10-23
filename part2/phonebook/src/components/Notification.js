const Persons = ({contentObj}) => {
    const {content,type} = {...contentObj}
    if(contentObj){
        return (
            <div className={type}>
              <h2>{content}</h2>
            </div>
        )
    }
  }
  export default Persons