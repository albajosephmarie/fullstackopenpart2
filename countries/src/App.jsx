import { useState, useEffect } from "react";
import axios from "axios";

// Example usage in your code
const openWeatherMapApiKey = import.meta.env.VITE_OW_KEY;

// Use openWeatherMapApiKey as needed in your application
console.log("key", openWeatherMapApiKey);

const Weather = (props) => {
  const { lat, lng } = props;
  const [weather, setWeatcher] = useState();
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=3f71f8fa16151aacc70f3f5fa587f428`;
  console.log("url", url);
  useEffect(() => {
    console.log("weather");
    axios.get(url).then((response) => {
      setWeatcher(response.data);
      console.log("weatcher", weather);
    });
  }, []);
  if (weather) {
    const description = weather.weather[0].description;
    const iconCode = weather.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;    
    return (
      <>
        <div>
          temperature {Math.round((weather.main.temp - 273.15) * 100) / 100} Celcius
        </div>
        <img src={iconUrl} alt={description} />
        <div>
          wind {weather.wind.speed} m/s
        </div>
      </>
    );
  }
};

const Country = (props) => {
  const { country } = props;
  const languages = Object.values(country.languages);
  console.log(country);
  useEffect(() => {
    axios.get();
  }, []);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h2>languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weatcher in {country.capital[0]}</h2>
      <Weather lat={country.latlng[0]} lng={country.latlng[1]} />
    </div>
  );
};

const Display = (props) => {
  const { countries, clickCountry, setClickCountry } = props;

  const handleClick = (i) => {
    setClickCountry(countries[i]);
  };

  if (clickCountry) {
    return <Country country={clickCountry} />;
  } else if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length > 1) {
    return (
      <ul>
        {countries.map((country, i) => (
          <li key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => handleClick(i)}>show</button>
          </li>
        ))}
      </ul>
    );
  } else if (countries.length == 1) {
    return <Country country={countries[0]} />;
  }
};

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [clickCountry, setClickCountry] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        // const countries = .map((country) => country.name.common);
        setCountries(response.data);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setClickCountry("");
  };

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  console.log(countriesToShow);

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      {filter && (
        <Display
          countries={countriesToShow}
          clickCountry={clickCountry}
          setClickCountry={setClickCountry}
        />
      )}
    </div>
  );
}

export default App;
