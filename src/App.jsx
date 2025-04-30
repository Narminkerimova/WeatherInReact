import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null); //cunki api-dan gelen melumatlar birbasa obyekterdir
  const [city, setCity] = useState('');

  //eger ilkden hansisa olkenin melumatinin gorunmeyini isteyirikse, yaza bilerdik. Bunu ilk addimda yazmisdim
  // async function getAllData() {
  //   const res = await fetch("https://api.weatherapi.com/v1/current.json?key=7b1eaf6efd804a44b87101529222212&q=spain&aqi=no");
  //   const data = await res.json();
  //   setWeatherData(data);
  // } 

  // useEffect(() => {
  //   getAllData();
  // }, []);

  async function handleSearch(e) {
    e.preventDefault();   //refreshin qarisis alinir
    if (!city) return;    //seher adi sehv yazilmasin deye

    try {
      const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=7b1eaf6efd804a44b87101529222212&q=${city}&aqi=no`);   //api-in bu hissesinde seher deyisir

      const data = await res.json();
      setWeatherData(data);

    } catch (error) {
      console.log(error);

    }
  }


  return (
    <div className='container'>
      <form onSubmit={handleSearch}>
        <input type="text" id="inp" value={city}
          onChange={(e) => setCity(e.target.value)} />
        <button type="submit">Get ForeCast</button>
      </form>

      {weatherData && (
        <>
          <span className='country_name'>{weatherData.location.name}</span>
          <img src={weatherData.current.condition.icon} alt="icon" />
          <span className='country_name'>{weatherData.current.condition.text}</span>
          <p>{weatherData.current.temp_c}° C</p>
          <p>{weatherData.current.temp_f}° F</p>
          <div className='bottom_info'>
            <p>Wind {weatherData.current.wind_mph}MPH</p>
            <p>Visibility {weatherData.current.vis_miles}M</p>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
