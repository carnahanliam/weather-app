import { FC } from 'react'

interface Props {
  children: React.ReactNode
}

const Panel: FC<Props> = ({ children }) => (
  <div className="elevated-panel">{children}</div>
)

export default Panel
