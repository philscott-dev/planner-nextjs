import styled from '@emotion/styled'

const Picker = styled.div<{ isVisible: boolean }>`
  position: fixed;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  left: 0;
  padding: 8px;
  border-radius: 2px;
  box-shadow: 20px 20px 40px #050611;
`

export default Picker
