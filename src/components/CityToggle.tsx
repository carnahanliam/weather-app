import { FC } from 'react'

interface Props {
  cities: string[]
  handleSwitchCity: React.MouseEventHandler<HTMLButtonElement>
  viewCity: string
}

const CityToggle: FC<Props> = ({ cities, handleSwitchCity, viewCity }) => (
  <div className="toggle-container">
    {cities.map((city) => (
      <button
        key={city}
        value={city}
        className={`city-button ${viewCity === city ? 'active' : ''}`}
        onClick={handleSwitchCity}
      >
        {city}
      </button>
    ))}
  </div>
)

export default CityToggle
