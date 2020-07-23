import styled from '@emotion/styled'

interface StyledProps {
  isVisible: boolean
  onMouseDown?: () => void
}

const Overlay = styled.div<StyledProps>`
  position: fixed;
  height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.color.blue[700]};
  z-index: ${({ isVisible, theme }) => (isVisible ? theme.index[100] : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  opacity: ${({ isVisible }) => (isVisible ? 0.5 : 0)};
`

export default Overlay
