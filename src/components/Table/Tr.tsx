import styled from '@emotion/styled'
const Tr = styled.tr`
  background: ${({ theme }) => theme.color.blue[600]};
  border-bottom: 1px solid ${({ theme }) => theme.color.blue[700]};
  :nth-of-type(2) {
    background: ${({ theme }) => theme.color.blue[500]};
  }
  :last-child {
    border-bottom: none;
  }
`

export default Tr
