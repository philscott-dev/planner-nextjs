/** @jsx jsx */
import { FC } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'

interface ItemProps {
  className?: string
  onClick: () => void
  width: number
  src: string
}
const Item: FC<ItemProps> = ({ className, onClick, src, width }) => {
  const handleClick = () => {
    //onClick()
  }

  return (
    <Image
      src={src}
      width={width}
      className={className}
      onMouseDown={handleClick}
    />
  )
}

const Image = styled.div<{ src: string; width: number }>`
  box-sizing: border-box;
  background: url(${({ src }) => src});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  width: ${({ width }) => width}px;
  min-width: ${({ width }) => width}px;
  height: inherit;
  border: 1px solid black;
  overflow: hidden;
  border-radius: 16px;
`

export default Item
