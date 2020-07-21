import styled from '@emotion/styled'

const H6 = styled.h6`
  text-align: inherit;
  font-size: 18px;
  line-height: 26px;
  margin-bottom: 16px;
  font-weight: 600;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.white[100]};
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    font-size: 16px;
    line-height: 21px;
  }
`

export default H6
