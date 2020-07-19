import styled from '@emotion/styled'

const H4 = styled.h4`
  text-align: inherit;
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 16px;
  font-weight: 300;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.white[100]};
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    font-size: 20px;
    line-height: 26px;
  }
`

export default H4
