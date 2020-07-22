import styled from '@emotion/styled'

const Picker = styled.div<{ isVisible: boolean }>`
  position: absolute;
  box-sizing: border-box;
  z-index: 1;
  left: 0;
  top: 100%;
  padding: 8px;
  border-radius: 2px;
  box-shadow: 20px 20px 40px #050611;
  background: ${({ theme }) => theme.color.blue[600]};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: all 0.3s ease-in-out;
`

export default Picker
