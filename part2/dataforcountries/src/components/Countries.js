import Country from "./Country";
const Countries = ({ countriesCopy,setCountriesCopy,getWeather}) => {
  const len = countriesCopy.length
  const country = countriesCopy.length&&countriesCopy[0].name.common!=='wait...'?countriesCopy[0]:null
  const showCountry = function({item,index}) {
    console.log('showcountry',index,item);
    setCountriesCopy([item])
  }
  if (len>10) {
    return <div>Too many matches,specify another filter</div>;
  } else if(len===1&&country){
    return (
      <Country country={country}/>
    );
  }else{
    return (
      <div>
        <ul>
          {countriesCopy.map((item,index) => {
            return <li key={item.name.common}>{item.name.common} <button onClick={(e)=>{
              showCountry({e,index,item})
            }}>show</button></li>;
          })}
        </ul>
      </div>
    );
  }
};
export default Countries;
