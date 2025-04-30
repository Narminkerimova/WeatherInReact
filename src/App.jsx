import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [errorMessage, seterrorMessage] = useState('');

  async function handleSearch(e) {
    e.preventDefault();   // refreshin qarşısını alır

    try {
      const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=7b1eaf6efd804a44b87101529222212&q=${city}&aqi=no`);

      if (!res.ok) {
        throw new Error('City not found!');
      }

      const data = await res.json();
      setWeatherData(data);
      seterrorMessage('');  //eger duzduse error cixmasin

    } catch (error) {
      seterrorMessage(error.message); 
      console.log(error.message);  
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          id="inp"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Forecast</button>
      </form>

      {errorMessage && <p className='error-message'>{errorMessage}</p>}

      {weatherData && (
        <>
          <span className="country_name">{weatherData.location.name}</span>
          <img src={weatherData.current.condition.icon} alt="icon" />
          <span className="country_name">{weatherData.current.condition.text}</span>
          <p>{weatherData.current.temp_c}° C</p>
          <p>{weatherData.current.temp_f}° F</p>
          <div className="bottom_info">
            <p>Wind {weatherData.current.wind_mph} MPH</p>
            <p>Visibility {weatherData.current.vis_miles} miles</p>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
