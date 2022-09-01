import axios, { AxiosError } from 'axios'
import { getDayOfWeek } from '../utils/helperFunctions'

// weather icon to use based on weather id returned from API
const weatherIcons: { [key: string]: string } = {
  2: 'IconLightning',
  3: 'IconRain',
  5: 'IconRain',
  6: 'IconSnow',
  7: 'IconSmog',
  8: 'IconCloud',
  800: 'IconSun',
}

interface CurrentWeatherRes {
  weather: Array<{
    id: number
    main: string
  }>
  main: {
    temp: number
  }
}

type ForecastRes = {
  list: Array<{
    temp: {
      day: number
    }
    weather: Array<{
      id: number
      main: string
    }>
  }>
}

const getWeather = async (city: string) => {
  try {
    const data = await Promise.all([
      // current weather
      axios
        .get<CurrentWeatherRes>(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`
        )
        .then((res) => res.data as CurrentWeatherRes),
      // 4-day forecast
      axios
        .get<ForecastRes>(
          `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=4&APPID=${process.env.REACT_APP_API_KEY}&units=metric`
        )
        .then((res) => res.data as ForecastRes),
    ])

    const forecast = data[1].list.map((day, index) => {
      let date = new Date()
      date.setDate(date.getDate() + index + 1)

      // convert forecast weather id to string so we can index first digit
      const forecastId = String(day.weather[0].id)

      return {
        date: getDayOfWeek(date),
        temp: day.temp.day,
        weather: day.weather[0].main,
        icon:
          forecastId === '800'
            ? weatherIcons[forecastId]
            : weatherIcons[forecastId.charAt(0)],
        // weather id 800 indicates clear sky, while all other 8xx patterns indicate clouds
      }
    })

    // convert current weather id to string so we can index first digit
    const currentId = String(data[0].weather[0].id)
    return {
      temp: data[0].main.temp,
      weather: data[0].weather[0].main,
      icon:
        currentId === '800'
          ? weatherIcons[currentId]
          : weatherIcons[currentId.charAt(0)],
      forecast,
    }
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export { getWeather }
