/** @jsx jsx */
import { FC } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'

interface ActionButtonProps {
  className?: string
  onClick: () => void
}
const ActionButton: FC<ActionButtonProps> = ({ className, onClick }) => {
  const handleClick = () => {
    onClick()
  }
  return (
    <div className={className} onMouseDown={handleClick}>
      Action
    </div>
  )
}

export default styled(ActionButton)`
  box-sizing: border-box;
  width: 100px;
  min-width: 100px;
  height: 100%;
  border: 1px solid black;
  background: red;
  cursor: pointer;
`
