import React, {Component} from 'react';
import Titles from './components/titles';
import Weather from './components/weather';
import './App.css';
import './.env'


console.log(process.env.REACT_APP_API_KEY)


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      descrption: undefined,
      error: undefined,
      hairstatus:undefined,
    }
  }
   

  hairDay=humidity=>{
    if (humidity <= 50) {
    return "No worries"
    }

    else if (humidity >= 51 && humidity <=74){
       return "Iffy"
      
    }

    else if (humidity >= 75 && humidity <=95){
      return "Challenging"
    }
        

    else if (humidity >= 96 && humidity <=100) {
    return "Dangerous- consider a hat or ponytail"
      }
    }
  
  
  getWeather = async (event) => {
    event.preventDefault()
    const city = this.state.city
    const country = this.state.country
   
    
    
      // const webpack = require('webpack');
    // const myEnv = require('dotenv').config();


    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&apiid=524901&APPID=${API_KEY}`);
    const data = await api_call.json();
    var har = this.hairDay(data.main.humidity)
    if (city && country){
      this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      wind: data.wind.speed,
      hairstatus : har,
      error: ""
    });

  } else {
    this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      wind: undefined,
      error: "Please enter a value."

  });

    }
}
  
  
  handleChange =(event)=>{
    this.setState({[event.target.name]: event.target.value})
  }

  newMethod() {
    return process.env.REACT_APP_API_KEY;
  }

  render () {
    // console.log(this.state)
    return (
        <div>
          <Titles />
          <div>
          <form onSubmit = {this.getWeather}>
               <center><input onChange={this.handleChange} type = "text" name = "city" placeholder = "City..."/>
               <input onChange ={this.handleChange} type = "text" name = "country" placeholder = "Country..."/>
               
               <button type ='submit'>Get Current Weather</button>
               </center>
           </form>
           </div>

          <Weather temperature={this.state.temperature}
                   city={this.state.city} 
                   country={this.state.country}
                   humidity={this.state.humidity}
                   description={this.state.description}
                   wind={this.state.wind}
                   hairDay={this.state.hairstatus}
                   error={this.state.error}   />

        </div>

    );
    }
};



export default App;