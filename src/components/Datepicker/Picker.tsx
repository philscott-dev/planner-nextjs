import styled from '@emotion/styled'

const Picker = styled.div<{ isVisible: boolean }>`
  position: absolute;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  left: 100%;
  top: 0;
  padding: 8px;
  border-radius: 2px;
  box-shadow: 20px 20px 40px #050611;
  background: ${({ theme }) => theme.color.blue[600]};
`

export default Picker
