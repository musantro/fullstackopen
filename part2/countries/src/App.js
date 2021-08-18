import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

const Filter = ({onChange, value}) => <div>find countries <input value={value} onChange={onChange}/></div>;

const Languages = ({languages}) => {
  return (
    <ul>
      {languages.map(l => <li>{l.name}</li>)}
    </ul>
  )
}

const Weather = ({capital}) => {
  const [weather, setWeather] = useState({
    weather: {weather: [{icon: ''}]},
    main: {temp: ''},
    wind: {speed: '', deg: ''}
  })
  const [weatherIcon, setWeatherIcon] = useState('')
  const API_KEY = process.env.REACT_APP_API_KEY

  const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`

  const kelvinToCelsius = (kelvin) => kelvin - 273.15

  useEffect(() => {
    const promise = axios.get(apiCall);
    const eventHandler = response => {
      const data = response.data;
      setWeather(data)
      const weatherIconURL = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      setWeatherIcon(weatherIconURL)
    }
    promise.then(eventHandler)
  }, [])
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <img src={weatherIcon} alt=""/>
      <div><strong>temperature: </strong> {kelvinToCelsius(weather.main.temp)}</div>
      <div><strong>wind: </strong> {weather.wind.speed} direction {weather.wind.deg}</div>
    </div>
  )
}

const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>Languages</h3>
      <Languages languages={country.languages}/>
      <img src={country.flag} alt="{country.denonym} flag" width="100px" height="auto"/>
      <Weather capital={country.capital}/>
    </div>
  )
}


const CountrySummary = props => {
  const [show, setShow] = useState(false)

  return (
    <div>
      {props.country.name}
      <button onClick={() => setShow(!show)}>
        {show ? "close" : "show"}
      </button>
      {show && <Country country={props.country}/>}
    </div>
  )
}

const Countries = ({countriesToShow}) => {
  if (countriesToShow.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  } else if (countriesToShow.length === 1) {
    const [head] = countriesToShow
    return <Country country={head}/>
  }
  return (
    <div>
      {countriesToShow.map(c =>
        <CountrySummary country={c}/>)
      }
    </div>
  );
}

const App = () => {
  const [queryName, setQueryName] = useState('')
  const [countries, setCountries] = useState([])
  const handleQueryChange = (event) => {
    setQueryName(event.target.value)
  }

  useEffect(() => {
    const promise = axios.get('https://restcountries.eu/rest/v2/all');
    const eventHandler = response => {
      setCountries(response.data)
    }
    promise.then(eventHandler)
  }, [])

  const countriesToShow = countries.filter(p => p.name.toLowerCase().includes(queryName.toLowerCase()))

  return (
    <div>
      <Filter value={queryName} onChange={handleQueryChange}/>
      <Countries countriesToShow={countriesToShow}/>
    </div>
  );
}

export default App;
