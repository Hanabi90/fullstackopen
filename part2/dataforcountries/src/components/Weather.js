import axios from "axios";
import { useState,useEffect } from "react";

const Weather = ({country}) => {
    const apikey = process.env.REACT_APP_NOT_SECRET_CODE
    const loc = country.capital[0]
    const [weather, setWeather] = useState();
    useEffect(()=>{
        axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?key=${apikey}`).then((res)=>{
            console.log(res.data);
            setWeather(res.data)
        })
    },[loc,apikey])
    if(weather){
        return (
            <div>
            <h2>Weather in  {weather.address}</h2>
            <p>temperature  {parseInt((weather.currentConditions.temp-32)/1.8)} Celcius</p>
            <p>conditions  {weather.currentConditions.conditions}</p>
            <p><img width={100} alt="" src={require(`../icons/${weather.currentConditions.icon}.svg`)}></img></p>
            <p>windspeed    {weather.currentConditions.windspeed} m/s</p>
            </div>
        )
    }
};
export default Weather;
