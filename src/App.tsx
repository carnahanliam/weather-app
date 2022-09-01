import { useState, useEffect, FC, MouseEvent } from 'react'
import './App.less'
import { getWeather } from './services/weatherService'
import CityToggle from './components/CityToggle'
import Panel from './components/Panel'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import Tile from './components/Tile'

const cities: string[] = ['vancouver', 'antarctica', 'bangkok']
export type City = {
  temp: number
  weather: string
  icon: string
  forecast: Array<{
    date: string
    temp: number
    weather: string
    icon: string
  }>
} | null

type CitiesWeather = {
  [key: string]: City | null
}

let initialState: CitiesWeather = {}
cities.forEach((city) => {
  initialState[city] = null
})

const App: FC = () => {
  const [weather, setWeather] = useState<CitiesWeather>(initialState)
  const [viewCity, setViewCity] = useState<string>(cities[0])

  const handleSwitchCity = (event: MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = event.currentTarget
    setViewCity(button.value)
  }

  // LIFECYCLE

  useEffect(() => {
    const fetchWeatherData = async () => {
      const weatherObj: City = await getWeather(viewCity)
      const updatedWeather: CitiesWeather = {
        ...weather,
        [viewCity]: weatherObj,
      }
      setWeather(updatedWeather)
    }

    fetchWeatherData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewCity])

  return (
    <div className="container">
      <div className="content">
        <CityToggle
          cities={cities}
          handleSwitchCity={handleSwitchCity}
          viewCity={viewCity}
        />

        <Panel>
          <Tile size="full" row="top-row">
            {weather[viewCity] && (
              <CurrentWeather cityWeather={weather[viewCity]} />
            )}
          </Tile>
          <Tile size="small" row="bottom-row">
            {weather[viewCity] &&
              weather[viewCity]!.forecast.map((day) => (
                <Forecast forecastWeather={day} key={day.date} />
              ))}
          </Tile>
        </Panel>
      </div>
    </div>
  )
}

export default App
