import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

const Filter = ({onChange, value}) => <div>find countries <input value={value} onChange={onChange}/></div>;

const Languages = ({languages}) => {
  return (
    <ul>
      {languages.map(l => <li>{l.name}</li>)}
    </ul>
  )
}

const Country = ({country}) => {
  console.log(country)
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>Languages</h3>
      <Languages languages={country.languages} />
      <img src={country.flag} alt="{country.denonym} flag" width="100px" height="auto"/>
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
      {countriesToShow.map(c => <div>{c.name}</div>)}
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
