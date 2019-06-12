import React from 'react';
import WeatherDetailScreen from './WeatherDetailScreen';

const Icon = ({iconId}) => (

  <i className = "weather-icon">
  <img src={`http://openweathermap.org/img/w/${iconId}.png`}/>
</i>
);

export default Icon;
