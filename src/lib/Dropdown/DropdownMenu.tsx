import styled from '@emotion/styled'
import { DirectionType } from './Dropdown'

interface DropdownMenuProps {
  isVisible: boolean
  direction?: DirectionType[] | DirectionType
  top?: number
  right?: number
  bottom?: number
  left?: number
}

export default styled.div<DropdownMenuProps>`
  position: absolute;
  right: ${({ direction, right }) =>
    direction === 'left' || direction?.includes('left') ? right || 0 : null}px;
  left: ${({ direction, left }) =>
    direction === 'right' || direction?.includes('right') ? left || 0 : null}px;
  top: ${({ direction, top }) =>
    direction === 'down' || direction?.includes('down') ? top || 0 : null}px;
  bottom: ${({ direction, bottom }) =>
    direction === 'up' || direction?.includes('up') ? bottom || 0 : null}px;
  z-index: 150;
  overflow: hidden;
  border-radius: 8px;
  min-width: 200px;
  padding: 8px 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 5, 0.25);
  background: ${({ theme }) => theme.color.blue[700]};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  display: ${({ isVisible }) => (isVisible ? 'inherit' : 'none')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: ${({ theme }) => theme.transition.all};
`
