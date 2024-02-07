import './App.css';
import { getCityNameFromCoords } from './osmCaller';
import { useState } from 'react';

const getUserCoordinates = () => {return new Promise((res, rej) => {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      res([latitude, longitude])
    }, 
    () => rej("Location data denied"));
  } else {
    rej("Location data not avilable.");
  }
})};

const App = () => {

  const [city, updateCity] = useState("")

  const getLocationAndUpdate = async () => {
    // get location
    let latitude, longitude;
    let succeeded = false;
    try {
      [latitude, longitude] = await getUserCoordinates();
      succeeded = true;
    } catch (e) {
      console.log("ERROR!")
      console.log(e)
    }

    if (succeeded) {
      // const name = await getCityNameFromCoords(34.230848519753856, -92.0268550259964)
      const name = await getCityNameFromCoords(latitude + 1, longitude)
      console.log(`City found: ${name}`)
      updateCity(name)
    }
  }


  return (
    <div className="App">
      <div>Where are you?</div>
      <button className='Main-Button' onClick={getLocationAndUpdate}>Click me</button>
      <hr></hr>
      {
        city === "" ? <div>I don't know where you are</div> : <div>You are in {city}!</div>
      }
    </div>
  );
}

export default App;
