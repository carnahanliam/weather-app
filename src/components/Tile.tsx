import { FC } from 'react'
import { Children as RChildren } from 'react'

type Children = React.ReactNode

interface Props {
  size: string
  row: string
  children: Children
}

const Tile: FC<Props> = ({ size, row, children }) => {
  const containerStyle =
    size === 'full' ? 'tile-container-full' : 'tile-container-small'

  if (!children) {
    return (
      <div className="tile-container-full">
        <div className={`tile ${row}`}></div>
      </div>
    )
  }

  const arrayChildren: Children[] = RChildren.toArray(children)

  return (
    <div className={containerStyle}>
      {arrayChildren.map((child: any) => (
        <div className={`tile ${row}`} key={child.key}>
          {child}
        </div>
      ))}
    </div>
  )
}

export default Tile
