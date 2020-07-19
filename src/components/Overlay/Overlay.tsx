import styled from '@emotion/styled'

interface StyledProps {
  isActive: boolean
  animationSpeed?: number
  onMouseDown?: () => void
}

const Overlay = styled.div<StyledProps>`
  position: fixed;
  height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.color.blue[700]};
  z-index: ${({ isActive, theme }) => (isActive ? theme.index[100] : 0)};
  visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
  opacity: ${({ isActive }) => (isActive ? 0.9 : 0)};
`

export default Overlay
