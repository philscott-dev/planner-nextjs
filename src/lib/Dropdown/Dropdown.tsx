/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useState, createRef, ReactNode } from 'react'
import { jsx } from '@emotion/react'
import { useOnClickOutside } from 'hooks'
import DropdownMenu from './DropdownMenu'

export type DirectionType = 'left' | 'up' | 'down' | 'right'

interface DropdownProps {
  className?: string
  direction?: DirectionType[] | DirectionType
  top?: number
  right?: number
  bottom?: number
  left?: number
  renderNode: (onClick: () => void, isVisible: boolean) => ReactNode
}
const Dropdown: FC<DropdownProps> = ({
  className,
  children,
  direction = 'right',
  top,
  right,
  bottom,
  left,
  renderNode,
}) => {
  const ref = createRef<HTMLDivElement>()
  const [isVisible, setVisibility] = useState(false)
  useOnClickOutside(ref, () => setVisibility(false), isVisible)

  const handleNodeClick = () => {
    setVisibility(!isVisible)
  }

  const handleMenuClick = () => {
    setVisibility(false)
  }

  return (
    <div ref={ref} className={className}>
      {renderNode(handleNodeClick, isVisible)}
      <DropdownMenu
        onMouseDown={handleMenuClick}
        isVisible={isVisible}
        direction={direction}
        top={top}
        right={right}
        bottom={bottom}
        left={left}
      >
        {children}
      </DropdownMenu>
    </div>
  )
}

export default styled(Dropdown)`
  position: relative;
  display: block;
`
