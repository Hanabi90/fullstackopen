import Weather from "./Weather";
const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((lang) => {
          return <li key={lang}>{lang}</li>;
        })}
      </ul>
      <p>
        <img alt="falg" src={country.flags.png}></img>
      </p>
      <Weather country={country} />
    </div>
  );
};
export default Country;
