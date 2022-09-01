import { FC } from 'react'
import WeatherSVG from '../assets/icons'

interface Props {
  forecastWeather: {
    date: string
    temp: number
    weather: string
    icon: string
  }
}

const Forecast: FC<Props> = ({ forecastWeather }) => (
  <div className="weather-content-container">
    <h6>{forecastWeather.date}</h6>
    <div
      className={`forecast weather-icon-container ${
        forecastWeather.icon + '-background'
      }`}
    >
      <img
        className="icon"
        src={WeatherSVG[forecastWeather.icon]}
        alt={forecastWeather.icon}
      />
    </div>
    <h5 className="temperature">{Math.round(forecastWeather.temp)}&deg;</h5>
  </div>
)

export default Forecast
