import styled from '@emotion/styled'

const Slash = styled.p`
  ::after {
    content: '/';
  }
  font-size: 16px;
  color: ${({ theme }) => theme.color.white[100]};
  font-family: ${({ theme }) => theme.font.family};
  margin: 0 16px;
  padding: 0;
`

export default Slash
