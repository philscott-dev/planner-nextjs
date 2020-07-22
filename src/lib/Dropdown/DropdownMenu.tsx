import styled from '@emotion/styled'

export default styled.div<{ isVisible: boolean }>`
  position: absolute;
  left: 0;
  z-index: 150;
  overflow: hidden;
  border-radius: 8px;
  width: 200px;
  padding: 8px 0;
  background: ${({ theme }) => theme.color.blue[600]};
  box-shadow: ${({ theme }) => theme.shadow.up.two};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: all 0.3s ease-in-out;
`
