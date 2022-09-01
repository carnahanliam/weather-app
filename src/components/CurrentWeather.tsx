import { FC } from 'react'
import WeatherSVG from '../assets/icons'
import { City } from '../App'

interface Props {
  cityWeather: City
}

const CurrentWeather: FC<Props> = ({ cityWeather }) => (
  <div className="weather-content-container">
    <h4>Today</h4>
    <div className="current-weather-container">
      <div
        className={`current weather-icon-container ${
          cityWeather!.icon + '-background'
        }`}
      >
        <img
          className="icon"
          src={WeatherSVG[cityWeather!.icon]}
          alt={cityWeather!.icon}
        />
      </div>
      <div className="current-weather-subcontainer">
        <h1 className="temperature">{Math.round(cityWeather!.temp)}&deg;</h1>
        <h4>{cityWeather!.weather}</h4>
      </div>
    </div>
  </div>
)

export default CurrentWeather
