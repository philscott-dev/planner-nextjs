import styled from '@emotion/styled'

const H5 = styled.h5`
  text-align: inherit;
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 16px;
  font-weight: 600;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.white[100]};
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    font-size: 18px;
    line-height: 23px;
  }
`

export default H5
