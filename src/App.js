
import React, {useState} from "react";  // Importing the React library and the useState hook
import axios from 'axios' // Importing the axios library for making API requests

function App() {
  const[data,setData]= useState({}) // Initializing state for the weather data
  const [location, setLocation] = useState('')  // Initializing state for the location search input

  // Building the API URL with the user's search query
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=8b3c5b5fd2141cc22c662dc697897c2f`;

  
  // Function to handle the location search when the user presses the Enter key
  const searchLocation = (event)=>{
    if(event.key==='Enter'){
      axios.get(url).then((response) =>{
        setData(response.data)  // Updating the weather data state with the API response data
      })
      setLocation('') // Resetting the location search input
    }
  
  }

  return (
    <div className="app" >
      <div className="search">
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter location'
        type='text'/>

      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>  {/*Displaying the location name from the weather data state*/}
          </div>
          <div className="temp">
            {data.main ? <h1> {data.main.temp.toFixed()} °C</h1> : null} {/* Displaying the temperature from the weather data state, if available */}
            
          </div>
          <div className="description">
            {data.weather ? <p> {data.weather[0].main}</p> : null}  {/* Displaying the weather description from the weather data state, if available */}
            
          </div>
        </div>

        {/*Hides the bottom part of the page till a value is entered into the city name field */}
        {data.name !== undefined &&

            <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold"> {data.main.feels_like.toFixed()} °C</p> : null}  {/* Displaying the "feels like" temperature from the weather data state, if available*/}
              
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold"> {data.main.humidity} %</p> : null}  {/* Displaying the humidity from the weather data state, if available*/}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold"> {data.wind.speed} MPH</p> : null} {/* Displaying the wind speed from the weather data state, if available */}

              <p >Wind Speed</p>
            </div>
            </div>
        
        }
      </div>
    </div>
  );
}

export default App;


