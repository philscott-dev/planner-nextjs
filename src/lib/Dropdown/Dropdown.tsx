import styled from '@emotion/styled'

export default styled.div<{ isVisible: boolean }>`
  position: absolute;
  left: 0;
  box-shadow: ${({ theme }) => theme.shadow.up.two};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: all 0.3s ease-in-out;
`
